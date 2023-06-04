const path = require('path')
const chokidar = require('chokidar')
const webpack = require('webpack')
const fs = require('fs')
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware')
const { serverConfig, clientConfig } = require('./dev-config')

/**
 * @description: 开发服务器（监视变化并重新渲染）
 * @param {*} server
 * @param {*} callback
 * @return {*} Promise
 */
module.exports = function setupDevServer(app, callback) {
  const onReady = new Promise((resolve, reject) => {
    try {
      let serverBundle
      let template
      let clientManifest
      // 触发更新
      const update = () => {
        if (serverBundle && template && clientManifest) {
          callback(serverBundle, template, clientManifest)
          // 有数据且渲染成功
          resolve()
        }
      }

      // 监视template
      const htmlPath = path.resolve(__dirname, './public/index.html')
      // eslint-disable-next-line global-require
      template = fs.readFileSync(htmlPath, 'utf-8')
      chokidar.watch(htmlPath).on('change', () => {
        console.log('html-change');
        // eslint-disable-next-line global-require
        template = fs.readFileSync(htmlPath, 'utf-8')
        update()
      });

      // 监视server
      const serverCompiler = webpack(serverConfig)
      const serverSetup = devMiddleware(serverCompiler, {
        // webpack-dev-middleware options
      });
      serverCompiler.hooks.done.tap('watchServer', () => {
        const serverBundlePath = path.resolve(__dirname, './dist/server/vue-ssr-server-bundle.json')

        serverBundle = JSON.parse(serverSetup.context.outputFileSystem.readFileSync(serverBundlePath, 'utf-8'))
        update()
        console.log('success-server: ');
      })
      // 被上面内存持续中持续编译代替 serverSetup
      // serverCompiler.watch({}, (err, status) => {
      //   if (err) throw err
      //   if (status.hasErrors()) {
      //     console.log('watch-hasErrors: ', status.compilation.errors);
      //     return
      //   }
      //   const serverBundlePath = path.resolve(__dirname, './dist/server/vue-ssr-server-bundle.json')
      //   serverBundle = JSON.parse(fs.readFileSync(serverBundlePath, 'utf-8'))
      //   update()
      //   console.log('success: ', serverBundle);
      // })

      // 监视client
      // （提前处理config用于热载）
      clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
      clientConfig.entry.app = [
        'webpack-hot-middleware/client?quiet=true&reload=true',
        clientConfig.entry.app,
      ]
      clientConfig.output.filename = '[name].js' // 热载时不能使用hash
      const clientCompiler = webpack(clientConfig)
      const clientSetup = devMiddleware(clientCompiler, {
        // webpack-dev-middleware options
        publicPath: clientCompiler.outputFileSystem.publicPath,
      })
      clientCompiler.hooks.done.tap('watchClient', () => {
        const clientManifestPath = path.resolve(__dirname, './dist/client/vue-ssr-client-manifest.json')
        clientManifest = JSON.parse(clientSetup.context.outputFileSystem.readFileSync(clientManifestPath, 'utf-8'))
        update()
        console.log('success-client: ');
      })

      // 热载client
      app.use(hotMiddleware(clientCompiler, { log: false }))

      // 挂载client
      app.use(clientSetup)
    } catch (error) {
      reject(error)
    }
  })
  return onReady
}
