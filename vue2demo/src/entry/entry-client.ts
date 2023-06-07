import createApp from '../main';

const { app, router, store } = createApp();

router.onReady(() => {
  // eslint-disable-next-line no-underscore-dangle
  if (window !== undefined && window.__INITIAL_STATE__) {
    // eslint-disable-next-line no-underscore-dangle
    store.replaceState(window.__INITIAL_STATE__)
  }

  app.$mount('#app', true);
}, ((err) => {
  throw new Error(err.message)
}))
