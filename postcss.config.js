const plugins = [
  // require('autoprefixer')({
  //   browsers: ['last 3 versions', 'ios >= 8'],
  // }),
  require('autoprefixer')(),
  require('postcss-nested')(),
  require('postcss-import')(),
];

if (process.env.NODE_ENV !== 'production') {
  // plugins.unshift(require('stylelint')());
  plugins.push(require('postcss-reporter')({
    clearMessages: true,
  }));
}

module.exports = {
  plugins,
};
