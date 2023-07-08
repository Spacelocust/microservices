import { RpcError } from '@protobuf-ts/runtime-rpc';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { message, superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$schemas/login';
import { authClient } from '$server/grpc/client';
import { defaultOptions } from '$utils/cookie.js';
import { parseIp } from '$utils/ip';

export const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  const form = await superValidate(loginSchema);

  return { form };
};

export const actions = {
  login: async (event) => {
    const { request, cookies, getClientAddress } = event;

    const form = await superValidate<typeof loginSchema, string>(request, loginSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    // RGPD has left the chat
    const ip = parseIp(getClientAddress());

    try {
      const { response } = await authClient.login({ ...form.data, ip });

      cookies.set('token', response.jwt, defaultOptions);
      cookies.set('refreshToken', response.refreshToken, {
        ...defaultOptions,
        maxAge: 60 * 60 * 24 * 30 * 3, // 3 months
      });

      throw redirect(303, '/', { type: 'success', message: 'You are now logged in.' }, event);
    } catch (error) {
      if (error instanceof RpcError) {
        return message(form, 'Invalid credentials', {
          status: 401,
        });
      }

      throw error;
    }
  },
};
