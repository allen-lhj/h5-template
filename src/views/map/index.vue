<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="详细数据" left-text="返回" left-arrow @click="handleLeftClick" />
      <div class="filter-container">
        <Dropdown :listQuery="listQuery" @com_id="comChange" @dept_id="deptChange" />
      </div>
    </div>
    <div class="center">
      <div id="wrapRef" style="width: 100%; min-height: 550px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import sober from '@/assets/images/sober.png';
import { handleLeftClick } from '@/hook/routerBack';
import { listQuery, useFetchCoreDataEffect } from './useMapEffect';
import useMap from '@/hook/useMapEffect';
import { timerRequest } from '@/hook/watchRouteTimer';
import { NavBar } from 'vant';
import type { DeviceResultItem } from '@/api/model/home';
import Dropdown from '@/components/DropdownMenu/index.vue';
export default defineComponent({
  name: 'Map',
  components: { Dropdown, NavBar },
  setup() {
    const { fetchCoreData, distributeData } = useFetchCoreDataEffect();
    const { map, initMap } = useMap();
    onMounted(() => {
      initMap();
      timerRequest('Map', fetchCoreData);
    });
    function comChange(id: string) {
      listQuery.com_id = id;
    }
    function deptChange(id: string) {
      listQuery.dept_id = id;
    }

    function addPoint(data: Ref<DeviceResultItem[]>, map: Ref<any>) {
      map.value.clearOverlays();
      const pointList: any = [];
      data.value.forEach((item) => {
        if (item.location[0] !== 0) {
          const point = new BMap.Point(item.location[0], item.location[1]);
          pointList.push(point);
          const marker = new BMap.Marker(point, {
            icon: new BMap.Icon(sober, new BMap.Size(20, 20))
          });
          map.value.addOverlay(marker);
        }
      });
      map.value.setViewport(pointList);
    }
    watch(
      () => distributeData,
      (val) => {
        addPoint(val, map);
      },
      { deep: true }
    );
    return { comChange, listQuery, deptChange, handleLeftClick };
  }
});
</script>
<style>
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
