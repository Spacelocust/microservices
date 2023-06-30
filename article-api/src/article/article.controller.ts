import { Controller } from "@nestjs/common";

import { ArticleService } from "./article.service";
import { CommentService } from "./comment.service";
import { ListArticlesRequest, ListArticlesResponse } from "src/stubs/article/v1alpha/request";

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService, 
    private readonly commentService: CommentService
  ) {}

  async ListArticles(request: ListArticlesRequest): Promise<ListArticlesResponse> {
    return 
  }
}