import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PreferenceService } from '../../../services/preference.service';
import { Preference } from '../../../models/interfaces/preference-response.interface';
import { EditPreferenceDto } from '../../../models/dto/edit-preference.dto';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  preference?: Preference;

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPreference();
  }

  loadPreference() {
    this.preferenceService.getPreference().subscribe(resp => {
      if(resp && resp.length > 0) {
        this.preference = resp[0];
        this.applyTheme(this.preference.theme);
      }
    });
  }

  toggleTheme() {
    if (!this.preference) return;

    const newTheme = this.preference.theme === 'dark' ? 'light' : 'dark';

    // Convert number to boolean for DTO if needed
    const notifActive = this.preference.notifications_active === 1;

    const dto = new EditPreferenceDto(
      newTheme,
      notifActive,
      this.preference.notification_type
    );

    // Optimistic update
    this.preference.theme = newTheme;
    this.applyTheme(newTheme);

    this.preferenceService.editPreference(this.preference.id, dto).subscribe({
      next: (updated) => {
        // Success
      },
      error: (err) => {
        console.error('Error updating preference', err);
        // Revert
        const oldTheme = newTheme === 'dark' ? 'light' : 'dark';
        if(this.preference) this.preference.theme = oldTheme;
        this.applyTheme(oldTheme);
      }
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
