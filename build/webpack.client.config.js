const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync',
      'zepto',
    ],
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      },
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new VueSSRClientPlugin(),
    new webpack.ProvidePlugin({
      $: 'zepto',
    }),
  ],
});


if (isProd) {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.VUE_ENV': '"client"',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-niudu',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
        },
        {
          urlPattern: /\/(v2ex|cnode)/,
          handler: 'networkFirst',
        },
        {
          urlPattern: '/v2ex/:id',
          handler: 'networkFirst',
        },
        {
          urlPattern: '/cnode/:id',
          handler: 'networkFirst',
        },
      ],
    }),
  ]);
}
