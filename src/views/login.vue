<template>
  <div class="login-container">
    <img class="container_img" :src="logo" alt="logo" />
    <div class="login-form">
      <van-form label-width="0" @submit="handleSubmit">
        <van-cell-group inset>
          <van-field
            v-model="userForm.account"
            :rules="[{ required: true, message: '请填写账号' }]"
            name="account"
            label=""
            placeholder="用户名"
            maxlength="11"
            clearable
          />
          <van-field
            v-model="userForm.password"
            type="password"
            name="password"
            label=""
            placeholder="密码"
            clearable
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="form-btn">
          <van-button round block type="primary" native-type="submit" class="btn-item h50">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { LoginParams } from '@/api/model/user';
import { useUserStore } from '@/stores/modules/user';
import logo from '@/assets/favicon.png';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
export default defineComponent({
  name: 'Login',
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const userForm = reactive<LoginParams>({
      account: '',
      password: ''
    });
    const handleSubmit = async (values: any) => {
      try {
        await store.login(values);
        router.push('/');
      } catch (error) {
        Toast.loading({
          message: '登陆失败...',
          forbidClick: true
        });
        console.log(error);
      }
    };
    return { userForm, handleSubmit, logo };
  }
});
</script>

<style lang="less" scoped>
.login-container {
  width: 375px;
}
.container_img {
  display: block;
  width: 64px; /* px-to-viewport-ignore */
  height: 64px; /* px-to-viewport-ignore */
  margin: 60px auto 40px;
}
.form-btn {
  margin: 40px auto 30px;
  .btn-item {
    display: block;
    width: 80%;
    margin: 0 auto;
    border: none;
    height: 48px;
    line-height: 48px;
    background: var(--yu-linear-bg-color);
  }
}
</style>
