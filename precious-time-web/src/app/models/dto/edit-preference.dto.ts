export class EditPreferenceDto {
  theme: string;
  notifications_active: boolean;
  notification_type: string

  constructor(theme: string, notifications_active: boolean, notification_type: string) {
    this.theme = theme;
    this.notifications_active = notifications_active;
    this.notification_type = notification_type
  }

}
