import type { CookieSerializeOptions } from 'cookie';

import { dev } from '$app/environment';

export const defaultOptions: CookieSerializeOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 1 month
  httpOnly: true,
  sameSite: 'lax',
  secure: !dev,
} as const;
