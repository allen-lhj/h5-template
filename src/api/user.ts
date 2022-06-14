import { defHttp } from '@/service';
import type { LoginParams, UserModel } from './model/user';
enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/auth/info',
  GetToken = '/auth/token'
}

export const loginApi = (params: LoginParams) =>
  defHttp.post<UserModel>({ url: Api.Login, params });

export type TokenResult = {
  token: string;
};
/**
 * @description: getUserInfo
 */

export const getUserInfo = (token: string) =>
  defHttp.get<UserModel>({ url: Api.GetUserInfo, params: { token } });

export const getToken = () => defHttp.get<TokenResult>({ url: Api.GetToken });

export const LogoutApi = () => defHttp.post({ url: Api.Logout });
