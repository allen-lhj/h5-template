<template>
  <div class="container">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        :title="comTitle"
        v-if="role === 1 || role === 3"
        v-model="listQuery.com_id"
        :options="comOptions"
        @change="onComConfirm"
      />
      <van-dropdown-item
        :title="deptTitle"
        v-model="listQuery.dept_id"
        :options="deptOptions"
        @change="onDeptConfirm"
      />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, ref } from 'vue';
import { role } from '@/hook/role';
import { options, fetchCompanyList, fetchDeptList } from '@/hook/picker';
export default defineComponent({
  name: 'Dropdown',
  props: {
    listQuery: { type: Object, default: () => {} }
  },
  setup(props, { emit }) {
    const comTitle = ref<string | undefined>('全部公司');
    const deptTitle = ref<string | undefined>('全部项目');
    onMounted(() => {
      if (role === 1 || role === 3) {
        fetchCompanyList();
      } else if (role === 11 || role === 12) {
        // com admin login
        fetchDeptList(undefined);
      }
    });
    const onComConfirm = (value: string) => {
      emit('com_id', value);
      const comData = options.comOptions.find((item) => item.value == value);
      comTitle.value = comData?.text;
      deptTitle.value = '全部项目';
      if (role === 1 || role === 3) {
        fetchDeptList(value);
      }
    };

    const onDeptConfirm = (value: string) => {
      emit('dept_id', value);
      const deptData = options.deptOptions.find((item) => item.value == value);
      deptTitle.value = deptData?.text;
    };

    return { role, ...toRefs(options), comTitle, deptTitle, onComConfirm, onDeptConfirm };
  }
});
</script>
