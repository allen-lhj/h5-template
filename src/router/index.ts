import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/modules/user';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') return next();
  try {
    const userStore = useUserStore();

    const data = await userStore.getInfo();
    if (!data) return next('/login');
    next();
  } catch (error) {
    console.log(error);
  }
});

export default router;
