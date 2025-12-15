import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCreateDto } from '../../models/dto/user-create.dto';
import { Router } from '@angular/router';

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
    ])
  });

  constructor(
    private service: UserService,
    private router: Router
  ) { }

  createUser() {
    const user = new UserCreateDto(
      this.signUpForm.get('nameFormControl')?.value!,
      this.signUpForm.get('emailFormControl')?.value!,
      this.signUpForm.get('passwordFormControl')?.value!,
      this.signUpForm.get('passwordFormControl')?.value!
    );
    this.service.createUser(user).subscribe(resp => {
      const token = resp.token;
      localStorage.setItem('token', token);
      alert('No tienes acceso debido a que tu rol creado es de usuario.\nPonte en contacto con el admin para que te cambie el rol.');
      this.router.navigate(['/login'])
    })
  }

}
