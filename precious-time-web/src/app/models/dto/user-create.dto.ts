export class UserCreateDto {
  username: string;
  fullName: string;
  email: string;
  password: string;
  verifyPassword: string;

  constructor(username: string, name: string, email: string, password: string, password_confirmation: string) {
    this.username = username
    this.fullName = name;
    this.email = email;
    this.password = password;
    this.verifyPassword = password_confirmation;
  }

}
