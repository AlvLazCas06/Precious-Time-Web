import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from '../models/dto/user-create.dto';
import { Observable } from 'rxjs';
import { UserCreateResponse } from '../models/interfaces/user-create-response.interface';
import { UserLoginDto } from '../models/dto/user-login.dto';
import { UserLoginResponse } from '../models/interfaces/user-login-response.interface';
import { UserListResponse } from '../models/interfaces/user-list-response.interface';
import { UserResponse } from '../models/interfaces/user-response.interface';
import { EditUserAdminDto } from '../models/dto/edit-user-admin.dto';
import { EditUserDto } from '../models/dto/edit-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  urlBase = 'http://localhost:8080/auth';
  urlBase2 = 'http://localhost:8080/api/v1/users'

  constructor(private http: HttpClient) { }

  createUser(user: UserCreateDto): Observable<UserCreateResponse> {
    return this.http.post<UserCreateResponse>(`${this.urlBase}/register`, user);
  }

  loginUser(user: UserLoginDto): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.urlBase}/login`, user);
  }

  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.urlBase2}/admin`);
  }

  getLoginUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.urlBase2}`);
  }

  logoutUser(user: UserResponse): Observable<void> {
    return this.http.post<void>(`${this.urlBase}/logout`, user);
  }

  editUserAdmin(user: EditUserAdminDto): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.urlBase}/users/${localStorage.getItem('user_id')}`, user);
  }

  editUser(id: number, user: EditUserDto): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.urlBase}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/users/${id}`);
  }

}
