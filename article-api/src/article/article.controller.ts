import { Controller } from "@nestjs/common";

import { ArticleService } from "./article.service";
import { CommentService } from "./comment.service";
import { ListArticlesRequest, ListArticlesResponse } from "src/stubs/article/v1alpha/request";
import { GrpcMethod, RpcException } from "@nestjs/microservices";

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService, 
    private readonly commentService: CommentService
  ) {}

  @GrpcMethod('ArticleService')
  async ListArticles(request: ListArticlesRequest): Promise<ListArticlesResponse> {
    try {
    const articles = await this.articleService.findAll({});
    return { articles } as ListArticlesResponse;
    } catch(err) {
      this.handlePrismaErr(err);
    }
  }

  private handlePrismaErr(err: Error) {
    console.error(err);
    if (err instanceof RpcException) throw err;
    else throw new RpcException(err);
  }
}