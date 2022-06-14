import type { App } from 'vue';
import { Button, Form, Field, CellGroup, Tabbar, TabbarItem, NavBar, List } from 'vant';

export const registerGlobalComponent = (app: App) => {
  app
    .use(Button)
    .use(Field)
    .use(CellGroup)
    .use(Form)
    .use(Tabbar)
    .use(TabbarItem)
    .use(NavBar)
    .use(List);
};
