import { reactive } from 'vue';
import { optionsCompanyListApi } from '@/api/company';
import { optionsDeptListApi } from '@/api/dept';
import type { DropdownItemOption } from 'vant';
type OptionsItem = {
  comOptions: DropdownItemOption[];
  deptOptions: DropdownItemOption[];
};
export const options = reactive<OptionsItem>({
  comOptions: [],
  deptOptions: []
});
// Get company list

export const fetchCompanyList = async () => {
  try {
    const { items } = await optionsCompanyListApi();
    options.comOptions = items.map((o) => Object.assign(o, { text: o.name, value: o.id }));
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Get department list based on com_id
export const fetchDeptList = async (com_id: string | undefined) => {
  try {
    const { items } = await optionsDeptListApi(com_id);
    options.deptOptions = items.map((o) => Object.assign(o, { text: o.name, value: o.id }));
  } catch (error) {
    console.log(error);
  }
};
