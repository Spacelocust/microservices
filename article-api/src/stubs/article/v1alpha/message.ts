/* eslint-disable */

export const protobufPackage = "article.v1alpha";

export enum EventType {
  EVENT_TYPE_CLICK = 0,
  EVENT_TYPE_CREATE = 1,
  EVENT_TYPE_UPDATE = 2,
  EVENT_TYPE_DELETE = 3,
  UNRECOGNIZED = -1,
}

export interface Article {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface ArticleWithComments {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: Comment[];
  userId?: string;
}

export interface Comment {
  id?: string;
  content?: string;
  createdAt?: string;
  userId?: string;
  articleId?: string;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";
