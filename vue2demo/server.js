const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./setup-dev-server')

// 启动服务器
const app = express()

let renderer

const isProd = process.env.NODE_ENV === 'production'
let onReadyDev

if (isProd) {
  // 生产环境
  /* eslint-disable-next-line global-require */
  const serverBundle = require('./dist/server/vue-ssr-server-bundle.json')
  /* eslint-disable-next-line global-require */
  const clientManifest = require('./dist/client/vue-ssr-client-manifest.json')
  /* eslint-disable-next-line global-require */
  const template = require('fs').readFileSync('./public/index.html', 'utf-8')

  // 处理模板渲染server-client
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest,
  })
} else {
  // 开发环境
  // 持续监听文件变化，并重新处理模板，然后更新页面
  onReadyDev = Promise.resolve(
    setupDevServer(app, (serverBundle, template, clientManifest) => {
      renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template,
        clientManifest,
      })
    })
  )
}

// 静态资源服务
app.use(express.static('dist/client'))

// 渲染
const render = async (req, res) => {
  try {
    const context = {
      url: req.url,
      // 使用vue-meta插件代替
      // title: 'ssr demo',
      // meta: `
      // <meta name="description" content="ssr" />
      // `,
    }

    // renderer.renderToString 接受多种入参方式
    const html = await renderer.renderToString(context)

    // res.setHeader('Content-type','text/html; charset=utf-8')
    res.send(html)
  } catch (err) {
    if (err.code === 404) {
      res.status(404).end('Page not found')
    } else {
      res.status(500).end('Internal Server Error')
    }
  }
}

const renderDev = (req, res) => {
  // 实时处理模板渲染，并更新页面
  onReadyDev.then(() => {
    render(req, res)
  })
}
app.get('*', isProd ? render : renderDev)

// 端口监听
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
