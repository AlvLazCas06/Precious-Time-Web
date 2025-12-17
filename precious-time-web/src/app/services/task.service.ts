import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskListResponse } from '../models/interfaces/task-list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(`${this.urlBase}/tasks`);
  }

}
