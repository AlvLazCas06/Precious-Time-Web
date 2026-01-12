import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectListResponse, ProjectResponse } from '../models/interfaces/project-list-response.interface';
import { CreateProjectDto } from '../models/dto/create-project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  urlBase = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>(`${this.urlBase}/pojects`);
  }

  createProjects(project: CreateProjectDto): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(`${this.urlBase}/pojects`, project);
  }

}
