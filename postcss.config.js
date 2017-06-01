const plugins = [
  require('autoprefixer')({
    browsers: ['last 3 versions', 'ios >= 8'],
  }),
  require('postcss-nested')(),
  require('postcss-simple-vars')({
    variables: () => require('./src/ui/style/var.js'),
  }),
  // require('postcss-simple-vars')({
  //   var: require('../src/ui/style/var.css'),
  // }),
  require('postcss-import')(),
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(require('postcss-reporter')({
    clearMessages: true,
  }));
}

module.exports = {
  plugins,
};
