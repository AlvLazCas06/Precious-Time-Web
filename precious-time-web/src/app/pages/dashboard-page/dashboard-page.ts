import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../models/interfaces/task-list-response.interface';
import { User } from '../../models/interfaces/user-list-response.interface';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { PreferenceService } from '../../services/preference.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {

  // Stats
  totalUsers = 0;
  totalProjects = 0; // Mock data to match image since we don't have project count endpoint yet or service connected fully in this snippet
  pendingTasks = 0;
  notifications = 24; // Mock

  // Breakdowns
  activeUsers = 0;
  premiumUsers = 0; // Mock
  completedProjects = 0; // Mock
  activeProjects = 0;

  // Task Priorities (Mock or calculated)
  highPriority = 89;
  medPriority = 0;
  lowPriority = 0;

  notificationsUnread = 8;

  preference?: PreferenceResponse;

  // Chart data (simple array for SVG generation or just placeholder)
  // We will simulate a line graph with a path
  chartPath = "20,250 120,230 220,200 320,150 420,100 520,50 620,20";
  // Simple points for visual representation matching "Crecimiento de Usuarios"

  recentActivities = [
    { text: 'Nuevo usuario registrado: María García', time: 'Hace 5 minutos', icon: 'bi-people', color: 'teal' },
    { text: 'Tarea "Revisión mensual" completada por Juan Pérez', time: 'Hace 12 minutos', icon: 'bi-list-check', color: 'teal' }, // Actually green in image but teal consistent with theme
    { text: 'Nueva categoría creada: Desarrollo Personal', time: 'Hace 1 hora', icon: 'bi-folder', color: 'purple' },
    { text: 'Usuario actualizado a Premium: Ana López', time: 'Hace 2 horas', icon: 'bi-person-up', color: 'teal' },
    { text: 'Notificación enviada a 120 usuarios', time: 'Hace 3 horas', icon: 'bi-bell', color: 'blue' },
  ];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private preferenceService: PreferenceService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(resp => {
      this.totalUsers = resp.length;
      this.activeUsers = resp.filter(u => u.is_active).length;
    });

    this.taskService.getTasks().subscribe(resp => {
      this.pendingTasks = resp.content.filter(t => t.status === 'Pendiente').length;
      this.medPriority = resp.content.filter(t => t.priority === 'Media' && t.status === 'Pendiente').length;
      this.lowPriority = resp.content.filter(t => t.priority === 'Baja' && t.status === 'Pendiente').length;
      this.highPriority = resp.content.filter(t => t.priority === 'Alta' && t.status === 'Pendiente').length;
    });

    this.projectService.getProjects().subscribe({
      next: resp => {
        this.totalProjects = resp.content.length;
        this.completedProjects = resp.content.filter(p => p.status == 'completado').length;
        this.activeProjects = resp.content.filter(p => p.status != 'cancelado').length;
      }
    });

    this.preferenceService.getPreference().subscribe(resp => {
      this.preference = resp;
    });
  }

  get isDarkTheme(): boolean {
    return this.preference?.theme === 'dark';
  }
}
