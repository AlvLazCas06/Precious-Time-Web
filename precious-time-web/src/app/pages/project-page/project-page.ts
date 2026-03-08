import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { PreferenceService } from '../../services/preference.service';
import { ProjectService } from '../../services/project.service';
import { ProjectResponse } from '../../models/interfaces/project-page-response.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css',
})
export class ProjectPage implements OnInit {

  projects: ProjectResponse[] = [];
  preference?: PreferenceResponse;
  currentPageNumber = 0;
  pagesNumber = 0;

  totalProjects = 0;
  processCount = 0;
  completedCount = 0;
  cancelledCount = 0;

  constructor(
    private projectService: ProjectService,
    private preferenceService: PreferenceService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.preferenceService.getPreference().subscribe({
      next: (resp) => {
      this.preference = resp;
      }
    });
  }

  loadProjects() {
    this.projectService.getProjects(this.currentPageNumber).subscribe({
      next: (resp) => {
        this.projects = resp.content;
        this.pagesNumber = resp.page.totalPages;
        this.currentPageNumber = resp.page.number;
      },
      error: (err) => console.error(err)
    });
    this.projectService.getListProjects().subscribe({
      next: (resp) => {
        this.processCount = resp.filter(p => p.status === 'en proceso').length;
        this.completedCount = resp.filter(p => p.status === 'completado').length;
        this.cancelledCount = resp.filter(p => p.status === 'cancelado').length;
      }
    })
  }

  get isDarkTheme(): boolean {
    return this.preference?.theme === 'dark';
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'En Proceso': return 'badge-status-process';
      case 'Completado': return 'badge-status-completed';
      case 'Pendiente': return 'badge-status-pending';
      case 'Cancelado': return 'badge-status-cancelled';
      default: return 'badge-status-pending';
    }
  }

  getProgressColor(status: string): string {
    switch(status) {
      case 'En Proceso': return '#fb8c00'; // Orange per image
      case 'Completado': return '#00c853'; // Green
      case 'Pendiente': return '#bdbdbd'; // Grey
      case 'Cancelado': return '#e53935'; // Red
      default: return '#bdbdbd';
    }
  }

  changePage(page: number) {
    this.currentPageNumber = page;
    this.projectService.getProjects(page).subscribe({
      next: (resp) => {
        this.projects = resp.content;
        this.pagesNumber = resp.page.totalPages;
        this.currentPageNumber = resp.page.number;
      }
    });
  }
}
