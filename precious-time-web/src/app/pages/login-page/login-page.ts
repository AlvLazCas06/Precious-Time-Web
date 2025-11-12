import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  loginFormGroup = new FormGroup({
    usernameFormControl: new FormControl('', [
      Validators.required
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ])
  })
}
