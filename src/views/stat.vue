<template>
  <div class="wrap">
    <NavBar title="统计" />
    <div class="filter-container">
      <div class="filter-time" @click="isPickerShow = !isPickerShow">
        {{ parseTime(currentDate, '{y}-{m}-{d}') }}
      </div>
      <div class="filter-company" @click="isComPickerShow = !isComPickerShow">
        {{ companyText }}
      </div>
      <div class="filter-department"></div>
    </div>
    <Tabbar />
    <!-- date time picker  -->
    <van-popup v-model:show="isPickerShow" position="top" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="handleDate"
        title="选择年月日"
      />
    </van-popup>
    <van-popup v-model:show="isComPickerShow" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="选择公司"
        :columns-field-names="{ text: 'name' }"
        :columns="options.comOptions"
        @confirm="onComConfirm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import Tabbar from '@/components/Tabbar/index.vue';
import { NavBar, Popup } from 'vant';
import { parseTime } from '@/utils';
import { useUserStore } from '@/stores/modules/user';
import { optionsCompanyListApi } from '@/api/company';
import type { OptionsItem } from '@/api/model/baseModel';
export default defineComponent({
  name: 'Stat',
  components: { Tabbar, NavBar, Popup },
  setup() {
    const role = useUserStore().getRole();
    let options = reactive<any>({
      comOptions: [],
      deptOptions: []
    });
    const pickerText = reactive({
      companyText: '',
      departmentText: ''
    });
    const popupParams = reactive({
      isPickerShow: false,
      isComPickerShow: false,
      isDeptPickerShow: false
    });
    onMounted(() => {
      if (role === 1 || role === 3) {
        fetchCompanyList();
      }
    });
    const onComConfirm = (value: any) => {
      pickerText.companyText = value.name;
      popupParams.isComPickerShow = false;
    };

    const fetchCompanyList = async () => {
      try {
        const { items } = await optionsCompanyListApi();
        options.comOptions = items;
        // comColumns.value = transfromColumns(items);
      } catch (error) {
        console.log(error);
        return undefined;
      }
    };

    let currentDate = ref(new Date());
    // datepicker confirm
    const handleDate = () => {
      popupParams.isPickerShow = false;
    };
    return {
      ...toRefs(popupParams),
      ...toRefs(pickerText),
      onComConfirm,
      options,
      currentDate,
      parseTime,
      handleDate
    };
  }
});
</script>
<style lang="less" scoped>
.wrap {
  background: var(--yu-gray-color--light);
  min-height: 100vh;
  .filter-container {
    display: flex;
    justify-content: space-around;
    margin-top: 2px;
    padding: 10px;
    .filter-time,
    .filter-company,
    .filter-department {
      display: inline-block;
      width: 90px;
      height: 30px;
      padding: 3px 10px;
      background-color: #fff;
      border: 1px solid #e1e4eb;
      border-radius: 5px;
      box-shadow: var(--yu-border-shadow--light);
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      text-overflow: ellipsis;
      color: #9fa5ac;
      font-weight: bolder;
    }
  }
}
</style>
