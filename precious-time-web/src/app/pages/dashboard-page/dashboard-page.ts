import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../layouts/admin-layout-component/sidebar/sidebar";
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [Sidebar],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {

  taskDone?: number;
  usersActive?: number;

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(resp => {
      this.taskDone = resp.filter(task => task.done == 1).length;
    });
    this.userService.getUsers().subscribe(resp => {
      this.usersActive = resp.filter(user => user.is_active == 1).length;
    });
  }

}
