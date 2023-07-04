import { IsInt, Length } from "class-validator";

export class CreateArticleDto {
  @Length(4, 20)
  title: string;

  @Length(20, 255)
  content: string;
}

export class UpdateArticleDto {
  @IsInt()
  id: number;

  @Length(4, 20)
  title?: string;

  @Length(20, 255)
  content?: string;
}