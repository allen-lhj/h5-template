<template>
  <div class="select">
    <div
      v-if="role === 1 || role === 3"
      class="filter-company"
      @click="isComPickerShow = !isComPickerShow"
    >
      <p class="filter-text">{{ companyText !== '' ? companyText : '选择公司' }}</p>
    </div>
    <div
      v-if="role === 1 || role === 3 || role === 11 || role === 12"
      class="filter-department"
      @click="isDeptPickerShow = !isDeptPickerShow"
    >
      <p class="filter-text">{{ departmentText !== '' ? departmentText : '选择部门' }}</p>
    </div>
    <van-popup v-model:show="isComPickerShow" position="bottom" :style="{ height: '40%' }">
      <van-picker
        title="选择公司"
        :columns-field-names="{ text: 'name' }"
        :columns="options.comOptions"
        @confirm="onComConfirm"
      />
    </van-popup>
    <van-popup v-model:show="isDeptPickerShow" position="bottom" :style="{ height: '40%' }">
      <van-picker
        title="选择项目"
        :columns-field-names="{ text: 'name' }"
        :columns="options.deptOptions"
        @confirm="onDeptConfirm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { role } from '@/hook/role';
import { options, fetchCompanyList, fetchDeptList } from '@/hook/picker';
import type { OptionsItem } from '@/api/model/baseModel';
export default defineComponent({
  emits: ['com_id', 'dept_id'],
  setup(_, { emit }) {
    onMounted(() => {
      if (role === 1 || role === 3) {
        fetchCompanyList();
      } else if (role === 11 || role === 12) {
        // com admin login
        fetchDeptList(undefined);
      }
    });
    const pickerText = reactive({
      companyText: '',
      departmentText: ''
    });
    const popupParams = reactive({
      isComPickerShow: false,
      isDeptPickerShow: false
    });
    const onComConfirm = (value: OptionsItem) => {
      pickerText.companyText = value.name;
      emit('com_id', value.id);
      popupParams.isComPickerShow = false;
      if (role === 1 || role === 3) {
        pickerText.departmentText = '';
        fetchDeptList(value.id);
      }
    };

    const onDeptConfirm = (value: OptionsItem) => {
      pickerText.departmentText = value.name;
      emit('dept_id', value.id);
      popupParams.isDeptPickerShow = false;
    };
    return {
      role,
      ...toRefs(popupParams),
      ...toRefs(pickerText),
      options,
      onComConfirm,
      onDeptConfirm
    };
  }
});
</script>
<style lang="less" scoped>
@import url(../../style/public.less);
.select {
  display: flex;
  justify-content: space-around;
}
.filter-company,
.filter-department {
  .selects();
}
.filter-text {
  .filter-text();
}
</style>
