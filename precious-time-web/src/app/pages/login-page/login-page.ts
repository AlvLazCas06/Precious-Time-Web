import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../services/user.service';
import { UserLoginDto } from '../../models/dto/user-login.dto';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginFormGroup = new FormGroup({
    usernameFormControl: new FormControl('', [
      Validators.required
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  login() {
    const user = new UserLoginDto(
      this.loginFormGroup.get('usernameFormControl')?.value!,
      this.loginFormGroup.get('passwordFormControl')?.value!
    );
    this.userService.loginUser(user).subscribe(
      resp => {
        const token = resp.token;
        localStorage.setItem('token', token);
        if (resp.roles.some(role => role === 'ADMIN')) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          alert('El rol de este usuario no es admin por lo tanto no puede entrar.')
        }
      },
      error => {
        alert('Revise el email o la caontraseña.')
      }
    );
  }

}
