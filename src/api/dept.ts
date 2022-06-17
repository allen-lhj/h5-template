import { defHttp } from '@/service';
import type { optionsResult } from './model/baseModel';

/**
 * @description: Get department list based on com_id
 */
export const optionsDeptListApi = (com_id: string | undefined) =>
  defHttp.get<optionsResult>({ url: '/department', params: { com_id: com_id } });
