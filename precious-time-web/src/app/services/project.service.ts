import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectPageResponse, ProjectResponse } from '../models/interfaces/project-page-response.interface';
import { ProjectListResponse } from '../models/interfaces/project-list-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  urlBase = 'http://localhost:8080/api/v1/projects';

  constructor(private http: HttpClient) { }

  getProjects(numPage: number): Observable<ProjectPageResponse> {
    return this.http.get<ProjectPageResponse>(`${this.urlBase}/admin?page=${numPage}`);
  }

  getListProjects(): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>(`${this.urlBase}/admin/all`);
  }

}
