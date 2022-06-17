<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="监控" />
      <div class="filter-container">
        <filterSelect @com_id="comChange" @dept_id="deptChange" />
      </div>
    </div>
    <div class="main">
      <div class="table">
        <div class="row">
          <div class="cell">姓名</div>
          <div class="cell">疲劳</div>
          <div class="cell">静止</div>
          <div class="cell">姿态</div>
          <div class="cell">清醒</div>
          <div class="cell">劳动量</div>
          <div class="cell">姿态</div>
          <div class="cell">跌落</div>
        </div>
        <div class="row">
          <div class="cell">张三三</div>
          <div class="cell">30</div>
          <div class="cell">27</div>
          <div class="cell">100</div>
          <div class="cell">20</div>
          <div class="cell">49</div>
          <div class="cell">99</div>
          <div class="cell">89</div>
        </div>
        <div class="row">
          <div class="cell">张三三</div>
          <div class="cell">30</div>
          <div class="cell">27</div>
          <div class="cell">100</div>
          <div class="cell">20</div>
          <div class="cell">49</div>
          <div class="cell">99</div>
          <div class="cell">89</div>
        </div>
        <div class="row">
          <div class="cell">张三三</div>
          <div class="cell">30</div>
          <div class="cell">27</div>
          <div class="cell">100</div>
          <div class="cell">20</div>
          <div class="cell">49</div>
          <div class="cell">99</div>
          <div class="cell">89</div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, reactive } from 'vue';
import Tabbar from '@/components/Tabbar/index.vue';
import filterSelect from '@/components/filterSelect/index.vue';
import { NavBar } from 'vant';
import { role } from '@/hook/role';
import { getMonitorListApi } from '@/api/home';
import type { DeviceResultItem } from '@/api/model/home';
export default defineComponent({
  name: 'Home',
  components: { Tabbar, NavBar, filterSelect },
  setup() {
    const listData = ref<DeviceResultItem[] | undefined>(undefined);
    const listQuery = reactive({
      com_id: '',
      dept_id: '',
      limit: 20,
      page: 1
    });
    function comChange(id: string) {
      listQuery.com_id = id;
      getListData();
    }
    function deptChange(id: string) {
      listQuery.dept_id = id;
      getListData();
    }
    const getListData = async () => {
      try {
        const { items } = await getMonitorListApi(listQuery);
        listData.value = items;
      } catch (error) {
        console.log(error);
      }
    };

    return { role, comChange, deptChange, listData };
  }
});
</script>

<style lang="less" scoped>
@import url(../../style/public.less);
.wrap {
  width: 100%;
  height: 100vh;
  .main {
    width: 375px;
    overflow: auto;
    .table {
      display: table;
      width: 475px;
      border: 1px solid #ccc;
      .row {
        display: table-row;
        border: 1px solid #ccc;
        .cell {
          display: table-cell;
          border: 1px solid #ccc;
          padding: 5px;
          width: 60px;
        }
        .cell:first-child {
          width: 80px;
          position: sticky;
          left: 0;
          z-index: 1;
          background: pink;
          white-space: normal;
        }
      }
    }
  }
  .filter-text {
    .filter-text();
  }
}
</style>
