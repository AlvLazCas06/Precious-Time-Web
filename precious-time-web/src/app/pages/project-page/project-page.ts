import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar';
import { CreateProjectDto } from '../../models/dto/create-project.dto';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { PreferenceService } from '../../services/preference.service';
import { ProjectService } from '../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/interfaces/project-list-response.interface';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css',
})
export class ProjectPage implements OnInit {

  projects: Project[] = [];
  preference?: PreferenceResponse;

  // Counts for summary
  pendingCount = 0;
  processCount = 0;
  completedCount = 0;
  cancelledCount = 0;

  projectFormGroup = new FormGroup({
    nameFormControl: new FormControl('', [Validators.required]),
    descriptionFormControl: new FormControl('', [Validators.required]),
  });

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
    this.projectService.getProjects().subscribe({
      next: (resp) => {
        this.projects = resp.content;
        this.calculateCounts();
      },
      error: (err) => console.error(err)
    });
  }

  calculateCounts() {
    this.pendingCount = this.projects.filter(p => p.status === 'Pendiente').length;
    this.processCount = this.projects.filter(p => p.status === 'En Proceso').length;
    this.completedCount = this.projects.filter(p => p.status === 'Completado').length;
    this.cancelledCount = this.projects.filter(p => p.status === 'Cancelado').length;
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

  createProject() {
    const project = new CreateProjectDto(
      +localStorage.getItem('user_id')!,
      this.projectFormGroup.get('nameFormControl')?.value!,
      this.projectFormGroup.get('descriptionFormControl')?.value!
    );
    this.projectService.createProjects(project).subscribe(resp => {
      window.location.reload();
    });
  }
}
