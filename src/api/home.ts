import { defHttp } from '@/service';
import type { DeviceResult, MonitorQuery } from './model/home';

export const getMonitorListApi = (params: MonitorQuery) =>
  defHttp.get<DeviceResult>({ url: '/monitor', params });

interface swauth {
  puid: string;
  sw_pwd: string;
  sw_user: string;
}
export const getDeviceVideoServiceInfo = (id: number) =>
  defHttp.get<swauth>({ url: `/device/${id}/swauth` });
