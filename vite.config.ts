import { resolve } from 'path';
import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { loadEnv } from 'vite';
const base = './';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  return {
    root,
    base,
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: [
        {
          find: /\@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      host: true,
      port: 8080,
      proxy: {
        '/api': {
          target: 'https://osm.hitbb.cn',
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, '')
        }
      }
    }
  };
};
