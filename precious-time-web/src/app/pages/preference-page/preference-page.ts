import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar';
import { UserService } from '../../services/user.service';
import { PreferenceService } from '../../services/preference.service';
import { User } from '../../models/interfaces/user-login-response.interface';
import { UserResponse } from '../../models/interfaces/user-response.interface';
import { EditUserAdminDto } from '../../models/dto/edit-user-admin.dto';
import { Preference } from '../../models/interfaces/preference-response.interface';
import { EditPreferenceDto } from '../../models/dto/edit-preference.dto';

@Component({
  selector: 'app-preference-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './preference-page.html',
  styleUrl: './preference-page.css',
})
export class PreferencePage implements OnInit {

  user?: UserResponse;
  preference?: Preference;
  editUserFormGroup = new FormGroup({
    nameFormControl: new FormControl(''),
    emailFormControl: new FormControl(''),
    phoneFormControl: new FormControl('')
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
        this.editUserFormGroup.patchValue({
          nameFormControl: resp.name,
          emailFormControl: resp.email,
          phoneFormControl: resp.phone_number
        })
      }
    });
    this.preferenceService.getPreference().subscribe({
      next: resp => {
        this.preference = resp[0];
        this.editPreferenceFormGroup.patchValue({
          themeFormControl: resp[0].theme == 'light' ? false : true,
          notificationTypeFormControl: resp[0].notification_type,
          notificationActiveFormControl: resp[0].notifications_active == 1 ? true : false
        });
      },
      error: errors => alert(errors)
    });
  }

  modifyUser() {
    const editUser = new EditUserAdminDto(
      this.editUserFormGroup.get('nameFormControl')?.value!,
      this.editUserFormGroup.get('emailFormControl')?.value!,
      this.editUserFormGroup.get('phoneFormControl')?.value!,
      this.user?.role!
    );
    this.userService.editUserAdmin(editUser).subscribe({
      next: resp => window.location.reload(),
      error: errors => alert('Error al modificar el usuario')
    });
  }

  modifyPreferences() {
    const editPreference = new EditPreferenceDto(
      this.editPreferenceFormGroup.get('themeFormControl')?.value! ? 'dark' : 'light',
      this.editPreferenceFormGroup.get('notificationActiveFormControl')?.value!,
      this.editPreferenceFormGroup.get('notificationTypeFormControl')?.value!
    );
    this.preferenceService.editPreference(this.preference?.id!, editPreference).subscribe({
      next: resp => this.preference = resp,
      error: errors => alert('Ha habido problemas al editar las preferencias')
    });
  }
}
