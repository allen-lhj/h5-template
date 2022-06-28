<template>
  <div id="wrapRef" style="width: 100%; height: 250px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import sober from '@/assets/images/sober.png';
import useMap from '@/hook/useMapEffect';
export default defineComponent({
  name: 'HomeMap',
  props: { mapData: { type: Object, default: () => {} } },
  setup(props) {
    const { map, initMap } = useMap();
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
