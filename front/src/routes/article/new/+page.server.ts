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
    const { request, locals } = event;

    if (!locals.user) {
      throw error(401, 'You do not have permission to perform this action.');
    }

    const form = await superValidate<typeof articleSchema, string>(request, articleSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    // TODO handle invalid data error
    const { status, response } = await articleClient.createArticle(form.data);

    if (status.code === 'OK' && response.article) {
      throw redirect(303, `/article/${response.article.id}`, { type: 'success', message: 'Article created successfully.' }, event);
    }

    return { form };
  },
};
