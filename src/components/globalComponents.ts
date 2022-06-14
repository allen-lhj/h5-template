import type { App } from 'vue';
import { Button, Form, Field, CellGroup } from 'vant';

export const registerGlobalComponent = (app: App) => {
  app.use(Button).use(Field).use(CellGroup).use(Form);
};
