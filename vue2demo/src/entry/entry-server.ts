import { VueMetaPlugin } from 'vue-meta'
import createApp from '../main'
/**
 * @description: 服务端创建vue app，挂载router、store
 * @return {*}
 */
export default async (context: { meta: VueMetaPlugin, url: string, state: object }) => {
  try {
    const { app, router, store } = createApp()
    const meta = app.$meta()

    router.push(context.url)
    // 404等路由特殊情况处理
    // eslint-disable-next-line
    context.meta = meta

    // 等待异步组件加载完成
    // await new Promise(router.onReady.bind(router))
    await new Promise((resolve, reject) => {
      router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        if (!matchedComponents.length) {
          return reject(Promise.resolve({ code: 404 }))
        }
        return Promise.all(
          matchedComponents.map((Component: any) => {
            if (Component.asyncData) {
              return Component.asyncData({
                store,
                route: router.currentRoute,
                client: false,
              })
            }
            return []
          })
        )
          .then(() => {
            // 在所有预取钩子(preFetch hook) resolve 后，
            // 我们的 store 现在已经填充入渲染应用程序所需的状态。
            // 当我们将状态附加到上下文，
            // 并且 `template` 选项用于 renderer 时，
            // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
            // eslint-disable-next-line
            context.state = store.state
            resolve(app)
          })
          .catch(reject)
      }, reject)
    })

    return app
  } catch (error) {
    // ssr-router error
    return error
  }
}
