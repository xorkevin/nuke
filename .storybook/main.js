const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const path = require('path');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../stories/**/*.(js|mdx)'],
  addons: [
    '@storybook/addon-contexts/register',
    '@storybook/addon-docs/register',
    '@storybook/addon-actions/register',
  ],
  webpackFinal: (config) => {
    config.context = path.resolve(__dirname, '..');
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];

    config.module.rules = config.module.rules.filter(
      (i) => !i.test.test('.css') && !i.test.test('.ttf'),
    );
    config.module.rules.push({
      test: /\.s?css$/,
      use: [
        ExtractTextPlugin.loader,
        {loader: 'css-loader'},
        {loader: 'sass-loader'},
      ],
    });
    config.module.rules.push({
      test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/fonts/',
          // required because otherwise path becomes static/static/fonts
          publicPath: 'fonts/',
        },
      },
    });
    config.plugins.push(
      new ExtractTextPlugin({
        filename: 'static/[name].[contenthash].css',
        chunkFilename: 'static/chunk.[name].[contenthash].css',
      }),
    );

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {loader: 'babel-loader'},
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    });

    config.plugins.push(
      new CopyPlugin([
        {
          from: 'example/public',
        },
      ]),
    );

    return config;
  },
};
