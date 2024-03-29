import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './meta'
// eslint-disable-next-line import/order
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false;

export default () => {
  // 同步路由状态(route state)到 store
  if (store && router) {
    sync(store, router)
  }

  return {
    app: new Vue({
      router,
      store,
      render: (h) => h(App),
    }),
    router,
    store,
  }
};
