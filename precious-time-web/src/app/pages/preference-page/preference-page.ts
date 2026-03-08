import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PreferenceService } from '../../services/preference.service';
import { UserResponse } from '../../models/interfaces/user-response.interface';
import { EditUserAdminDto } from '../../models/dto/edit-user-admin.dto';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { EditPreferenceDto } from '../../models/dto/edit-preference.dto';
import { EditUserDto } from '../../models/dto/edit-user.dto';

@Component({
  selector: 'app-preference-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preference-page.html',
  styleUrl: './preference-page.css',
})
export class PreferencePage implements OnInit {

  user?: UserResponse;
  preference?: PreferenceResponse;
  editUserFormGroup = new FormGroup({
    nameFormControl: new FormControl(''),
    lastnameFormControl: new FormControl(''),
    emailFormControl: new FormControl(''),
  });
  editPreferenceFormGroup = new FormGroup({
    notificationTypeFormControl: new FormControl(''),
    themeFormControl: new FormControl(),
    notificationActiveFormControl: new FormControl()
  });

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService
  ) {}

  get isDarkTheme(): boolean {
    return this.preference?.theme! == 'dark' ? true : false;
  }

  ngOnInit(): void {
    this.userService.getLoginUser().subscribe({
      next: resp => {
        this.user = resp;
        console.log(this.user.name);
        this.editUserFormGroup.patchValue({
          nameFormControl: resp.name,
          lastnameFormControl: resp.lastname,
          emailFormControl: resp.email,
        })
      }
    });
    this.preferenceService.getPreference().subscribe({
      next: resp => {
        this.preference = resp;
        this.editPreferenceFormGroup.patchValue({
          themeFormControl: resp.theme == 'light' ? false : true,
          notificationTypeFormControl: resp.type.toUpperCase().replace(' ', '_'),
          notificationActiveFormControl: resp.notificationsActive
        });
      },
      error: errors => alert(errors)
    });
  }

  modifyUser() {
    const editUser = new EditUserDto(
      this.editUserFormGroup.get('nameFormControl')?.value!,
      this.editUserFormGroup.get('lastnameFormControl')?.value!,
      this.editUserFormGroup.get('emailFormControl')?.value!,
    );
    this.userService.editUser(this.user?.username!, editUser).subscribe({
      next: resp => window.location.reload(),
      error: errors => alert('Error al modificar el usuario')
    });
  }

  modifyPreferences() {
    const editPreference = new EditPreferenceDto(
      this.editPreferenceFormGroup.get('themeFormControl')?.value! ? 'DARK' : 'LIGHT',
      this.editPreferenceFormGroup.get('notificationActiveFormControl')?.value!,
      this.editPreferenceFormGroup.get('notificationTypeFormControl')?.value!
    );
    this.preferenceService.editPreference(editPreference).subscribe({
      next: resp => {
        this.preference = resp
        window.location.reload
      },
      error: errors => alert('Ha habido problemas al editar las preferencias')
    });
  }
}
