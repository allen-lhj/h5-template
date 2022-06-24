import { reactive, ref } from 'vue';
import type { DeviceResultItem } from '@/api/model/home';
import { getMonitorListApi } from '@/api/home';
type Query = {
  com_id: string;
  dept_id: string;
  showall: number;
};
export const listQuery = reactive({
  com_id: '',
  dept_id: '',
  showall: 0
});

export const useFetchCoreDataEffect = () => {
  const distributeData = ref<DeviceResultItem[]>([]);
  const fetchCoreData = async (listQuery: Query) => {
    const { items } = await getMonitorListApi(listQuery);
    distributeData.value = items;
  };
  return { distributeData, fetchCoreData };
};
