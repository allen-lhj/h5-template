<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="标题" left-text="返回" left-arrow>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </NavBar>
    </div>
    <div class="main">
      <div class="map">
        <HomeMap />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { NavBar } from 'vant';
import HomeMap from '@/components/Map/index.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: { NavBar, HomeMap },
  setup() {
    const route = useRoute();
    const es = ref<EventSource | null>(null);
    onMounted(() => {
      const query = route.query;
      const url = `/api/status?com_id=${query.com_id}&dept_id=${query.dept_id}&imei=${query.iemi}`;
      es.value = new EventSource(url);
      es.value.addEventListener('update', (event: any) => {
        const data = JSON.parse(event.data);
        console.log(data);
      });
    });

    onUnmounted(() => {
      es.value?.close();
      es.value = null;
    })
  }
});
</script>

<style lang="less" scoped>
.wrap {
  .main {
    width: 100%;
    height: 100px;
  }
}
</style>
