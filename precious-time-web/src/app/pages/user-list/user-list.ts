import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PreferenceService } from '../../services/preference.service';
import { UserItem } from '../../models/interfaces/user-page-response.interface';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { UserCreateDto } from '../../models/dto/user-create.dto';
import { EditUserDto } from '../../models/dto/edit-user.dto';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  users: UserItem[] = [];
  preference?: PreferenceResponse;

  isEditing = false;
  currentUserId: string | null = null;
  currentPageNumber = 0;
  pagesNumber = 0;

  showPassword = false;
  showPasswordConfirm = false;

  togglePassword() { this.showPassword = !this.showPassword; }
  togglePasswordConfirm() { this.showPasswordConfirm = !this.showPasswordConfirm; }

  userFormGroup = new FormGroup({
    usernameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastnameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormcontrol: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordConfirmFormcontrol: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    rolFormControl: new FormControl('user', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService
  ) { }

  get isDarkTheme(): boolean {
    return this.preference?.theme! === 'dark';
  }

  get nameFormControl() {
    return this.userFormGroup.get('nameFormControl');
  }

  get lastnameFormControl() {
    return this.userFormGroup.get('lastnameFormControl');
  }

  get emailFormControl() {
    return this.userFormGroup.get('emailFormControl');
  }

  get rolFormControl() {
    return this.userFormGroup.get('rolFormControl');
  }

  get phoneFormControl() {
    return this.userFormGroup.get('phoneFormControl');
  }

  ngOnInit(): void {
    this.loadUsers();
    this.preferenceService.getPreference().subscribe({
      next: resp => {
        this.preference = resp;
      },
      error: errors => console.error(errors)
    });
  }

  loadUsers() {
    this.userService.getUsers(this.currentPageNumber).subscribe(resp => {
      this.users = resp.content;
      this.pagesNumber = resp.page.totalPages;
      this.currentPageNumber = resp.page.number;
    });
  }

  openNewUserModal() {
    this.isEditing = false;
    this.currentUserId = null;
  }

  editUserModal(user: UserItem) {
    this.isEditing = true;
    this.currentUserId = user.username;
    this.userFormGroup.patchValue({
      nameFormControl: user.name,
      lastnameFormControl: user.lastname,
      emailFormControl: user.email,
    });
  }

  saveUser() {
    const newUser = new UserCreateDto(
      this.userFormGroup.get('usernameFormControl')?.value!,
      this.userFormGroup.get('nameFormControl')?.value!,
      this.userFormGroup.get('lastnameFormControl')?.value!,
      this.userFormGroup.get('emailFormControl')?.value!,
      this.userFormGroup.get('passwordFormcontrol')?.value!,
      this.userFormGroup.get('passwordConfirmFormcontrol')?.value!,
    );
    this.userService.createNewUser(newUser).subscribe({
      next: resp => {
        this.preferenceService.createPreference(resp.username).subscribe();
        window.location.reload
      },
      error: errors => alert('error al crear el usuario')
    });

  }

  editUser() {
    const newUser = new EditUserDto(
      this.userFormGroup.get('nameFormControl')?.value!,
      this.userFormGroup.get('lastnamenameFormControl')?.value!,
      this.userFormGroup.get('emailFormControl')?.value!
    );
    this.userService.editUser(this.currentUserId!, newUser).subscribe(
      {
        next: resp => window.location.reload
      }
    );
  }

  deleteUser(id: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: resp => window.location.reload(),
        error: errors => alert('Error al borrar el usuario.')
      });
    }
  }

  changePage(page: number) {
    this.currentPageNumber = page;
    this.loadUsers();
  }

  setAdminRole(username: string) {
    if (confirm(`¿Asignar rol de Administrador a "${username}"?`)) {
      this.userService.setRoleAdmin(username).subscribe({
        next: () => this.loadUsers(),
        error: () => alert('Error al asignar el rol de administrador.')
      });
    }
  }

  getInitials(name: string): string {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '';
  }

}
