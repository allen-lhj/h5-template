export interface OptionsItem {
  id: string;
  name: string;
}

export type optionsResult = {
  items: OptionsItem[];
};
export interface baseParams {
  com_id?: string;
  dept_id?: string;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
