/* eslint-disable */
import { Article, ArticleWithComments, Comment, EventType } from "./message";

export const protobufPackage = "article.v1alpha";

export interface AddCommentRequest {
  articleId?: string;
  userId?: string;
  commentContent?: string;
}

export interface AddCommentResponse {
  comment?: Comment;
}

export interface RemoveCommentRequest {
  articleId?: string;
  contentId?: string;
}

export interface RemoveCommentResponse {
  article?: ArticleWithComments;
}

export interface UsingRequest {
  username?: string;
  articleId?: string;
  eventType?: EventType;
}

export interface UsingResponse {
  username?: string;
  articleId?: string;
  eventType?: EventType;
}

export interface UsingStreamRequest {
}

export interface UsingStreamResponse {
  username?: string;
  articleId?: string;
  eventType?: EventType;
}

export interface StreamArticlesRequest {
}

export interface StreamArticlesResponse {
  article?: Article;
  eventType?: string;
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
  /** The field will contain name of the resource requested. */
  id?: string;
}

export interface GetArticleResponse {
  article?: ArticleWithComments;
}

export interface CreateArticleRequest {
  article?: Article;
}

export interface CreateArticleResponse {
  article?: Article;
}

export interface UpdateArticleRequest {
  /** The Article resource which replaces the resource on the server. */
  article?: Article;
}

export interface UpdateArticleResponse {
  article?: Article;
}

export interface DeleteArticleRequest {
  /** The resource name of the Article to be deleted. */
  id?: string;
}

export interface DeleteArticleResponse {
  article?: Article;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";
