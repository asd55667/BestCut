import type { Plugin } from 'vite';

import Pages from 'vite-plugin-pages';

export function configPagePlugin(): Plugin {
  return Pages({
    extensions: ['vue', 'md'],
  });
}
