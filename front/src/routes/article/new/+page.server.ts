import { RpcError } from '@protobuf-ts/runtime-rpc';
import { error, fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms/server';

import { articleSchema } from '$schemas/article';
import { articleClient } from '$server/grpc/client';

export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  const form = await superValidate(articleSchema);

  return { form };
};

export const actions = {
  new: async (event) => {
    const { request, locals, cookies } = event;

    if (!locals.user) {
      throw error(401, 'You do not have permission to perform this action.');
    }

    const form = await superValidate<typeof articleSchema, string>(request, articleSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { status, response } = await articleClient.createArticle(form.data, {
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
      });

      if (status.code === 'OK' && response.article) {
        throw redirect(303, `/article/${response.article.id}`, { type: 'success', message: 'Article created successfully.' }, event);
      }

      throw error(500, 'An unknown error occurred. Please try again later.');
    } catch (e) {
      if (e instanceof RpcError && e.code === 'PERMISSION_DENIED') {
        throw error(401, 'You do not have permission to perform this action.');
      }

      throw e;
    }
  },
};
