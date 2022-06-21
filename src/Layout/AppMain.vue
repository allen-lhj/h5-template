<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    const route = useRoute();
    const key = computed(() => route.path);
    return { key };
  }
});
</script>
<template>
  <section>
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
