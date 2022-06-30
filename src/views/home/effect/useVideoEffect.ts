import { ref } from 'vue';
import { useVideoStore } from '@/stores/modules/video';
import { useUserStore } from '@/stores/modules/user';
import { Toast } from 'vant';
const videoStore = useVideoStore();

const userStore = useUserStore();

export const videoBtn = ref(false);
const { sw_user, sw_pwd, sw_server } = userStore.getVideoInfo;
export function swInit() {
  const jSW = (window as any).jSW;
  return new Promise((resolve, reject) => {
    jSW.swInit({
      url: import.meta.env.VITE_GLOB_SW_HOST,
      calltype: jSW.CallProtoType.HTTP, // AUTO: IE优先使用OCX, 如果希望IE仍然使用HTTP通信, 请使用jSW.CallProtoType.HTTP
      config: { bManualLP: true }, // 手动获取设备列表
      oninit: (code: string) => {
        if (code === jSW.RcCode.RC_CODE_S_OK) {
          videoStore.$state.session = new window.jSW.SWSession({
            server: sw_server?.host,
            port: sw_server?.port,
            onopen: (sess: any) => {
              sess.swLogin({
                user: sw_user,
                password: sw_pwd
              });
            }
          });
          const cb = () => {};
          videoStore.$state.session.swAddCallBack('login', (...args: any[]) => {
            const result = sessionCallback(cb, ...args);
            if (result) {
              videoBtn.value = true;
              resolve(videoStore.$state.session);
            }
          });
          videoStore.$state.session.swAddCallBack('logout', () => {
            if (videoStore.$state.session) videoStore.$state.session.swLogout();
          });
        } else {
          switch (parseInt(code)) {
            case jSW.RcCode.RC_CODE_E_INVALIDIP:
              Toast({
                message: 'Server IP Error',
                position: 'top'
              });
              break;
            case jSW.RcCode.RC_CODE_E_INVALIDPORT:
              Toast({
                message: 'Server Port Error',
                position: 'top'
              });
              break;
            case jSW.RcCode.RC_CODE_E_BVCU_CONNECTFAILED:
              Toast({
                message: 'Connect Failed',
                position: 'top'
              });
              break;
            case jSW.RcCode.RC_CODE_E_USERNAME:
            case jSW.RcCode.RC_CODE_E_PASSWORD:
              Toast({
                message: 'No User Or Password error',
                position: 'top'
              });
              break;
            case jSW.RcCode.RC_CODE_E_BVCU_AUTHORIZE_FAILED:
              Toast({
                message: 'Authorize Failed',
                position: 'top'
              });
              break;
            default:
              Toast({
                message: 'Fail, error code: ' + code,
                position: 'top'
              });
              break;
          }
          reject();
        }
      }
    });
  });
}

export function searchDeviceList() {
  if (videoStore.$state.session !== null) {
    videoStore.$state.session.swSearchPuList({
      iPosition: 0,
      iCount: 100,
      stFilter: {
        iOnlineStatus: 0,
        iTimeBegin: 0,
        iTimeEnd: 0,
        szIDOrName: null
      },
      callback: () => {}
    });
  }
}

export function searchDevice(puid: any) {
  videoStore.$state.channel = videoStore.$state.session.swGetPuChanel(puid, 0);
}
// 推出登陆
export function videoLogout() {
  if (videoStore.$state.session) {
    videoStore.$state.session.swDispose();
  }
}

function sessionCallback(cb: any, sender?: any, event?: any, json?: any) {
  try {
    if (json.code === window.jSW.RcCode.RC_CODE_S_OK) {
      // videoBtn = false;
      cb(true, {});
      return true;
    } else {
      let msg = 'Fail, error code: ' + json.code;
      switch (parseInt(json.code)) {
        case window.jSW.RcCode.RC_CODE_E_INVALIDIP:
          msg = 'Server IP Error';
          break;
        case window.jSW.RcCode.RC_CODE_E_INVALIDPORT:
          msg = 'Server Port Error';
          break;
        case window.jSW.RcCode.RC_CODE_E_USERNAME:
        case window.jSW.RcCode.RC_CODE_E_PASSWORD:
          msg = 'No User Or Password error';
          break;
        case window.jSW.RcCode.RC_CODE_E_BVCU_AUTHORIZE_FAILED:
          msg = 'Authorize Failed';
          break;
        case window.jSW.RcCode.RC_CODE_E_BVCU_CONNECTFAILED:
          msg = 'ConnectFailed';
          break;
      }
      // createMessage.error(msg);
      cb(false, { msg, code: parseInt(json.code) });
    }
  } catch (e) {
    console.log(e);
    console.log(sender);
    console.log(event);
  }
}
