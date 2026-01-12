export class CreateProjectDto {
  user_id: number;
  name: string;
  description: string;

  constructor(user_id: number, name: string, description: string) {
    this.user_id = user_id;
    this.name = name;
    this.description = description
  }

}
