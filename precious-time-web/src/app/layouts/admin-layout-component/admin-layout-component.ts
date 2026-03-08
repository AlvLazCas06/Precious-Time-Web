import { Component } from '@angular/core';
import { Sidebar } from "./sidebar/sidebar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout-component',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './admin-layout-component.html',
  styleUrl: './admin-layout-component.css',
})
export class AdminLayoutComponent {

}
