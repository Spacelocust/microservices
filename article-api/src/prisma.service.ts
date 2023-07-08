import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { Timestamp } from './stubs/google/protobuf/timestamp';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(async (params, next) => {
      const data = await next(params);

      if (!data) {
        return data;
      }

      if (params.model !== 'Comment' && params.model !== 'Article' ) return data;

      const mapToProto = (result) => {
        if (params.action === 'create') {
          result.createdAt = this.toTimestamp(result.createdAt);
        }
        
        result.updatedAt = this.toTimestamp(result.updatedAt);
        return result;
      };

      if (data.length >= 0) {
        return data.map(mapToProto);
      }

      return mapToProto(data);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private toTimestamp(date: Date): Timestamp {
    const timeMS = date.getTime();
    return {
      seconds: timeMS / 1000,
      nanos: (timeMS % 1000) * 1e6,
    };
  }
}
