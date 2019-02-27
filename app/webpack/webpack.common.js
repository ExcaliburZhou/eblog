// const webpack = require('webpack');
const paths = require('./paths');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const cssFileName = '[name].[hash:8].css';

module.exports = {
  entry: {
    index: paths.index,
  },
  output: {
    filename: '[name].[hash:8].js',
    path: paths.dist,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.templateHTML,
    }),
    new ExtractTextPlugin({ filename: cssFileName }),
    new StyleLintPlugin({
      syntax: 'less',
      files: '**/*.less',
      config: {
        extends: 'stylelint-config-standard',
      },
    }),
  ],
  module: {
    strictExportPresence: true,
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //     },
      //   ],
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '> 1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ]
        })
      },
      {
        test: /\.(png|gif|jpeg|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
};
