import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  logout() {
    this.userService.getLoginUser().subscribe(resp => {
      this.userService.logoutUser(resp).subscribe(resp => {
        this.router.navigate(['/login']);
      });
    });
  }

}
