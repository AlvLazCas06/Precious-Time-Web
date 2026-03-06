import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar';
import { UserService } from '../../services/user.service';
import { PreferenceService } from '../../services/preference.service';
import { UserItem } from '../../models/interfaces/user-list-response.interface';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { UserCreateDto } from '../../models/dto/user-create.dto';
import { EditUserDto } from '../../models/dto/edit-user.dto';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  users: UserItem[] = [];
  preference?: PreferenceResponse;

  isEditing = false;
  currentUserId: number | null = null;

  userFormGroup = new FormGroup({
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    rolFormControl: new FormControl<string>('user', [
      Validators.required
    ]),
    phoneFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordFormcontrol: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
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
    this.userService.getUsers().subscribe(resp => {
      this.users = resp.content;
    });
  }

  openNewUserModal() {
    this.isEditing = false;
    this.currentUserId = null;
    this.userFormGroup.reset({
      rolFormControl: 'user',
    });
  }

  // editUserModal(user: User) {
  //   this.isEditing = true;
  //   this.currentUserId = user.id;
  //   this.userFormGroup.patchValue({
  //     nameFormControl: user.name,
  //     emailFormControl: user.email,
  //     rolFormControl: user.role,
  //     phoneFormControl: user.phone_number
  //   });
  // }

  saveUser() {
    const newUser = new UserCreateDto(
      this.userFormGroup.get('nameFormControl')?.value!,
      this.userFormGroup.get('emailFormControl')?.value!,
      this.userFormGroup.get('passwordFormcontrol')?.value!,
      this.userFormGroup.get('rolFormControl')?.value!,
      this.userFormGroup.get('phoneFormControl')?.value!
    );
    this.userService.createUser(newUser).subscribe({
      next: resp => window.location.reload,
      error: errors => alert('error al crear el usuario')
    });

  }

  editUser() {
    const newUser = new EditUserDto(
      this.userFormGroup.get('nameFormControl')?.value!,
      this.userFormGroup.get('emailFormControl')?.value!,
      this.userFormGroup.get('passwordFormcontrol')?.value!,
      this.userFormGroup.get('passwordFormcontrol')?.value!,
      this.userFormGroup.get('phoneFormControl')?.value!
    );
    this.userService
  }

  deleteUser(id: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: resp => window.location.reload(),
        error: errors => alert('Error al borrar el usuario.')
      });
    }
  }

  getInitials(name: string): string {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '';
  }

}
