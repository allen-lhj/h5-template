import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
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
      path: '/my',
      name: 'My',
      component: () => import('../views/my.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') return next();
  try {
    const userStore = useUserStore();

    const data = await userStore.getInfo();
    if (!data.user) return next('/login');
    next();
  } catch (error) {
    next('/login');
  }
});

export default router;
