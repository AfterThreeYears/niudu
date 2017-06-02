module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: require('../postcss.config.js'),
  // postcss: [
  //   require('autoprefixer')({
  //     browsers: ['last 3 versions'],
  //   }),
  //   // require('postcss-simple-vars')({
  //   //   var: require('../src/ui/style/var.css'),
  //   // }),
  // ],
};
