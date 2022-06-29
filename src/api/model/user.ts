export interface LoginParams {
  account: string;
  password: string;
}
export type userModel = {
  id: number;
  account?: string;
  created: number;
  com_id?: number;
  dept_id?: number;
  login_ip?: string;
  login_time?: number;
  modified?: number;
  name?: string;
  phone?: string;
  role: number;
  status: number;
};

export type UserModel = {
  code?: number;
  message?: string;
  sw_server?: {
    host: string;
    port: number;
  };
  sw_pwd?: undefined | string;
  sw_user?: undefined | string;
  user?: Info;
  detail?: string;
};

export interface Info {
  id: number | undefined;
  account: string;
  created: number;
  com_id: number | null;
  dept_id: number | null;
  login_ip?: string;
  login_time?: number;
  modified?: number;
  name?: string;
  phone?: string;
  role: number;
  status: number;
  pid: number;
  short: null | string;
}
