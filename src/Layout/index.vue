<script lang="ts">
import { defineComponent } from 'vue';
import Tabbar from '@/components/Tabbar/index.vue';
import AppMain from './AppMain.vue';
export default defineComponent({
  components: { Tabbar, AppMain },
  setup() {}
});
</script>
<template>
  <AppMain />
  <Tabbar />
</template>
