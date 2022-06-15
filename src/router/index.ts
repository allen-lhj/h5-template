import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/stat',
      name: 'Stat',
      component: () => import('../views/stat.vue')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('../views/my.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.path === '/login') return next();
  try {
    const userStore = useUserStore();

    const data = await userStore.getInfo();
    if (!data.user) return next('/login');
    next();
  } catch (error) {
    next('/login');
    NProgress.done();
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
