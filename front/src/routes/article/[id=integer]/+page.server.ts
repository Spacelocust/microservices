import { RpcError } from '@protobuf-ts/runtime-rpc';
import { error, fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms/server';

import { commentSchema } from '$schemas/comment.js';
import { articleClient, commentClient } from '$server/grpc/client.js';

export const load = async ({ params }) => {
  const { id } = params;
  const notFoundError = error(404, 'Article not found. Please check the URL and try again.');

  try {
    const articleRes = await articleClient.getArticle({ id: +id });
    const { article } = articleRes.response;

    if (!article) {
      throw notFoundError;
    }

    const form = await superValidate(commentSchema);

    return {
      article: structuredClone(article),
      form,
    };
  } catch (e) {
    if (e instanceof RpcError) {
      throw notFoundError;
    }

    throw e;
  }
};

export const actions = {
  comment: async (event) => {
    const { request, locals, cookies, params } = event;

    if (!locals.user) {
      throw error(401, 'You do not have permission to perform this action.');
    }

    const form = await superValidate<typeof commentSchema, string>(request, commentSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { status, response } = await commentClient.addComment(
        { ...form.data, articleId: +params.id },
        {
          interceptors: [
            {
              interceptUnary(next, method, input, options) {
                if (!options.meta) {
                  options.meta = {};
                }

                const token = cookies.get('token');

                if (token) {
                  options.meta.Authorization = `Bearer ${token}`;
                }

                return next(method, input, options);
              },
            },
          ],
        },
      );

      if (status.code === 'OK' && response.comment) {
        setFlash({ type: 'success', message: 'Comment posted successfully.' }, event);
      } else {
        throw error(500, 'An unknown error occurred. Please try again later.');
      }

      return { form };
    } catch (e) {
      if (e instanceof RpcError && e.code === 'PERMISSION_DENIED') {
        throw error(401, 'You do not have permission to perform this action.');
      }

      throw e;
    }
  },
};
