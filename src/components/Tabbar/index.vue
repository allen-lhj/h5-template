<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/stat" icon="description">统计</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Tabbar',
  setup() {
    const active = ref(0);
    return { active };
  }
});
</script>
