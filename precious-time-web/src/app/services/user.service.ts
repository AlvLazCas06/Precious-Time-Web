import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from '../models/dto/user-create.dto';
import { Observable } from 'rxjs';
import { UserCreateResponse } from '../models/interfaces/user-create-response.interface';
import { UserLoginDto } from '../models/dto/user-login.dto';
import { UserLoginResponse } from '../models/interfaces/user-login-response.interface';
import { UserPageResponse } from '../models/interfaces/user-page-response.interface';
import { UserResponse } from '../models/interfaces/user-response.interface';
import { EditUserAdminDto } from '../models/dto/edit-user-admin.dto';
import { EditUserDto } from '../models/dto/edit-user.dto';
import { UserListResponse } from '../models/interfaces/user-list-response';

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

  getUsers(numPage: number): Observable<UserPageResponse> {
    return this.http.get<UserPageResponse>(`${this.urlBase2}/admin?page=${numPage}`);
  }

  getAllUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.urlBase2}/admin/all`);
  }

  getLoginUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.urlBase2}`);
  }

  logoutUser(user: UserResponse): Observable<void> {
    return this.http.post<void>(`${this.urlBase}/logout`, user);
  }

  editUser(id: string, user: EditUserDto): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.urlBase2}/admin/${id}`, user);
  }

  deleteUser(id: string): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.urlBase2}/admin/${id}/disable`, null);
  }

  createNewUser(user: UserCreateDto): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.urlBase2}/admin`, user);
  }

  setRoleAdmin(username: string): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.urlBase2}/admin/${username}/set-role`, null);
  }

}
