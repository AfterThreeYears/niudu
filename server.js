const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const cookieParser = require('cookie-parser');
// const favicon = require('serve-favicon')
const compression = require('compression');
const { NAVIGATION_STORAGE_KEY } = require('./src/constants');

const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
// const serverInfo =
//   `express/${require('express/package.json').version} ` +
//   `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;
let PORT;
const { DEV_PORT, PROD_PORT } = require('./config.js');

if (isProd) {
  PORT = PROD_PORT;
} else {
  PORT = DEV_PORT;
}

const app = express();
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8');

function createRenderer(bundle, options) {
  // console.log(bundle);
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
      // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false,
  }));
}

let renderer;
let readyPromise;
if (isProd) {
  // In production: create server renderer using built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest,
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

const serve = (paths, cache) => express.static(resolve(paths), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 30,
});

app.use(compression({ threshold: 0 }));
app.use(cookieParser());
// app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
// app.use('/manifest.json', serve('./manifest.json', true));
// app.use('/service-worker.js', serve('./dist/service-worker.js'))

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000,
});

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
const isCacheable = () => useMicroCache;

function render(req, res) {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');
  // res.setHeader('Server', serverInfo);

  const handleError = (err) => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };

  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      if (!isProd) {
        console.log('cache hit!');
      }
      return res.end(hit);
    }
  }
  const context = {
    title: 'default title', // default title
    url: req.url,
    protocol: req.connection.encrypted ? 'https' : 'http',
    host: req.headers.host,
    accessToken: req.cookies.accessToken,
    navigation: req.cookies[NAVIGATION_STORAGE_KEY],
    userAgent: req.headers['user-agent'],
  };
  // console.log(`访问地址${req.url}`);
  renderer.renderToString(context, (err, html) => {
    // console.log(err);
    if (err) {
      return handleError(err);
    }
    res.end(html);
    if (cacheable) {
      microCache.set(req.url, html);
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
