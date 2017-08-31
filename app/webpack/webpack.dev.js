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
    // quiet: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});