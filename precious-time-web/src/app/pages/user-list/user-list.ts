import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from "../../layouts/admin-layout-component/sidebar/sidebar";
import { UserService } from '../../services/user.service';
import { User } from '../../models/interfaces/user-list-response.interface';

@Component({
  selector: 'app-user-list',
  imports: [ReactiveFormsModule, Sidebar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  users: User[] = [];
  userInactive: number = 0;
  userActive: number = 0;
  totalUsers: number = 0;
  newUsersMonth: number = 0;
  date = new Date();
  month = this.date.getMonth() + 1;

  userFormGroup = new FormGroup({
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    rolFormControl: new FormControl('', [
      Validators.required
    ]),
    phoneFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordFormcontrol: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private userService: UserService) { }

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
    this.userService.getUsers().subscribe(resp => {
      this.users = resp;
      this.userInactive = resp.filter(user => !user.is_active).length;
      this.userActive = resp.filter(user => user.is_active).length;
      this.newUsersMonth = resp.filter(user => user.created_at.slice(5, 7) === this.month.toString().padStart(2, '0')).length;
      this.totalUsers = resp.length;
    });
  }

  createUser() {

  }

}
