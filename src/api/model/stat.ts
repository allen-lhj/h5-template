import type { baseParams } from './baseModel';
export interface basicItem {
  dept: string;
  drowsy: number;
  faint: number;
  id: number;
  off: number;
  sober: number;
  tired: number;
}
export type statusItem = {
  company: string;
  name: string;
  updated: number;
} & basicItem;
export interface statusListFetchResult<T> {
  items: T[];
  total: number;
}

export interface statusParams extends baseParams {
  begin: string;
  end: string;
  page: number;
  limit: number;
}
