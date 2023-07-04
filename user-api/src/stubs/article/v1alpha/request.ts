/* eslint-disable */
import { Article, ArticleWithComments, Comment } from "./message";

export const protobufPackage = "article.v1alpha";

export interface AddCommentRequest {
  articleId?: number;
  content?: string;
}

export interface AddCommentResponse {
  comment?: Comment;
}

export interface RemoveCommentRequest {
  id?: number;
}

export interface RemoveCommentResponse {
  comment?: Comment;
}

export interface UpdateCommentRequest {
  id?: number;
  content?: string;
}

export interface UpdateCommentResponse {
  comment?: Comment;
}

export interface ListArticlesRequest {
}

export interface ListArticlesResponse {
  articles?: Article[];
}

export interface GetArticleRequest {
  id?: number;
}

export interface GetArticleResponse {
  article?: ArticleWithComments;
}

export interface CreateArticleRequest {
  title?: string;
  content?: string;
}

export interface CreateArticleResponse {
  article?: Article;
}

export interface UpdateArticleRequest {
  id?: number;
  title?: string;
  content?: string;
}

export interface UpdateArticleResponse {
  article?: Article;
}

export interface DeleteArticleRequest {
  id?: number;
}

export interface DeleteArticleResponse {
  article?: Article;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";
