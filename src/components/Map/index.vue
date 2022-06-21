<template>
  <div id="wrapRef" style="width: 100%; height: 250px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'HomeMap',
  props: { mapData: { type: Object, default: () => {} } },
  setup() {
    const map: any = ref<HTMLElement | null>(null);
    function initMap() {
      map.value = new BMap.Map('wrapRef', { enableMapClick: false });
      var point = new BMap.Point(116.307223, 40.056379);
      map.value.centerAndZoom(point, 15);
      map.value.enableScrollWheelZoom(true);
      map.value.enableAutoResize();
      console.log('init');
    }
    onMounted(() => {
      initMap();
    });
  }
});
</script>

<style lang="less" scoped>
#wrapRef {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
