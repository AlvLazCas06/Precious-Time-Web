import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar'; // Import Sidebar
import { Task } from '../../models/interfaces/task-list-response.interface';
import { CategoryResponse } from '../../models/interfaces/category-response.interface';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { PreferenceService } from '../../services/preference.service';
import { CreateTaskDto } from '../../models/dto/create-task.dto';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar], // Add Sidebar
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {

  taskList: Task[] = [];
  categories: CategoryResponse[] = [];
  preference?: PreferenceResponse;

  // Form Group for Modal
  taskFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    category_id: new FormControl<number | null>(null, [Validators.required]),
  });

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private preferenceService: PreferenceService
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.taskService.getTasks().subscribe(resp => {
      this.taskList = resp.content;
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

  saveTask() {
    const task = new CreateTaskDto(
      this.taskFormGroup.get('title')?.value!,
      +this.taskFormGroup.get('category_id')?.value!
    );
    if (this.taskFormGroup.get('description')?.value != null) {
      task.description = this.taskFormGroup.get('description')?.value!
    }
    this.taskService.createTask(task).subscribe(resp => {
      window.location.reload();
    });
  }
}
