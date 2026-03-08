import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCreateDto } from '../../models/dto/user-create.dto';
import { Router, RouterLink } from '@angular/router';
import { PreferenceService } from '../../services/preference.service';

@Component({
  selector: 'app-sign-up-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css',
})
export class SignUpPage {
  showPassword = false;
  showPasswordConfirm = false;

  signUpForm = new FormGroup({
    usernameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastnameFormControl: new FormControl('', [
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
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService,
    private router: Router
  ) { }

  createUser() {
    const user = new UserCreateDto(
      this.signUpForm.get('usernameFormControl')?.value!,
      this.signUpForm.get('nameFormControl')?.value!,
      this.signUpForm.get('lastnameFormControl')?.value!,
      this.signUpForm.get('emailFormControl')?.value!,
      this.signUpForm.get('passwordFormControl')?.value!,
      this.signUpForm.get('passwordConfirmFormControl')?.value!
    );
    this.userService.createUser(user).subscribe(resp => {
      this.preferenceService.createPreference(resp.username).subscribe();
      alert('No tienes acceso debido a que tu rol creado es de usuario.\nPonte en contacto con el admin para que te cambie el rol.');
      this.router.navigate(['/login']);

    })
  }

}
