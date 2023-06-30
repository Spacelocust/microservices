import { Injectable } from "@nestjs/common";
import { Article, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async find(where: Prisma.ArticleWhereUniqueInput): Promise<Article|null> {
    return this.prisma.article.findUnique({
      where
    });
  }

  async create(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({
      data
    });
  }

  async findAll(params: {
    where?: Prisma.ArticleWhereUniqueInput
  }): Promise<Article[]> {
    const { where } = params;
    return this.prisma.article.findMany({
      where
    });
  }

  async update(params: {
    data: Prisma.ArticleCreateInput,
    where: Prisma.ArticleWhereUniqueInput
  }): Promise<Article> {
    const { data, where } = params;
    return this.prisma.article.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ArticleWhereUniqueInput): Promise<Article> {
    return this.prisma.article.delete({
      where
    });
  }
}