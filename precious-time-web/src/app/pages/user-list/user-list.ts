import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  userFormGroup = new FormGroup({
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    rolFormControl: new FormControl('', [
      Validators.required
    ]),
    activeFormControl: new FormControl()
  });

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

}
