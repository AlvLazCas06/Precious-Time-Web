import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from '../models/dto/user-create.dto';
import { Observable } from 'rxjs';
import { UserCreateResponse } from '../models/interfaces/user-create-response.interface';
import { UserLoginDto } from '../models/dto/user-login.dto';
import { UserLoginResponse } from '../models/interfaces/user-login-response.interface';
import { UserListResponse } from '../models/interfaces/user-list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  createUser(user: UserCreateDto): Observable<UserCreateResponse> {
    return this.http.post<UserCreateResponse>(`${this.urlBase}/register`, user);
  }

  loginUser(user: UserLoginDto): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.urlBase}/login`, user);
  }

  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.urlBase}/users`);
  }

  getLoginUser(): Observable<UserLoginResponse> {
    return this.http.get<UserLoginResponse>(`${this.urlBase}/users/${localStorage.getItem('user_id')}`);
  }

  logoutUser(user: UserLoginResponse): Observable<void> {
    return this.http.post<void>(`${this.urlBase}/logout`, user);
  }

}
