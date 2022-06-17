import { defHttp } from '@/service';
import type { DeviceResult, MonitorQuery } from './model/home';

export const getMonitorListApi = (params: MonitorQuery) =>
  defHttp.get<DeviceResult>({ url: '/monitor', params });
