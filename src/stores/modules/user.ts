import { defineStore } from 'pinia';
import { loginApi, getToken, getUserInfo, LogoutApi } from '@/api/user';
import type { LoginParams, UserModel } from '@/api/model/user';
interface userState {
  user: null | UserModel;
  role: number | undefined;
  token: string;
  sw_pwd: undefined | string;
  sw_user: undefined | string;
  sw_server: undefined | { host: string; port: number };
}
type videoService = {
  sw_user?: string | null;
  sw_pwd?: string | null;
  sw_server?: { host: string; port: number };
};
export const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    user: null,
    role: undefined,
    token: '',
    sw_pwd: undefined,
    sw_user: undefined,
    sw_server: undefined
  }),
  getters: {
    getUserInfo(): UserModel | undefined {
      if (this.user !== null) return this.user;
    },
    getVideoInfo(): videoService {
      return { sw_user: this.sw_user, sw_pwd: this.sw_pwd, sw_server: this.sw_server };
    }
  },
  actions: {
    setUserInfo(info: UserModel | null) {
      this.user = info;
    },
    setToken(token: string) {
      this.token = token;
    },
    setRole(role: number | undefined) {
      this.role = role;
    },
    getRole() {
      return this.role;
    },
    login(params: LoginParams) {
      return new Promise((resolve, reject) => {
        getToken()
          .then(({ token }) => {
            this.setToken(token);
            loginApi(params)
              .then((data) => {
                this.setUserInfo(data);
                this.setRole(data.user?.role);
                this.sw_pwd = data.sw_pwd;
                this.sw_server = data.sw_server;
                this.sw_user = data.sw_user;
                resolve(data);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getInfo(): Promise<UserModel> {
      return new Promise((resolve, reject) => {
        getToken().then(({ token }) => {
          getUserInfo(token)
            .then((data: UserModel) => {
              this.setUserInfo(data);
              this.setRole(data.user?.role);
              this.sw_pwd = data.sw_pwd;
              this.sw_server = data.sw_server;
              this.sw_user = data.sw_user;
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    },
    logout(): Promise<void> {
      return new Promise((resolve, rejcet) => {
        LogoutApi().then(() => {
          this.setUserInfo(null);
          this.setRole(undefined);
          resolve();
        });
      });
    }
  }
});
