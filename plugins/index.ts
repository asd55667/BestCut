import type { Plugin } from 'vite';

import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import Inspect from 'vite-plugin-inspect';

import { configHtmlPlugin } from './html';
import { configHmrPlugin } from './hmr';
import { configMockPlugin } from './mock';
import { configAutoImportPlugin } from './auto-import';
import { configPagePlugin } from './page';
import { configI18nPlugin } from './i18n';
import { configComponentsPlugin } from './components';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    vueJsx(),

    Unocss(),
  ];

  !isBuild && vitePlugins.push(configHmrPlugin());

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  vitePlugins.push(configI18nPlugin(viteEnv, isBuild));

  vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(configAutoImportPlugin());

  vitePlugins.push(configComponentsPlugin());

  vitePlugins.push(configPagePlugin());

  !isBuild && vitePlugins.push(Inspect());

  return vitePlugins;
}
