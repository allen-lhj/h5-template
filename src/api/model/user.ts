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
  sw_server: {
    host: string;
    port: number;
  };
  user: {
    id: number;
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
  };
};
