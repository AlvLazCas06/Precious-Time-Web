import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { PreferenceService } from '../../services/preference.service';
import { ProjectService } from '../../services/project.service';
import { UserItem } from '../../models/interfaces/user-page-response.interface';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {

  totalUsers = 0;
  totalProjects = 0;
  totalTasks = 0;

  activeUsers = 0;
  premiumUsers = 0;
  completedProjects = 0;
  activeProjects = 0;
  inProcessProjects = 0;
  cancelledProjects = 0;

  highPriority = 0;
  medPriority = 0;
  lowPriority = 0;

  preference?: PreferenceResponse;

  private taskPriorityChart?: Chart;
  private projectStatusChart?: Chart;
  private userGrowthChart?: Chart;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private preferenceService: PreferenceService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.preferenceService.getPreference().subscribe(resp => {
      this.preference = resp;
    });

    this.userService.getAllUsers().subscribe(resp => {
      this.totalUsers = resp.length;
      this.activeUsers = resp.filter(u => u.active).length;
      this.premiumUsers = resp.filter(u => u.premium).length;
      this.buildUserGrowthChart(resp);
    });

    this.taskService.getListTasks().subscribe(resp => {
      this.totalTasks = resp.length;
      this.highPriority = resp.filter(t => t.priority === 'alta').length;
      this.medPriority = resp.filter(t => t.priority === 'media').length;
      this.lowPriority = resp.filter(t => t.priority === 'baja').length;
      this.buildTaskPriorityChart();
    });

    this.projectService.getListProjects().subscribe({
      next: resp => {
        this.totalProjects = resp.length;
        this.completedProjects = resp.filter(p => p.status === 'completado').length;
        this.inProcessProjects = resp.filter(p => p.status === 'en proceso').length;
        this.cancelledProjects = resp.filter(p => p.status === 'cancelado').length;
        this.activeProjects = this.inProcessProjects;
        this.buildProjectStatusChart();
      }
    });
  }

  get isDarkTheme(): boolean {
    return this.preference?.theme === 'dark';
  }

  private buildTaskPriorityChart(): void {
    setTimeout(() => {
      const canvas = document.getElementById('taskPriorityChart') as HTMLCanvasElement;
      if (!canvas) return;
      if (this.taskPriorityChart) this.taskPriorityChart.destroy();
      this.taskPriorityChart = new Chart(canvas, {
        type: 'doughnut',
        plugins: [ChartDataLabels],
        data: {
          labels: ['Alta', 'Media', 'Baja'],
          datasets: [{
            data: [this.highPriority, this.medPriority, this.lowPriority],
            backgroundColor: ['#e53935', '#fb8c00', '#43a047'],
            borderWidth: 0,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: {
            legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } },
            datalabels: {
              color: '#fff',
              font: { weight: 'bold', size: 13 },
              formatter: (value: number, ctx: any) => {
                const total = (ctx.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                if (total === 0 || value === 0) return '';
                return Math.round((value / total) * 100) + '%';
              }
            }
          }
        } as any
      });
    }, 0);
  }

  private buildProjectStatusChart(): void {
    setTimeout(() => {
      const canvas = document.getElementById('projectStatusChart') as HTMLCanvasElement;
      if (!canvas) return;
      if (this.projectStatusChart) this.projectStatusChart.destroy();
      this.projectStatusChart = new Chart(canvas, {
        type: 'doughnut',
        plugins: [ChartDataLabels],
        data: {
          labels: ['En Proceso', 'Completados', 'Cancelados'],
          datasets: [{
            data: [this.inProcessProjects, this.completedProjects, this.cancelledProjects],
            backgroundColor: ['#fb8c00', '#43a047', '#e53935'],
            borderWidth: 0,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: {
            legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } },
            datalabels: {
              color: '#fff',
              font: { weight: 'bold', size: 13 },
              formatter: (value: number, ctx: any) => {
                const total = (ctx.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                if (total === 0 || value === 0) return '';
                return Math.round((value / total) * 100) + '%';
              }
            }
          }
        } as any
      });
    }, 0);
  }

  private buildUserGrowthChart(users: UserItem[]): void {
    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const counts = new Array(12).fill(0);
    users.forEach(u => {
      if (u.registerAt) {
        const month = new Date(u.registerAt).getMonth();
        counts[month]++;
      }
    });
    setTimeout(() => {
      const canvas = document.getElementById('userGrowthChart') as HTMLCanvasElement;
      if (!canvas) return;
      if (this.userGrowthChart) this.userGrowthChart.destroy();
      this.userGrowthChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: monthLabels,
          datasets: [{
            label: 'Usuarios registrados',
            data: counts,
            backgroundColor: '#0dcec2',
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { precision: 0 } }
          }
        }
      });
    }, 0);
  }
}
