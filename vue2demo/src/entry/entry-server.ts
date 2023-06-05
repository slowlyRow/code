import { VueMetaPlugin } from 'vue-meta';
import createApp from '../main';
/**
 * @description: 服务端创建vue app，挂载router、store
 * @return {*}
 */
export default async (context:{meta:VueMetaPlugin, url:string}) => {
  try {
    const { app, router } = createApp()
    const meta = app.$meta()

    router.push(context.url)
    // 404等路由特殊情况处理
    // eslint-disable-next-line
    context.meta = meta

    // 等待异步组件加载完成
    // await new Promise(router.onReady.bind(router))
    await new Promise((resolve, reject) => {
      router.onReady(() => { resolve('ok') }, reject)
    })

    return app
  } catch (error) {
    // ssr-router error
    return error
  }
};
