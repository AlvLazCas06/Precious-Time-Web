export class CreateReminderDto {
  title: string;
  message: string;
  is_read: boolean;

  constructor(title: string, message: string, is_read: boolean) {
    this.title = title;
    this.message = message;
    this.is_read = is_read
  }

}
