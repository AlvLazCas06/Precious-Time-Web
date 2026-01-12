export class EditUserDto {

  name: string;
  email: string;
  password: string;
  role: string;
  phone_number: string

  constructor(name: string, email: string, password: string, role: string, phone_number: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone_number = phone_number;
  }

}
