import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import grpcOption from './config/grpc.option';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';
import { ArticleModule } from './article/article.module';

const envSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().default(4002),
  AUTH_API_URL: Joi.string().required(),
  HEALTH_PORT: Joi.number().default(3000),
  insecure: Joi.boolean().default(true),
  JAEGER_URL: Joi.string().required(),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => winstonConfig(cs),
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcOption(cs),
    }),
    ArticleModule,
    AuthModule,
    HealthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
