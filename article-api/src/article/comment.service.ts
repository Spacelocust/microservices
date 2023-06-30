import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, Comment } from "@prisma/client";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ 
      data 
    });
  }

  async update(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { where, data } = params;
    return this.prisma.comment.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    });
  }
}