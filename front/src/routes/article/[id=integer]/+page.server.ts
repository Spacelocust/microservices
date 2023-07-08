import { RpcError } from '@protobuf-ts/runtime-rpc';
import { error } from '@sveltejs/kit';

import { articleClient } from '$server/grpc/client.js';

export const load = async ({ params }) => {
  const { id } = params;
  const notFoundError = error(404, 'Article not found. Please check the URL and try again.');

  try {
    const articleRes = await articleClient.getArticle({ id: parseInt(id, 10) });
    const { article } = articleRes.response;

    if (!article) {
      throw notFoundError;
    }

    return {
      article: structuredClone(article),
    };
  } catch (e) {
    if (e instanceof RpcError) {
      throw notFoundError;
    }

    throw e;
  }
};
