<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="统计" />
      <div class="filter-container">
        <div class="filter-time" @click="isPickerShow = !isPickerShow">
          {{ parseTime(currentDate, '{y}-{m}-{d}') }}
        </div>
        <filterSelect @com_id="comChange" @dept_id="deptChange" />
      </div>
    </div>

    <div class="main">
      <div v-if="listData && listData?.length > 0">
        <div class="card" v-for="item in listData" :key="item.id">
          <div class="card-content" @click="clicktest(item.id)">
            <div class="content-header">
              {{ `${item.name}: ${parseTime(item.updated, '{y}-{m}-{d}')}的状态占比` }}
            </div>
            <div class="content-main">
              <div class="main-item">
                <span class="data">{{
                  `${(
                    (item.sober / (item.sober + item.drowsy + item.faint + item.off + item.tired)) *
                    100
                  ).toFixed(2)}` + '%'
                }}</span>
                <span class="title">清醒度</span>
              </div>
              <div class="main-item">
                <span class="data">{{
                  `${(
                    (item.faint / (item.sober + item.drowsy + item.faint + item.off + item.tired)) *
                    100
                  ).toFixed(2)}` + '%'
                }}</span>
                <span class="title">欠好</span>
              </div>
              <div class="main-item">
                <span class="data">{{
                  `${(
                    (item.drowsy /
                      (item.sober + item.drowsy + item.faint + item.off + item.tired)) *
                    100
                  ).toFixed(2)}` + '%'
                }}</span>
                <span class="title">思睡</span>
              </div>
              <div class="main-item">
                <span class="data">{{
                  `${(
                    (item.off / (item.sober + item.drowsy + item.faint + item.off + item.tired)) *
                    100
                  ).toFixed(2)}` + '%'
                }}</span>
                <span class="title">脱帽</span>
              </div>
            </div>
            <div class="content-footer">
              {{ parseTime(item.updated, '{h}:{i}:{s}') }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <van-empty description="无数据" />
      </div>
    </div>
    <!-- date time picker  -->
    <van-popup v-model:show="isPickerShow" position="top" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="handleDate"
        title="选择年月日"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { NavBar } from 'vant';
import filterSelect from '@/components/filterSelect/index.vue';
import { parseTime } from '@/utils';
import { fetchStatList } from '@/api/stat';
import type { statusItem } from '@/api/model/stat';
export default defineComponent({
  name: 'Stat',
  components: { NavBar, filterSelect },
  setup() {
    let listData = ref<statusItem[] | undefined>(undefined);
    const listQuery = reactive({
      com_id: '',
      dept_id: '',
      begin: '',
      end: '',
      limit: 20,
      page: 1
    });
    let currentDate = ref(new Date());
    let isPickerShow = ref(false);
    function comChange(id: string) {
      listQuery.com_id = id;
      getListData();
    }
    function deptChange(id: string) {
      listQuery.dept_id = id;
      getListData();
    }
    onMounted(() => {
      listQuery.begin = parseTime(currentDate.value, '{y}-{m}-{d}');
      listQuery.end = parseTime(currentDate.value, '{y}-{m}-{d}');
      getListData();
    });
    const getListData = async () => {
      try {
        const { items } = await fetchStatList(listQuery);
        listData.value = items;
      } catch (error) {
        console.log(error);
      }
    };

    // datepicker confirm
    const handleDate = (value: string) => {
      if (parseTime(value, '{y}-{m}-{d}') !== null) {
        listQuery.begin = parseTime(value, '{y}-{m}-{d}');
        listQuery.end = parseTime(value, '{y}-{m}-{d}');
      }
      isPickerShow.value = false;
      getListData();
    };
    function clicktest(id: number) {
      console.log(id);
    }
    return {
      clicktest,
      isPickerShow,
      comChange,
      deptChange,
      currentDate,
      listData,
      parseTime,
      handleDate
    };
  }
});
</script>
<style lang="less" scoped>
@import url(../../style/public.less);
.wrap {
  background: var(--yu-gray-color--light);
  min-height: 100vh;
  // height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    background: var(--yu-gray-color--light);
    .filter-container {
      display: flex;
      justify-content: space-around;
      margin-top: 2px;
      padding: 10px;
      .filter-time {
        .selects();
      }
    }
  }
  .main {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    width: 100%;
    .card {
      width: calc(100% - 25px);
      margin: 5px auto;
      border-radius: 6px;
      background-color: var(--yu-white-color);
      box-shadow: var(--yu-border-shadow--light);
      padding: 5px;
      .card-content {
        height: 120px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .content-header {
          font-weight: bolder;
          color: #000;
          font-size: 14px;
        }
        .content-main {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;

          .main-item {
            margin: auto 0;
            display: flex;
            flex-direction: column;
            width: 25%;
            height: 40px;
            border-right: 1px solid #c4c4c4;
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
          .main-item:nth-child(4) {
            border: none;
          }
        }
        .content-footer {
          color: #c4c4c4;
        }
      }
    }
  }
  .filter-text {
    .filter-text();
  }
}
</style>
