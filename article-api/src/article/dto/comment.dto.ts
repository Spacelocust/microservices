import { IsInt, Length } from "class-validator";

export class CreateCommentDto {
  @Length(20, 255)
  content: string;

  @IsInt()
  articleId: number;
}

export class UpdateCommentDto {
  @Length(20, 255)
  content?: string;
}