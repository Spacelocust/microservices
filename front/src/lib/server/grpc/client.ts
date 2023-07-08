import { ChannelCredentials } from '@grpc/grpc-js';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';

import { AuthServiceClient } from '$api/stubs/auth/v1alpha/service.client';
import { UserServiceClient } from '$api/stubs/user/v1alpha/service.client';

import { env } from '$env/dynamic/private';

export const credentials = ChannelCredentials.createInsecure();

const userTransport = new GrpcTransport({
  host: env.USER_API_URL as string,
  channelCredentials: credentials,
});

export const userClient = new UserServiceClient(userTransport);

const authTransport = new GrpcTransport({
  host: env.AUTH_API_URL as string,
  channelCredentials: credentials,
});

export const authClient = new AuthServiceClient(authTransport);
