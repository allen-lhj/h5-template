import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const t = ref<ReturnType<typeof setInterval> | undefined>(undefined);
export function timerRequest(routeName: string, func: () => Promise<void>): void {
  const route = useRoute();
  watch(
    () => route.name,
    (name) => {
      // route name no routeName， stop request.
      if (name !== routeName) {
        if (t.value) clearInterval(t.value);
      } else {
        t.value = setInterval(() => func(), 2000);
      }
    },
    { deep: true, immediate: true }
  );
}
