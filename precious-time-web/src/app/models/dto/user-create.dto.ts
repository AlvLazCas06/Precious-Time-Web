export class UserCreateDto {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  verifyPassword: string;

  constructor(username: string, name: string, lastname: string, email: string, password: string, password_confirmation: string) {
    this.username = username
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.verifyPassword = password_confirmation;
  }

}
