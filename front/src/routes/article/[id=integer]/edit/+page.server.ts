import { RpcError } from '@protobuf-ts/runtime-rpc';
import { error, fail } from '@sveltejs/kit';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms/server';

import { UserRole } from '$api/stubs/user/v1alpha/message';
import { articleSchema } from '$schemas/article';
import { articleClient } from '$server/grpc/client';

export const load = async ({ locals, params }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  const { id } = params;
  const notFoundError = error(404, 'Article not found. Please check the URL and try again.');

  try {
    const articleRes = await articleClient.getArticle({ id: parseInt(id, 10) });
    const { article } = articleRes.response;

    if (!article) {
      throw notFoundError;
    } else if (article.userId.toString() !== locals.user.id && locals.user.role !== UserRole.ADMIN) {
      throw error(401, 'You do not have permission to view this page.');
    }

    const form = await superValidate(article, articleSchema);

    return { form, article: structuredClone(article) };
  } catch (e) {
    if (e instanceof RpcError) {
      throw notFoundError;
    }

    throw e;
  }
};

export const actions = {
  edit: async (event) => {
    const { request, locals, params, cookies } = event;

    if (!locals.user) {
      throw redirect(302, '/login');
    }

    const { id } = params;
    const form = await superValidate<typeof articleSchema, string>(request, articleSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { status, response } = await articleClient.updateArticle(
        { ...form.data, id: parseInt(id, 10) },
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

      if (status.code === 'OK' && response.article) {
        setFlash({ type: 'success', message: 'Article updated successfully.' }, event);
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
  delete: async (event) => {
    const { locals, params, cookies } = event;

    if (!locals.user) {
      throw redirect(302, '/login');
    }

    const { id } = params;

    try {
      const { status } = await articleClient.deleteArticle(
        { id: parseInt(id, 10) },
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

      if (status.code === 'OK') {
        throw redirect(303, `/`, { type: 'success', message: 'Article deleted successfully.' }, event);
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
