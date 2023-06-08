import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import('../views/AboutView.vue'),
    component: AboutView, // ！！！服务端渲染内容的页面/组件不能异步加载！！！
  },
  {
    path: '*',
    name: 'other',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
