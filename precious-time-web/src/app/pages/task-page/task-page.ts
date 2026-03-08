import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/interfaces/task-page-response.interface';
import { CategoryResponse } from '../../models/interfaces/category-response.interface';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { PreferenceService } from '../../services/preference.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {

  taskList: Task[] = [];
  categories: CategoryResponse[] = [];
  preference?: PreferenceResponse;
  currentPageNumber = 0;
  pagesNumber = 0;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private preferenceService: PreferenceService
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.taskService.getTasks(this.currentPageNumber).subscribe(resp => {
      this.taskList = resp.content;
      this.pagesNumber = resp.page.totalPages;
      this.currentPageNumber = resp.page.number;
    });
    this.categoryService.getCategories(1).subscribe(resp => {
      this.categories = resp.content;
    });
    this.preferenceService.getPreference().subscribe(resp => {
        this.preference = resp;
    });
  }

  get isDarkTheme(): boolean {
    return this.preference?.theme === 'dark';
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.name || 'Sin Categoría';
  }

  getPriorityClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'alta': return 'badge-priority-high';
      case 'media': return 'badge-priority-medium';
      case 'baja': return 'badge-priority-low';
      default: return 'badge-priority-low';
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) { // Assuming status strings match common patterns or exact values
      case 'pendiente': return 'badge-status-pending';
      case 'en progreso': return 'badge-status-inprogress';
      case 'completada': return 'badge-status-completed';
      default: return 'badge-status-pending';
    }
  }

  changePage(page: number) {
    this.currentPageNumber = page;
    this.taskService.getTasks(page).subscribe(resp => {
      this.taskList = resp.content;
      this.pagesNumber = resp.page.totalPages;
      this.currentPageNumber = resp.page.number;
    });
  }
}
