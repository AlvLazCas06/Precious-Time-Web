import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskListResponse } from '../models/interfaces/task-list-response.interface';
import { CreateTaskDto } from '../models/dto/create-task.dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  urlBase = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(`${this.urlBase}/admin`);
  }

  createTask(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(`${this.urlBase}`, null);
  }

}
