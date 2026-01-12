import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCreateDto } from '../../models/dto/user-create.dto';
import { Router } from '@angular/router';
import { PreferenceService } from '../../services/preference.service';

@Component({
  selector: 'app-sign-up-page',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css',
})
export class SignUpPage {

  signUpForm = new FormGroup({
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordConfirmFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phoneNumberFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9)
    ])
  });

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService,
    private router: Router
  ) { }

  createUser() {
    const user = new UserCreateDto(
      this.signUpForm.get('nameFormControl')?.value!,
      this.signUpForm.get('emailFormControl')?.value!,
      this.signUpForm.get('passwordFormControl')?.value!,
      this.signUpForm.get('passwordConfirmFormControl')?.value!,
      this.signUpForm.get('passwordConfirmFormControl')?.value!
    );
    this.userService.createUser(user).subscribe(resp => {
      const token = resp.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', resp.user.id.toString());
      this.preferenceService.createPreference().subscribe();
      alert('No tienes acceso debido a que tu rol creado es de usuario.\nPonte en contacto con el admin para que te cambie el rol.');
      this.router.navigate(['/login']);

    })
  }

}
