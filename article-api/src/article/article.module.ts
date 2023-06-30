import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService],
  exports: [ArticleService, CommentService],
})
export class ArticleModule {}