const path = require('path');
const webpack = require('webpack');
const vueConfig = require('./vue-loader.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: isProd ? '//wbb1.nicefe.com/' : '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      public: path.resolve(__dirname, '../public'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 30,

          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1024 * 100,

          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: isProd ?
         ExtractTextPlugin.extract({
           use: 'css-loader?minimize',
           fallback: ['vue-style-loader'],
         }) :
        ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg/,
        loader: 'svg-loader',
      },
      {
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader',
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false,
  },
  plugins: isProd
    ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
        comments: false,
        sourceMap: false,
      }),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css',
      }),
    ]
    : [
      new FriendlyErrorsPlugin(),
    ],
};
