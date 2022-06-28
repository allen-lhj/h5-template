import { defineStore } from 'pinia';
// import { store } from '@/store';

interface videoState {
  session: any;
  channel: any;
}
export const useVideoStore = defineStore({
  id: 'video',
  state: (): videoState => ({
    session: null,
    channel: null
  })
});

// // Need to be used outside the setup
// export function useUserStoreWithOut() {
//   return useVideoStore(store);
// }
