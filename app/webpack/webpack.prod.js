const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.common');
const paths = require('./paths');


module.exports = merge(webpackConfig, {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: paths.root,
    }),
    new UglifyJSPlugin(),
  ],
});
