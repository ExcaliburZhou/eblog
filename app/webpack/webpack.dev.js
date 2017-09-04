const webpack = require('webpack');
const webpackConfig = require('./webpack.common');
const merge = require('webpack-merge');
const paths = require('./paths');

module.exports = merge(webpackConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.public,
    port: 3002,
    clientLogLevel: 'none',
    compress: true,
    hot: true,
    stats: {
      errors: true,
      warnings: true,
      modules: false,
      version: false,
      hash: false,
      children: false,
      assets: false,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // This plugin will cause the relative path of the module to be displayed
    // when HMR is enabled. Suggested for use in development.
    new webpack.NamedModulesPlugin(),
  ]
});