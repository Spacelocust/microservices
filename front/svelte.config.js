import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
      scss: true,
      typescript: true,
    }),
    vitePreprocess({}),
  ],
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $server: 'src/lib/server',
      $stores: 'src/lib/stores',
      $types: 'src/lib/types',
      $utils: 'src/lib/utils',
      $schemas: 'src/lib/schemas',
      $constants: 'src/lib/constants',
      $api: 'src/lib/api',
    },
  },
};

export default config;
