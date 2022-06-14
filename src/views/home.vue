<template>
  <Tabbar />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabbar from '@/components/Tabbar/index.vue';
export default defineComponent({
  name: 'Home',
  components: { Tabbar },
  setup() {}
});
</script>
