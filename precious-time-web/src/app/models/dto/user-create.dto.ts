export class UserCreateDto {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;

  constructor(name: string, email: string, password: string, password_confirmation: string, phone_number: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.phone_number = phone_number;
  }

}
