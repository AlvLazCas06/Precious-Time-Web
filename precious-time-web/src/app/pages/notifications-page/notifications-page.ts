import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar';
import { User } from '../../models/interfaces/user-list-response.interface';
import { UserService } from '../../services/user.service';
import { PreferenceService } from '../../services/preference.service';
import { Preference } from '../../models/interfaces/preference-response.interface';
import { CreateReminderDto } from '../../models/dto/create-reminder.dto';
import { ReminderService } from '../../services/reminder.service';
import { ReminderResponse } from '../../models/interfaces/reminder-list-response.interface';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './notifications-page.html',
  styleUrl: './notifications-page.css',
})
export class NotificationsPage implements OnInit {

  userList: User[] = [];
  preference?: Preference;
  reminderList: ReminderResponse[] = [];
  noRead = 0
  notificationFormGroup = new FormGroup({
    titleFormControl: new FormControl(''),
    messageFormControl: new FormControl(''),
    userFormControl: new FormControl()
  });

  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService,
    private reminderService: ReminderService
  ) { }

  get isDarkTheme(): boolean {
    return this.preference?.theme! == 'dark' ? true : false;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: resp => {
        this.userList = resp
          .filter(user => user.is_active && user.id != +localStorage.getItem('user_id')!)
      },
      error: error => alert('No hay usuarios')
    });
    this.preferenceService.getPreference().subscribe({
      next: resp => this.preference = resp[0],
      error: errors => alert('error al cargar las preferencias')
    });
    this.reminderService.getNotifiactions().subscribe({
      next: resp => {
        this.reminderList = resp;
        this.noRead = resp.filter(reminder => !reminder.is_read).length;
      },
      error: error => console.log('No tienes notificaciones.')
    });
  }

  sendReminder() {
    const newReminder = new CreateReminderDto(
      this.notificationFormGroup.get('titleFormControl')?.value!,
      this.notificationFormGroup.get('messageFormControl')?.value!,
      this.notificationFormGroup.get('userFormControl')?.value!
    );
    this.reminderService.createNotification(newReminder).subscribe({
      next: resp => alert('Notificación enviada con exito.'),
      error: errors => alert('No se ha enviado correctamente')
    });
  }

  newNotification = {
    title: '',
    message: '',
    type: 'In-App',
    selectedUserId: null as number | null
  };

  selectType(type: string) {
    this.newNotification.type = type;
  }

  getIcon(reminder: ReminderResponse): string {
    return 'bi-bell';
  }

  getColorClass(reminder: ReminderResponse): string {
    return 'text-purple bg-purple-subtle';
  }

  getType(reminder: ReminderResponse): string {
    return 'In-App';
  }
}
