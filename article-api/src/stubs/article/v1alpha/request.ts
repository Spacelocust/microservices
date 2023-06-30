/* eslint-disable */
import { Article, ArticleWithComments, Comment } from "./message";

export const protobufPackage = "article.v1alpha";

export interface AddCommentRequest {
  articleId?: string;
  content?: string;
}

export interface AddCommentResponse {
  comment?: Comment;
}

export interface RemoveCommentRequest {
  id?: string;
}

export interface RemoveCommentResponse {
  article?: ArticleWithComments;
}

export interface ListArticlesRequest {
}

export interface ListArticlesResponse {
  articles?: Article[];
}

export interface GetArticleRequest {
  id?: string;
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
  title?: string;
  content?: string;
}

export interface UpdateArticleResponse {
  article?: Article;
}

export interface DeleteArticleRequest {
  id?: string;
}

export interface DeleteArticleResponse {
  article?: Article;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";
