import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { store } from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'logIn',
    component: () => import('../views/LogIn.vue'),
  },
  {
    path: '/paint/:uid',
    name: 'paint',
    component: () => import('../views/Paint.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta?.requiresAuth)) {
    if (store.getters['user/isAuth']) {
      next();
    } else {
      next({ name: 'logIn' });
    }
  } else {
    next();
  }
});

export default router;
