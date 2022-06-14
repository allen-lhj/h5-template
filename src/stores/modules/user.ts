import { defineStore } from 'pinia';
import { loginApi, getToken, getUserInfo } from '@/api/user';
import type { LoginParams, UserModel } from '@/api/model/user';
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
  getters: {},
  actions: {
    setUserInfo(info: UserModel) {
      if (info) {
        this.user = info;
      }
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
    getInfo() {
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
    }
  }
});
