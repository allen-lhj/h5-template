import { getAppEnvConfig } from '@/utils/env';
import { useVideoStore } from '@/stores/modules/video';
export function test() {
  console.log(import.meta.env.VITE_GLOB_SW_HOST);
  const env = import.meta.env;

  // const { VITE_GLOB_SW_HOST } = env;
  // console.log(VITE_GLOB_SW_HOST);
  // console.log(window['VITE_GLOB_SW_HOST' as any]);
}
