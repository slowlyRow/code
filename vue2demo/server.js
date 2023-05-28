const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/client/vue-ssr-client-manifest.json');

const app = express();
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: require('fs').readFileSync('./public/index.html', 'utf-8'),
  clientManifest,
});

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  const context = { url: req.url };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.send(html);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
