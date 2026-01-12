export class CreateTaskDto {

  title: string;
  description?: string;
  category_id: number;

  constructor(title: string, category_id: number) {
    this.title = title;
    this.category_id = category_id
  }

}
