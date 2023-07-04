import { loadFlashMessage } from 'sveltekit-flash-message/server';

export const load = loadFlashMessage(async ({ locals, url }) => {
  return {
    user: structuredClone(locals.user),
    url: url.pathname,
  };
});
