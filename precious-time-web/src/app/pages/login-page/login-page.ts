import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
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
