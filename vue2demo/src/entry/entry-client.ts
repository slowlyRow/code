import createApp from '../main';

const { app, router, store } = createApp();

router.onReady(() => {
  // eslint-disable-next-line no-underscore-dangle
  if (window !== undefined && window.__INITIAL_STATE__) {
    const matchedComponents = router.getMatchedComponents()
    if (matchedComponents.length) {
      matchedComponents.forEach((Component: any) => {
        if (Component.asyncData) {
          Component.asyncData({
            store,
            route: router.currentRoute,
            client: true,
          })
        }
      })
    }

    // eslint-disable-next-line no-underscore-dangle
    store.replaceState(window.__INITIAL_STATE__)
  }

  app.$mount('#app', true);
}, ((err) => {
  throw new Error(err.message)
}))
