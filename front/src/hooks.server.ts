import { RpcError } from '@protobuf-ts/runtime-rpc';

import { authClient } from '$server/grpc/client';
import { defaultOptions } from '$utils/cookie';
import { parseIp } from '$utils/ip';

export const handle = async ({ event, resolve }) => {
  event.locals.user = null;

  const jwt = event.cookies.get('token');

  if (!jwt) {
    return resolve(event);
  }

  try {
    const auth = await authClient.validate({ jwt });

    if (auth.response.ok) {
      event.locals.user = auth.response.user ?? null;
    }
  } catch (error) {
    if (!(error instanceof RpcError)) {
      throw error;
    }

    const refreshToken = event.cookies.get('refreshToken');

    if (!refreshToken) {
      event.cookies.delete('token');

      return resolve(event);
    }

    try {
      const authRefresh = await authClient.refreshToken({ refreshToken, ip: parseIp(event.getClientAddress()) });

      event.cookies.set('token', authRefresh.response.jwt, defaultOptions);
      event.locals.user = authRefresh.response.user ?? null;
    } catch (authRefreshError) {
      if (!(authRefreshError instanceof RpcError)) {
        throw authRefreshError;
      }

      event.cookies.delete('token');
      event.cookies.delete('refreshToken');
    }
  }

  return resolve(event);
};
