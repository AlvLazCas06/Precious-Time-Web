import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../layouts/admin-layout-component/sidebar/sidebar";
import { TaskService } from '../../services/task.service';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-analysis-page',
  imports: [Sidebar, NgbProgressbar],
  templateUrl: './analysis-page.html',
  styleUrl: './analysis-page.css',
})
export class AnalysisPage implements OnInit {

  totalUsers: number = 0;
  percentCompleteTask: number = 0;
  firstTypeTaskPercent: number = 0;

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(resp => {
      this.totalUsers = resp.length;
    });
    this.taskService.getTasks().subscribe(resp => {
      this.percentCompleteTask = (resp.filter(task => task.done).length / resp.length) * 100;
      this.firstTypeTaskPercent = (resp.filter(task => task.category_id == 1).length / resp.length) * 100;
    }, error => {
      this.percentCompleteTask = 0
    });
  }

}
