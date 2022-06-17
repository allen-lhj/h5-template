import { defHttp } from '@/service';

import type { statusParams, statusListFetchResult, statusItem } from './model/stat';

export const fetchStatList = (params: statusParams) =>
  defHttp.get<statusListFetchResult<statusItem>>({ url: '/stat', params });
