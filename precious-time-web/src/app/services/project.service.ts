import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectListResponse } from '../models/interfaces/project-list-response.interface';
import { CreateProjectDto } from '../models/dto/create-project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  urlBase = 'http://localhost:8080/api/v1/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>(`${this.urlBase}/admin`);
  }

  createProjects(project: CreateProjectDto): Observable<Project> {
    return this.http.post<Project>(`${this.urlBase}`, project);
  }

}
