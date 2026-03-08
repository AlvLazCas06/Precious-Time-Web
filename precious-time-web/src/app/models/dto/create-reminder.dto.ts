export class CreateReminderDto {
  title: string;
  message: string;
  username: string;

  constructor(title: string, message: string, username: string) {
    this.title = title;
    this.message = message;
    this.username = username;
  }

}
