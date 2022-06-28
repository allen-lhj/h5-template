<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="监控" />
      <div class="filter-container">
        <Dropdown :listQuery="listQuery" @com_id="comChange" @dept_id="deptChange" />
      </div>
    </div>
    <div class="main">
      <router-link
        v-for="item of listData"
        :key="item.id"
        :to="{
          path: `/detail/${item.id}`,
          query: { com_id: item.com_id, dept_id: item.dept_id, iemi: item.imei }
        }"
      >
        <div class="card-list">
          <div class="list-title">
            {{
              `姓名: ${item.name}  ${parseTime(item.modified, '{y}-{m}-{d} {h}:{i}:{s}')}的意识状态`
            }}
          </div>
          <div class="list-content">
            <div class="content-item">
              <span class="data">{{ item.lucidity }}</span>
              <span class="title">清醒度</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.fatigue }}</span>
              <span class="title">疲劳度</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.focus }}</span>
              <span class="title">专注度</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.silence }}</span>
              <span class="title">静止度</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.attitude }}</span>
              <span class="title">姿态</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.state }}</span>
              <span class="title">体征</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.workload }}</span>
              <span class="title">劳动量</span>
            </div>
            <div class="content-item">
              <span class="data">{{ item.soc }}</span>
              <span class="title">电量</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';

import Dropdown from '@/components/DropdownMenu/index.vue';
import { NavBar } from 'vant';
import { role } from '@/hook/role';
import { getMonitorListApi } from '@/api/home';
import type { DeviceResultItem } from '@/api/model/home';
import { parseTime } from '@/utils';
import { timerRequest } from '@/hook/watchRouteTimer';
import {test} from './effect/useVideoEffect'
export default defineComponent({
  name: 'Home',
  components: { NavBar, Dropdown },
  setup() {
    const listData = ref<DeviceResultItem[] | undefined>(undefined);
    const listQuery = reactive({
      com_id: '',
      dept_id: '',
      limit: 30,
      page: 1,
      showall: 0
    });
    onMounted(() => {
      timerRequest('Home', getListData);
      test()
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

    return { role, listQuery, comChange, deptChange, listData, parseTime };
  }
});
</script>

<style lang="less" scoped>
@import url(../../style/public.less);
.wrap {
  width: 100%;
  height: 100vh;
  background: var(--yu-gray-color--light);
  .header {
    position: fixed;
    height: 100px;
    top: 0;
    z-index: 1;
    background: var(--yu-gray-color--light);
    width: 100%;
  }
  .main {
    position: absolute;
    top: 100px;
    bottom: 100px;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    width: 100%;
    height: 500px;
    margin-bottom: 200px;
    .card-list {
      width: calc(100% - 25px);
      margin: 5px auto;
      border-radius: 6px;
      background-color: var(--yu-white-color);
      box-shadow: var(--yu-border-shadow--light);
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .list-title {
        font-weight: bolder;
        color: #000;
        font-size: 14px;
      }
      .list-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        height: 60px;

        .content-item {
          width: 80px;
          height: 40px;
          display: flex;
          flex-direction: column;
          text-align: center;
          border-right: 1px solid #c4c4c4;
          border-top: 1px solid #c4c4c4;
          padding: 2px;
          .data {
            font-size: 14px;
            font-weight: bolder;
            text-align: center;
          }
          .title {
            font-size: 10px;
            text-align: center;
            color: #c4c4c4;
          }
        }
        .content-item:nth-child(-n + 4) {
          border-top: none;
        }
        .content-item:nth-child(4),
        .content-item:nth-child(8) {
          border-right: none;
        }
      }
    }
  }
  .filter-text {
    .filter-text();
  }
}
</style>
