import { Component } from '@angular/core';
import { Sidebar } from "../../../layouts/admin-layout-component/sidebar/sidebar";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-system-config-page',
  imports: [Sidebar, RouterLink],
  templateUrl: './system-config-page.html',
  styleUrl: './system-config-page.css',
})
export class SystemConfigPage {

}
