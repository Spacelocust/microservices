import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms/server';

import { registerSchema } from '$schemas/register';
import { userClient } from '$server/grpc/client';

export const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  const form = await superValidate(registerSchema);

  return { form };
};

export const actions = {
  register: async (event) => {
    const { request } = event;
    const form = await superValidate<typeof registerSchema, string>(request, registerSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    // TODO handle invalid data error
    const { status } = await userClient.register(form.data);

    // Idk if this is useful, might not be once a try/catch is added
    if (status.code === 'OK') {
      throw redirect(303, '/login', { type: 'success', message: 'Account created successfully! You can now log in.' }, event);
    }

    return { form };
  },
};
