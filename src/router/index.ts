import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/authentication",
    name: "authentication",
    component: () => import("../views/Authentication.vue"),
  },
  {
    path: "/paint/:uid",
    name: "paint",
    component: () => import("../views/Paint.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((from, to, next) => {
//   if (
//     to.name !== "authentication" &&
//     !store.getters.isAuth &&
//     from.name !== "authentication"
//   ) {
//     next({ name: "authentication" });
//   } else next();
// });

export default router;
