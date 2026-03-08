import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskPageResponse } from '../models/interfaces/task-page-response.interface';
import { TaskListResponse } from '../models/interfaces/task-list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  urlBase = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  getTasks(numPage: number): Observable<TaskPageResponse> {
    return this.http.get<TaskPageResponse>(`${this.urlBase}/admin?page=${numPage}`);
  }

  getListTasks(): Observable<TaskListResponse>{
    return this.http.get<TaskListResponse>(`${this.urlBase}/admin/all`);
  }

}
