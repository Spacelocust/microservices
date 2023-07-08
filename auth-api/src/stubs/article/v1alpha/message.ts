/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "article.v1alpha";

export interface Article {
  id?: number;
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  userId?: number;
}

export interface ArticleWithComments {
  id?: number;
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  comments?: Comment[];
  userId?: number;
}

export interface Comment {
  id?: number;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  userId?: number;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";
