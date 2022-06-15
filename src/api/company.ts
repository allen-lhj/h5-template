import { defHttp } from '@/service';
import type { optionsResult } from './model/baseModel';

export const optionsCompanyListApi = () => defHttp.get<optionsResult>({ url: '/company' });
