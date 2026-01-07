import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../layouts/admin-layout-component/sidebar/sidebar";
import { User } from '../../models/interfaces/user-list-response.interface';

@Component({
  selector: 'app-analysis-page',
  imports: [Sidebar],
  templateUrl: './analysis-page.html',
  styleUrl: './analysis-page.css',
})
export class AnalysisPage implements OnInit {

  totalUsers: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(resp => {
      this.totalUsers = resp.length;
    });
  }

}
