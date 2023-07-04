/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  AddCommentRequest,
  AddCommentResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleRequest,
  DeleteArticleResponse,
  GetArticleRequest,
  GetArticleResponse,
  ListArticlesRequest,
  ListArticlesResponse,
  RemoveCommentRequest,
  RemoveCommentResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "./request";

export const protobufPackage = "article.v1alpha";

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";

export interface ArticleServiceClient {
  listArticles(request: ListArticlesRequest, metadata?: Metadata): Observable<ListArticlesResponse>;

  getArticle(request: GetArticleRequest, metadata?: Metadata): Observable<GetArticleResponse>;

  createArticle(request: CreateArticleRequest, metadata?: Metadata): Observable<CreateArticleResponse>;

  updateArticle(request: UpdateArticleRequest, metadata?: Metadata): Observable<UpdateArticleResponse>;

  deleteArticle(request: DeleteArticleRequest, metadata?: Metadata): Observable<DeleteArticleResponse>;
}

export interface ArticleServiceController {
  listArticles(
    request: ListArticlesRequest,
    metadata?: Metadata,
  ): Promise<ListArticlesResponse> | Observable<ListArticlesResponse> | ListArticlesResponse;

  getArticle(
    request: GetArticleRequest,
    metadata?: Metadata,
  ): Promise<GetArticleResponse> | Observable<GetArticleResponse> | GetArticleResponse;

  createArticle(
    request: CreateArticleRequest,
    metadata?: Metadata,
  ): Promise<CreateArticleResponse> | Observable<CreateArticleResponse> | CreateArticleResponse;

  updateArticle(
    request: UpdateArticleRequest,
    metadata?: Metadata,
  ): Promise<UpdateArticleResponse> | Observable<UpdateArticleResponse> | UpdateArticleResponse;

  deleteArticle(
    request: DeleteArticleRequest,
    metadata?: Metadata,
  ): Promise<DeleteArticleResponse> | Observable<DeleteArticleResponse> | DeleteArticleResponse;
}

export function ArticleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["listArticles", "getArticle", "createArticle", "updateArticle", "deleteArticle"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ArticleService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ArticleService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ARTICLE_SERVICE_NAME = "ArticleService";

export interface CommentServiceClient {
  addComment(request: AddCommentRequest, metadata?: Metadata): Observable<AddCommentResponse>;

  removeComment(request: RemoveCommentRequest, metadata?: Metadata): Observable<RemoveCommentResponse>;

  updateComment(request: UpdateCommentRequest, metadata?: Metadata): Observable<UpdateCommentResponse>;
}

export interface CommentServiceController {
  addComment(
    request: AddCommentRequest,
    metadata?: Metadata,
  ): Promise<AddCommentResponse> | Observable<AddCommentResponse> | AddCommentResponse;

  removeComment(
    request: RemoveCommentRequest,
    metadata?: Metadata,
  ): Promise<RemoveCommentResponse> | Observable<RemoveCommentResponse> | RemoveCommentResponse;

  updateComment(
    request: UpdateCommentRequest,
    metadata?: Metadata,
  ): Promise<UpdateCommentResponse> | Observable<UpdateCommentResponse> | UpdateCommentResponse;
}

export function CommentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["addComment", "removeComment", "updateComment"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CommentService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CommentService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMMENT_SERVICE_NAME = "CommentService";
