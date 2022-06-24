import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '../Layout/index.vue';
NProgress.configure({ showSpinner: false });
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/home/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/stat',
      name: 'Stat',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Stat',
          component: () => import('../views/stat/index.vue')
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'HomeDetail',
      component: () => import('../views/homeDetail/index.vue')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('../views/my.vue')
    },
    {
      path: '/map',
      name: 'Map',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Map',
          component: () => import('../views/map/index.vue')
        }
      ]
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
