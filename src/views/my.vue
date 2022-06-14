<template>
  <div class="section user-section">
    <div class="head">
      <van-nav-bar class="nav-bar">
        <template #left>
          <van-icon name="arrow-left" @click="router.push('/')" />
        </template>

        <template #title>
          <div class="title">用户中心</div>
        </template>
      </van-nav-bar>

      <div class="head-bg">
        <img class="img1" :src="bg1" alt="" />
        <img class="img2" :src="bg2" alt="" />
      </div>
      <div class="user-info">
        <div class="card">
          <div class="avatar">
            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="" />
          </div>
          <div class="info">
            <div class="user-name ellipsis">{{ info.account }}</div>
            <div class="phone ellipsis">
              {{ info.phone?.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="user-info-list">
        <van-list>
          <van-cell title="姓名">{{ info.name }}</van-cell>
        </van-list>
      </div>
    </div>
    <div class="footer">
      <van-button round block type="primary" class="btn-item" @click="hanldeLogout">
        退出登陆
      </van-button>
    </div>
    <Tabbar />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import bg1 from '@/assets/images/bg-img1.png';
import bg2 from '@/assets/images/bg-img2.png';
import Tabbar from '@/components/Tabbar/index.vue';
import List from '@/components/List/index.vue';
import { useUserStore } from '@/stores/modules/user';
import type { UserModel, Info } from '@/api/model/user';
export default defineComponent({
  components: { Tabbar, List },
  setup() {
    const info = ref<Info>({
      id: undefined,
      account: '',
      created: 0,
      com_id: null,
      dept_id: null,
      login_ip: '',
      login_time: 0,
      modified: 0,
      name: '',
      phone: '',
      role: 0,
      status: 0,
      pid: 0,
      short: null
    });
    const router = useRouter();
    const userInfo = async () => {
      try {
        const data: UserModel = await useUserStore().getInfo();
        if (!data.code && data.user !== undefined) {
          info.value = { ...data.user };
          console.log(info);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const hanldeLogout = async () => {
      try {
        await useUserStore().logout();
        router.push('/login');
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      userInfo();
    });
    return { bg1, bg2, router, info, hanldeLogout };
  }
});
</script>

<style lang="less" scoped>
.user-section {
  background: var(--yu-gray-color--light);
  min-height: 100vh;
  .head {
    height: 170px;
    position: relative;
    .nav-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: transparent;
      border: none;
      .van-icon {
        color: var(--yu-white-color);
      }
      .title {
        color: var(--yu-white-color);
      }
      &:after {
        border: none;
      }
    }
    .head-bg {
      height: 150px;
      background: var(--yu-linear-bg-color);
      position: relative;
      overflow: hidden;
      width: 100%;
      img {
        display: inline-block;
        position: absolute;
        width: 80px;
        height: auto;
        opacity: 0.2;
        &.img1 {
          top: 0;
          right: 0;
        }
        &.img2 {
          bottom: 0;
          left: 0;
        }
      }
    }
    .user-info {
      position: absolute;
      top: 66px;
      left: 13px;
      width: calc(100% - 26px);
      .card {
        display: flex;
        line-height: 20px;
        border-radius: 6px;
        background-color: var(--yu-white-color);
        text-align: center;
        box-shadow: var(--yu-border-shadow--light);
        position: relative;
        padding: 20px;
        .avatar {
          width: 60px;
          height: 60px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 16px;
          box-shadow: var(--yu-border-shadow--light);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          color: rgba(36, 45, 61, 1);
          font-size: 12px;
          line-height: 18px;
          padding-top: 10px;
          text-align: left;
          width: calc(100% - 70px);
          .user-name {
            margin-bottom: 4px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .body {
    width: calc(100% - 26px);
    margin: 20px auto 13px;
    .user-info-list {
      line-height: 20px;
      overflow: hidden;
      background-color: var(--yu-white-color);
      border-radius: 6px;
    }
  }
}
.btn-item {
  display: block;
  width: 80%;
  margin: 0 auto;
  border: none;
  height: 48px;
  line-height: 48px;
  background: var(--yu-linear-bg-color);
}
.clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
