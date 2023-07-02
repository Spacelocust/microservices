import { redirect } from 'sveltekit-flash-message/server';

export const actions = {
  default: async (event) => {
    const { cookies } = event;

    cookies.delete('token');
    cookies.delete('refreshToken');

    throw redirect(303, '/login', { type: 'info', message: 'You are now logged out.' }, event);
  },
};
