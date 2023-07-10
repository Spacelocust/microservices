import { Controller, UseGuards } from "@nestjs/common";
import { GrpcMethod, Payload, RpcException } from "@nestjs/microservices";
import { ValidatorOptions, validate } from "class-validator";
import { plainToInstance } from 'class-transformer';
import { status as RpcStatus } from '@grpc/grpc-js';

import { ArticleService } from "./article.service";
import { CommentService } from "./comment.service";
import {
  ListArticlesRequest,
  ListArticlesResponse,
  GetArticleRequest,
  GetArticleResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  UpdateArticleResponse,
  UpdateArticleRequest,
  DeleteArticleResponse,
  AddCommentResponse,
  DeleteArticleRequest,
  AddCommentRequest,
  RemoveCommentResponse,
  RemoveCommentRequest,
  UpdateCommentRequest,
  UpdateCommentResponse
} from "src/stubs/article/v1alpha/request";
import { GrpcAuthGuard } from "src/auth/auth.guard";
import { GRPCUser, UserRequest } from "src/auth/user.decorator";
import { CreateArticleDto, UpdateArticleDto } from "./dto/article.dto";
import { CreateCommentDto, UpdateCommentDto } from "./dto/comment.dto";
import { UserRole } from "src/stubs/user/v1alpha/message";

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService
  ) {}

  @GrpcMethod('ArticleService')
  async ListArticles(req: ListArticlesRequest): Promise<ListArticlesResponse> {
    try {
    const articles = await this.articleService.findAll({});
    return { articles } as ListArticlesResponse;
    } catch(err) {
      this.handlePrismaErr(err);
    }
  }

  @GrpcMethod('ArticleService')
  async GetArticle(@Payload() req: GetArticleRequest): Promise<GetArticleResponse> {
    if (typeof req.id !== 'number' || req.id === null) {
      throw new RpcException("Id parameter is missing or invalid");
    } else {
      try {
        const article = await this.articleService.find({
          id: +req.id
        });
        return { article } as GetArticleResponse;
      } catch(err) {
        this.handlePrismaErr(err);
      }
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ArticleService')
  async CreateArticle(@Payload() req: CreateArticleRequest, @GRPCUser() user: UserRequest): Promise<CreateArticleResponse> {
    try {
      const dto: CreateArticleDto = await this.validateDto(req, CreateArticleDto);
      const article = await this.articleService.create({ ...dto, userId: user.id });

      return { article } as CreateArticleResponse;
    } catch(err) {
      this.handlePrismaErr(err);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ArticleService')
  async UpdateArticle(@Payload() req: UpdateArticleRequest, @GRPCUser() user: UserRequest): Promise<UpdateArticleResponse> {
    try {
      const { id, ...dto }: UpdateArticleDto = await this.validateDto(req, UpdateArticleDto);
      const article = await this.articleService.update({ data: dto, where: {
        id,
        userId: user.role === UserRole.USER_ROLE_ADMIN ? undefined : user.id
      }});

      return { article } as CreateArticleResponse;
    } catch(err) {
      this.handlePrismaErr(err);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ArticleService')
  async DeleteArticle(@Payload() req: DeleteArticleRequest, @GRPCUser() user: UserRequest): Promise<DeleteArticleResponse> {
    if (typeof req.id !== 'number' || req.id === null) {
      throw new RpcException("Id parameter is missing");
    } else {
      try {
        const article = await this.articleService.delete({
          id: +req.id,
          userId: user.role === UserRole.USER_ROLE_ADMIN ? undefined : user.id
        });

        return { article } as DeleteArticleResponse;
      } catch(err) {
        this.handlePrismaErr(err);
      }
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('CommentService')
  async AddComment(@Payload() req: AddCommentRequest, @GRPCUser() user: UserRequest): Promise<AddCommentResponse> {
    try {
      const { articleId, ...dto }: CreateCommentDto = await this.validateDto(req, CreateCommentDto);
      const comment = await this.commentService.create({
        ...dto,
        userId: user.id,
        article: {
          connect: {
            id: articleId,
          }
        }
      });
      return { comment } as AddCommentResponse;
    } catch(err) {
      this.handlePrismaErr(err);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('CommentService')
  async RemoveComment(@Payload() req: RemoveCommentRequest, @GRPCUser() user: UserRequest): Promise<RemoveCommentResponse> {
    if (typeof req.id !== 'number' || req.id === null) {
      throw new RpcException("Id parameter is missing");
    } else {
      try {
        const comment = await this.commentService.delete({
          id: +req.id,
          userId: user.role === UserRole.USER_ROLE_ADMIN ? undefined : user.id
        });

        return { comment } as RemoveCommentResponse;
      } catch(err) {
        this.handlePrismaErr(err);
      }
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('CommentService')
  async UpdateComment(@Payload() req: UpdateCommentRequest, @GRPCUser() user: UserRequest): Promise<UpdateCommentResponse> {
    try {
      const dto: UpdateCommentDto = await this.validateDto(req, UpdateCommentDto);
      const comment = await this.commentService.update({
        data: dto,
        where: {
          id: +req.id,
          userId: user.role === UserRole.USER_ROLE_ADMIN ? undefined : user.id
        }
      });

      return { comment } as UpdateCommentResponse;
    } catch(err) {
      this.handlePrismaErr(err);
    }
  }


  private handlePrismaErr(err: Error) {
    if (err instanceof RpcException) throw err;
    else throw new RpcException(err);
  }

  private async validateDto(
    data: any,
    Dto: any,
    validatorOptions?: ValidatorOptions,
  ) {
    const dto = plainToInstance(Dto, data);
    const errors = await validate(dto, validatorOptions);

    if (errors.length > 0) {
      throw new RpcException({
        code: RpcStatus.INVALID_ARGUMENT,
        message: errors
          .map(
            ({ value, property, constraints }) =>
              `${value} is not a valid ${property} value (${Object.values(
                constraints,
              ).join(', ')})`,
          )
          .join('\n'),
      });
    }
    return dto as typeof Dto;
  }
}