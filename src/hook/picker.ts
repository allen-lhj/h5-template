import { reactive } from 'vue';
import { optionsCompanyListApi } from '@/api/company';
import { optionsDeptListApi } from '@/api/dept';

export const options = reactive<any>({
  comOptions: [],
  deptOptions: []
});
// Get company list

export const fetchCompanyList = async () => {
  try {
    const { items } = await optionsCompanyListApi();
    options.comOptions = items;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Get department list based on com_id
export const fetchDeptList = async (com_id: string | undefined) => {
  try {
    const { items } = await optionsDeptListApi(com_id);
    options.deptOptions = items;
  } catch (error) {
    console.log(error);
  }
};
