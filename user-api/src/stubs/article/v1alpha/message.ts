/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "article.v1alpha";

export interface Article {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  userId?: string;
}

export interface ArticleWithComments {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  comments?: Comment[];
  userId?: string;
}

export interface Comment {
  id?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  userId?: string;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";
