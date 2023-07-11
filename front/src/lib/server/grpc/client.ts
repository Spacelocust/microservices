import { ChannelCredentials } from '@grpc/grpc-js';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';

import { ArticleServiceClient, CommentServiceClient } from '$api/stubs/article/v1alpha/service.client';
import { AuthServiceClient } from '$api/stubs/auth/v1alpha/service.client';
import { UserServiceClient } from '$api/stubs/user/v1alpha/service.client';

import { env } from '$env/dynamic/private';

export const credentials = ChannelCredentials.createInsecure();

const userTransport = new GrpcTransport({
  host: env.USER_API_URL,
  channelCredentials: credentials,
});

export const userClient = new UserServiceClient(userTransport);

const authTransport = new GrpcTransport({
  host: env.AUTH_API_URL,
  channelCredentials: credentials,
});

export const authClient = new AuthServiceClient(authTransport);

const articleTransport = new GrpcTransport({
  host: env.ARTICLE_API_URL,
  channelCredentials: credentials,
});

export const articleClient = new ArticleServiceClient(articleTransport);

export const commentClient = new CommentServiceClient(articleTransport);
