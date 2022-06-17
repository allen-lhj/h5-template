import type { App } from 'vue';
import {
  Button,
  Form,
  Field,
  CellGroup,
  Tabbar,
  TabbarItem,
  NavBar,
  List,
  DatetimePicker,
  Picker,
  Toast,
  Popup,
  Empty
} from 'vant';

export const registerGlobalComponent = (app: App) => {
  app
    .use(Button)
    .use(Field)
    .use(CellGroup)
    .use(Form)
    .use(Tabbar)
    .use(TabbarItem)
    .use(NavBar)
    .use(DatetimePicker)
    .use(Picker)
    .use(Popup)
    .use(Empty)
    .use(Toast)
    .use(List);
};
