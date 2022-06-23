<template>
  <div ref="chartRef" style="width: 94%; height: 150px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent]);
import { parseTime } from '../../utils';
export default defineComponent({
  name: 'HomeCharts',
  props: {
    chartData: { type: Object, default: () => {} },
    areaColor: { type: String, default: () => '' }
  },
  setup(props) {
    type NameOfSeries = {
      lucidity: string;
      silence: string;
      fatigue: string;
      cautel: string;
      focus: string;
    };
    const seriesName: NameOfSeries = {
      lucidity: '清醒度',
      silence: '静止度',
      fatigue: '疲劳度',
      cautel: '警觉度',
      focus: '专注度'
    };
    const chartRef = ref<HTMLElement | null>(null);
    let chart: echarts.ECharts | null = null;
    interface areaType {
      lucidity: { offset: number; color: string }[];
      fatigue: { offset: number; color: string }[];
      silence: { offset: number; color: string }[];
      cautel: { offset: number; color: string }[];
      focus: { offset: number; color: string }[];
    }
    const areaStyleColor: areaType = {
      lucidity: [
        {
          offset: 0,
          color: 'rgb(0, 255, 0)'
        },
        {
          offset: 1,
          color: 'rgb(127, 158, 68)'
        }
      ],
      fatigue: [
        {
          offset: 0,
          color: 'rgb(255,78,80)'
        },
        {
          offset: 1,
          color: 'rgb(249,212,35)'
        }
      ],
      silence: [
        {
          offset: 0,
          color: 'rgb(33,147,176)'
        },
        {
          offset: 1,
          color: 'rgb(109,213,237)'
        }
      ],
      cautel: [
        {
          offset: 0,
          color: 'rgb(255,0,153)'
        },
        {
          offset: 1,
          color: 'rgb(73,50,64)'
        }
      ],
      focus: [
        {
          offset: 0,
          color: 'rgb(142,46,210)'
        },
        {
          offset: 1,
          color: 'rgb(74,0,224)'
        }
      ]
    };

    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      grid: {
        containLabel: 'true',
        top: '4%',
        left: 0,
        right: 0,
        bottom: '1%'
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: false
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        interval: 15,
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: '#000'
        }
      },
      series: [
        {
          name: '清醒度',
          type: 'line',
          lineStyle: {
            color: '#67C23A',
            width: 1
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              areaStyleColor[props.areaColor as keyof areaType]
            )
          },
          // 线段显示节点
          showSymbol: false,
          hoverAnimation: false,
          // smooth: true,
          data: [] as [string, number][]
        }
      ]
    };
    const seriesData: [string, number][] = [];
    onMounted(() => {
      if (chartRef.value !== null) {
        chart = echarts.init(chartRef.value as HTMLElement);
        chart.showLoading({
          test: '加载中'
        });
      }
    });
    watch(
      () => props.chartData,
      (v) => {
        const time = parseTime(v.ts, '{y}-{m}-{d} {h}:{i}:{s}');
        // Delete from the front when more than one hundred points
        if (seriesData.length > 100) {
          seriesData.shift();
        }
        seriesData.push([time, props.chartData.value]);
        options.series[0].data = seriesData;
        // set area style
        options.series[0].areaStyle.color = new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          areaStyleColor[props.areaColor as keyof areaType]
        );
        // set line color
        options.series[0].lineStyle.color =
          areaStyleColor[props.areaColor as keyof areaType][0].color;
        options.series[0].name = seriesName[props.areaColor as keyof NameOfSeries];
        if (chart) {
          chart.hideLoading();
          options && chart.setOption(options);
        }
      }
    );
    return { chartRef };
  }
});
</script>
