import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import { registerGlobalComponent } from './components/globalComponents';
import './style/index.less';

const app = createApp(App);

app.use(createPinia());
app.use(router);
registerGlobalComponent(app);
app.mount('#app');
