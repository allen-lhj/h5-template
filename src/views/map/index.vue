<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="详细数据" left-text="返回" left-arrow @click="handleLeftClick" />
      <div class="filter-container">
        <filterSelect @com_id="comChange" @dept_id="deptChange" />
      </div>
    </div>
    <div class="center">
      <div id="wrapRef" style="width: 100%; min-height: 450px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import filterSelect from '@/components/filterSelect/index.vue';
import sober from '@/assets/images/sober.png';
import { handleLeftClick } from '@/hook/routerBack';
import { listQuery, useFetchCoreDataEffect } from './useMapEffect';
import { NavBar } from 'vant';
export default defineComponent({
  name: 'Map',
  components: { filterSelect, NavBar },
  setup() {
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
    function comChange(id: string) {
      listQuery.com_id = id;
    }
    function deptChange(id: string) {
      listQuery.dept_id = id;
    }

    return { comChange, deptChange, handleLeftClick };
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
