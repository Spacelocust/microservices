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
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export interface ListArticlesResponse {
  /**
   * The field name should match the noun "Article" in the method name.
   * There will be a maximum number of items returned based on the page_size field in the request.
   */
  articles?: Article[];
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
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
