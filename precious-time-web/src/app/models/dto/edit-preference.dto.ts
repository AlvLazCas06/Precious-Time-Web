export class EditPreferenceDto {
  theme: string;
  notificationsActive: boolean;
  type: string

  constructor(theme: string, notificationsActive: boolean, type: string) {
    this.theme = theme;
    this.notificationsActive = notificationsActive;
    this.type = type
  }

}
