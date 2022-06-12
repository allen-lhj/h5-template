import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
// console.log(env.VUE_APP_BASE_URL);
import { defHttp } from './service';
const test = (code, pin) => defHttp.post({ url: `/risk_report/${code}`, data: { pin } });

async function testA() {
  await test('7A,hkC', '9063');
}

testA();
