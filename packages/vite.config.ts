import { resolve } from 'path';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import VueJsx from '@vitejs/plugin-vue-jsx';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import Inspect from 'vite-plugin-inspect';
import AutoImport from 'unplugin-auto-import/vite';
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform';

export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      allow: [resolve(__dirname, '..')],
    },
  },
  plugins: [
    VueJsx(),
    MarkdownTransform(),
    AutoImport({
      dirs: [resolve(__dirname, '.vitepress/theme/composables')],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/core',
        // '@vueuse/head',
      ],
      eslintrc: {
        enabled: true,
      },
      exclude: [/dist/],
      dts: './.vitepress/auto-imports.d.ts',
    }),
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      dts: './.vitepress/components.d.ts',
    }),
    Icons({
      compiler: 'vue3',
      defaultStyle: 'display: inline-block',
    }),
    UnoCSS(),
    Inspect(),
  ],
  resolve: {
    alias: {
      // '@vueuse/shared': resolve(__dirname, 'shared/index.ts'),
      // '@vueuse/core': resolve(__dirname, 'core/index.ts'),
      // '@vueuse/integrations': resolve(__dirname, 'integrations/index.ts'),
      // '@chiulipine/components': resolve(__dirname, 'components/index.ts'),
      // '@vueuse/docs-utils': resolve(__dirname, '.vitepress/plugins/utils.ts'),
    },
    dedupe: ['vue', '@vue/runtime-core'],
  },
  optimizeDeps: {
    exclude: ['@vue/theme', '@vueuse/shared', '@vueuse/core', 'body-scroll-lock'],
    include: [
      'axios',
      // 'js-yaml',
      // 'nprogress',
      // 'qrcode',
      // 'rxjs',
      // 'tslib',
      // 'fuse.js',
      // 'universal-cookie',
    ],
  },
});
