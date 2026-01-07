export class CategoryDto {
  name: string;
  emoji: string;
  color: string;

  constructor(name: string, emoji: string, color: string) {
    this.name = name;
    this.emoji = emoji;
    this.color = color;
  }

}
