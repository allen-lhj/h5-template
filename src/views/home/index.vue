<template>
  <div class="wrap">
    <div class="header">
      <NavBar title="监控" />
      <div class="filter-container">
        <Dropdown :listQuery="listQuery" @com_id="comChange" @dept_id="deptChange" />
      </div>
    </div>
    <div class="main">
      <van-loading
        style="width: 30px; margin: 0 auto; z-index: 99; position: absolute; top: 50%; left: 49%"
        v-show="loading"
        type="spinner"
        color="#0094ff"
      />
      <div class="card-list" v-show="!loading" v-for="item of listData" :key="item.id">
        <!-- <router-link
          :to="{
            path: `/detail/${item.id}`,
            query: { com_id: item.com_id, dept_id: item.dept_id, iemi: item.imei }
          }"
        > -->
        <div class="card-left" @click="hanldeToDetail(item)">
          <div class="list-title">
            {{ `姓名: ${item.name}  ${parseTime(item.modified, '{h}:{i}:{s}')}的意识状态` }}
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
        <!-- </router-link> -->

        <div v-if="videoBtn && item.swdev" class="card-right" @click="checkVideo(item.id)">
          <img class="card-img" src="../../assets/images/video.png" alt="" />
        </div>
      </div>
    </div>
    <div class="video-el">
      <div class="video-box">
        <van-loading
          style="width: 30px; margin: 0 auto; z-index: 99; position: absolute; top: 50%; left: 49%"
          v-show="videoLoading"
          type="spinner"
          color="#0094ff"
        />
      </div>
      <img
        @click="closeVideo"
        class="turn-off-phone"
        src="../../assets/images/offphone.png"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';

import Dropdown from '@/components/DropdownMenu/index.vue';
import { NavBar } from 'vant';
import { role } from '@/hook/role';
import { getMonitorListApi, getDeviceVideoServiceInfo } from '@/api/home';
import type { DeviceResultItem } from '@/api/model/home';
import { parseTime } from '@/utils';
import { timerRequest } from '@/hook/watchRouteTimer';
import { swInit, videoBtn, searchDevice, searchDeviceList } from './effect/useVideoEffect';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { useVideoStore } from '@/stores/modules/video';
import { VideoEnum } from '@/enums/httpEnum';
export default defineComponent({
  name: 'Home',
  components: { NavBar, Dropdown },
  setup() {
    const loading = ref(true);
    const videoLoading = ref(true);
    const listData = ref<DeviceResultItem[] | undefined>(undefined);
    const listQuery = reactive({
      com_id: '',
      dept_id: '',
      limit: 30,
      page: 1,
      showall: 0
    });
    onMounted(() => {
      loading.value = true;
      timerRequest('Home', getListData);
      if (role !== 1) {
        swInit().then(() => {
          searchDeviceList();
        });
      }
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
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    };
    const router = useRouter();

    const hanldeToDetail = (item: DeviceResultItem) => {
      router.push({
        path: `/detail/${item.id}`,
        query: { com_id: item.com_id, dept_id: item.dept_id, iemi: item.imei }
      });
    };
    const videoStore = useVideoStore();
    const checkVideo = (id: number) => {
      Dialog.confirm({
        title: '提示',
        message: '是否进行视频通话'
      })
        .then(async () => {
          try {
            videoLoading.value = true;
            const { puid } = await getDeviceVideoServiceInfo(id);
            searchDevice(puid);
            const videoEl = document.getElementsByClassName('video-el')[0] as HTMLElement;
            const videoBox = document.getElementsByClassName('video-box')[0] as HTMLElement;
            videoEl.style.display = 'block';
            setTimeout(() => {
              videoStore.$state.channel.swOpenEx({
                ismuti: false,
                div: videoBox,
                // bstretch: true,
                prototype: 'httpflv',
                media: 10,
                bstretch: true,
                callback: (options: any, response: any) => {
                  if (response.emms.code === VideoEnum.RC_CODE_S_OK) {
                    videoLoading.value = false;
                    // videoConfig.loading = false;
                  } else {
                    // videoConfig.noPlay = true;
                    switch (response.emms.code) {
                      case VideoEnum.RC_CODE_E_FAIL:
                        // createMessage.error('失败');
                        break;
                      case VideoEnum.RC_CODE_E_NOTFOUND:
                        // createMessage.error('未找到');
                        break;
                      case VideoEnum.RC_CODE_E_BUSY:
                        // createMessage.error('繁忙');
                        break;
                      case VideoEnum.RC_CODE_E_TIMEOUT:
                        // createMessage.error('超时');
                        break;
                      case VideoEnum.RC_CODE_E_DISCONNECTED:
                        // createMessage.error('未连接');
                        break;
                    }
                  }
                }
              });
            }, 3000);
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          // on cancel
        });
    };
    function closeVideo() {
      if (videoStore.$state.channel) {
        videoStore.$state.channel.swClose();
      }
      videoStore.$state.channel = null;
      const videoEl = document.getElementsByClassName('video-el')[0] as HTMLElement;
      videoEl.style.display = 'none';
      return true;
    }

    return {
      videoLoading,
      closeVideo,
      checkVideo,
      role,
      videoBtn,
      hanldeToDetail,
      listQuery,
      comChange,
      deptChange,
      listData,
      loading,
      parseTime
    };
  }
});
</script>

<style lang="less" scoped>
@import url(../../style/public.less);
.wrap {
  width: 100%;
  height: 100vh;
  background: var(--yu-gray-color--light);
  .video-el {
    position: relative;
    display: none;
    width: 100%;
    height: 100vh;
    background-color: #000;
    z-index: 999;
    .video-box {
      width: 100%;
      height: 70vh;
    }
    .turn-off-phone {
      position: absolute;
      bottom: 20%;
      left: calc(50% - 32px);
      width: 64px;
      height: 64px;
      margin: 0 auto;
    }
  }
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
      flex-direction: wrap;
      justify-content: space-between;
      .card-left {
        flex: 9;
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
            width: 70px;
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
      .card-right {
        flex: 1;
        background-color: aquamarine;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .card-img {
          width: 100%;
          margin: auto;
        }
      }
    }
  }
  .filter-text {
    .filter-text();
  }
}
</style>
