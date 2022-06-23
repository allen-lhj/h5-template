<template>
  <section>
    <div class="wrap">
      <div class="header">
        <NavBar title="详细数据" left-text="返回" left-arrow @click="handleLeftClick" />
      </div>
      <div class="main">
        <div class="map">
          <HomeMap :map-data="mapData" />
        </div>
        <div class="chart-container">
          <div class="chart-box">
            <div class="chart-title">清醒度实时状态</div>
            <div class="chart-content">
              <HomeCharts
                :chartData="{ ts: chartValue.ts, value: chartValue.lucidity }"
                :areaColor="lucidity"
              />
            </div>
          </div>
          <div class="chart-box">
            <div class="chart-title">疲劳度实时状态</div>
            <div class="chart-content">
              <HomeCharts
                :chartData="{ ts: chartValue.ts, value: chartValue.fatigue }"
                :areaColor="fatigue"
              />
            </div>
          </div>
          <div class="chart-box">
            <div class="chart-title">专注度实时状态</div>
            <div class="chart-content">
              <HomeCharts
                :chartData="{ ts: chartValue.ts, value: chartValue.focus }"
                :areaColor="focus"
              />
            </div>
          </div>
          <div class="chart-box">
            <div class="chart-title">静止度实时状态</div>
            <div class="chart-content">
              <HomeCharts
                :chartData="{ ts: chartValue.ts, value: chartValue.silence }"
                :areaColor="silence"
              />
            </div>
          </div>
          <div class="chart-box">
            <div class="chart-title">警觉度度实时状态</div>
            <div class="chart-content">
              <HomeCharts
                :chartData="{ ts: chartValue.ts, value: chartValue.cautel }"
                :areaColor="cautel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue';
import { NavBar } from 'vant';
import HomeMap from '@/components/Map/index.vue';
import HomeCharts from '@/components/DetailCharts/index.vue';
import { useRoute } from 'vue-router';
import type { DeviceRealTimeData } from '@/api/model/home';

export default defineComponent({
  components: { NavBar, HomeMap, HomeCharts },
  setup() {
    type ChartValues = {
      ts: undefined | number;
      state: undefined | number;
      lucidity: undefined | number;
      focus: undefined | number;
      attitude: undefined | number;
      silence: undefined | number;
      cautel: undefined | number;
      fatigue: undefined | number;
    };
    const areaStyle = {
      lucidity: 'lucidity',
      focus: 'focus',
      attitude: 'attitude',
      silence: 'silence',
      cautel: 'cautel',
      fatigue: 'fatigue'
    };
    const route = useRoute();
    const mapData = ref<DeviceRealTimeData | undefined>(undefined);
    const es = ref<EventSource | null>(null);
    const chartValue = reactive<ChartValues>({
      ts: undefined,
      state: undefined,
      lucidity: undefined,
      focus: undefined,
      attitude: undefined,
      silence: undefined,
      cautel: undefined,
      fatigue: undefined
    });
    onMounted(() => {
      const query = route.query;
      const url = `/api/status?com_id=${query.com_id}&dept_id=${query.dept_id}&imei=${query.iemi}`;
      es.value = new EventSource(url);
      // eventSouce 连接成功
      es.value.onopen = function (e) {
        console.log(e);
      };
      es.value.addEventListener('update', (event: any) => {
        const data = JSON.parse(event.data);
        mapData.value = data;
        chartValue.ts = data.ts;
        chartValue.lucidity = data.lucidity;
        chartValue.fatigue = data.fatigue;
        chartValue.focus = data.focus;
        chartValue.attitude = data.attitude;
        chartValue.silence = data.silence;
        chartValue.cautel = data.cautel;
      });
    });

    onUnmounted(() => {
      es.value?.close();
      es.value = null;
    });
    const handleLeftClick = () => history.back();
    return { mapData, chartValue, ...toRefs(areaStyle), handleLeftClick };
  }
});
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  .main {
    width: 100%;
    .map {
      width: 100%;
      height: 250px;
    }
    .chart-container {
      background: var(--yu-gray-color--light);

      .chart-box {
        margin: 15px 0;
        background: #fff;
        .chart-title {
          font-weight: bold;
        }
        .chart-content {
          width: 96%;
          height: 160px;
          margin: 2px auto;
        }
      }
    }
  }
}
</style>
