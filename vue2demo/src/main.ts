import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './meta'

Vue.config.productionTip = false;

export default () => ({
  app: new Vue({
    router,
    store,
    render: (h) => h(App),
  }),
  router,
  store,
});
