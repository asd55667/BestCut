import type { Plugin } from 'vite';

import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE } = env;

  const plugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: { title: VITE_GLOB_APP_TITLE },
      // Embed the generated app.config.js file
      tags: isBuild ? [{ tag: 'script', attrs: { src: '' } }] : [],
    },
  });
  const htmlPlugin: Plugin = { name: 'vite-plugin-html', ...plugin };
  return htmlPlugin;
}
