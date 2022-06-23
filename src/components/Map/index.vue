<template>
  <div id="wrapRef" style="width: 100%; height: 250px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue';
import sober from '@/assets/images/sober.png';
export default defineComponent({
  name: 'HomeMap',
  props: { mapData: { type: Object, default: () => {} } },
  setup(props) {
    const map: any = ref<HTMLElement | null>(null);
    function initMap() {
      map.value = new BMap.Map('wrapRef', { enableMapClick: false });
      var point = new BMap.Point(116.307223, 40.056379);
      map.value.centerAndZoom(point, 15);
      map.value.enableScrollWheelZoom(true);
      map.value.enableAutoResize();
    }
    onMounted(() => {
      initMap();
    });
    watch(
      () => props.mapData,
      (value) => {
        if (value) {
          map.value.clearOverlays();
          const centerPoint = new BMap.Point(value.lng, value.lat);
          map.value.panTo(centerPoint);
          const marker = new BMap.Marker(centerPoint, {
            icon: new BMap.Icon(sober, new BMap.Size(20, 20))
          });
          map.value.addOverlay(marker);
        }
      },
      { deep: true }
    );
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
<style>
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
