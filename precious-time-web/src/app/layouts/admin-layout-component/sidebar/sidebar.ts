import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PreferenceService } from '../../../services/preference.service';
import { PreferenceResponse } from '../../../models/interfaces/preference-response.interface';
import { EditPreferenceDto } from '../../../models/dto/edit-preference.dto';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  preference?: PreferenceResponse;

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPreference();
  }

  loadPreference() {
    this.preferenceService.getPreference().subscribe(resp => {

      this.preference = resp;
      this.applyTheme(this.preference.theme);

    });
  }

  applyTheme(theme: string) {
    document.body.setAttribute('data-bs-theme', theme);
  }

  logout() {
    this.userService.getLoginUser().subscribe(resp => {
      this.userService.logoutUser(resp).subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  get isDarkTheme(): boolean {
    return this.preference?.theme === 'dark';
  }
}
