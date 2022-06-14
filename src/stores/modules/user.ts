import { defineStore } from 'pinia';
import { loginApi, getToken, getUserInfo, LogoutApi } from '@/api/user';
import type { LoginParams, UserModel } from '@/api/model/user';
import { Toast } from 'vant';
interface userState {
  user: null | UserModel;
  roleList: [];
  token: string;
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    user: null,
    roleList: [],
    token: ''
  }),
  getters: {
    getUserInfo(): UserModel | undefined {
      if (this.user !== null) return this.user;
    }
  },
  actions: {
    setUserInfo(info: UserModel | null) {
      this.user = info;
    },
    setToken(token: string) {
      this.token = token;
    },
    login(params: LoginParams) {
      return new Promise((resolve, reject) => {
        getToken()
          .then(({ token }) => {
            this.setToken(token);
            loginApi(params)
              .then((data) => {
                this.setUserInfo(data);
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
          resolve();
        });
      });
    }
  }
});
