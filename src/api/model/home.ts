import type { BasicFetchResult } from './baseModel';
export interface DeviceResultItem {
  attitude: number;
  boots: number;
  calm: number;
  cautel: number;
  com_id: number;
  company: string;
  dept: string;
  dept_id: number;
  duty: string;
  duty_id: number;
  event: number;
  fatigue: number;
  focus: number;
  id: number;
  imei: string;
  location: Array<number>;
  lucidity: number;
  modified: number;
  name: string;
  region: null | Array<number>;
  region_type: null | number;
  sigqua: number;
  silence: number;
  soc: number;
  staff_id: number;
  state: number;
  swdev: false | true;
  type: number;
  workcmpx: number;
  workload: number;
}
export type DeviceResult = BasicFetchResult<DeviceResultItem>;
export interface MonitorQuery {
  com_id?: string;
  dept_id?: string;
  limit?: number;
  page?: number;
  showall?: number;
}

export interface DeviceRealTimeData {
  lucidity: number;
  calm: number;
  seq: number;
  soc: number;
  ts: number;
  sigqu: number;
  fatigue: number;
  state: number;
  fall: number;
  lng: number;
  mode: number;
  cautel: number;
  attitude: number;
  focus: number;
  workload: number;
  lat: number;
  boots: number;
  rssi: number;
  silence: number;
  workcmpx: number;
}
