import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configComponentsPlugin() {
  return Components({
    dirs: ['src/components', 'src/layouts'],
    extensions: ['vue', 'md'],
    dts: 'typings/components.d.ts',
    resolvers: [AntDesignVueResolver()],
    types: [
      {
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      },
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  });
}
