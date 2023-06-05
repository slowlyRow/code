import createApp from '../main';

const { app, router } = createApp();

router.onReady(() => {
  app.$mount('#app', true);
}, ((err) => {
  throw new Error(err.message)
}))
