import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from '../models/dto/user-create.dto';
import { Observable } from 'rxjs';
import { UserCreateResponse } from '../models/interfaces/user-create-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  createUser(user: UserCreateDto): Observable<UserCreateResponse> {
    return this.http.post<UserCreateResponse>(`${this.urlBase}/register`, user);
  }

}
