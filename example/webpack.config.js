const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const createConfig = (env, argv) => {
  const config = {
    target: 'web',

    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['main.js'],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
      alias: {
        '@xorkevin/nuke': path.resolve(__dirname, '..'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../index.js'),
            path.resolve(__dirname, 'src'),
          ],
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s?css$/,
          use: [
            ExtractTextPlugin.loader,
            {loader: 'css-loader'},
            {loader: 'sass-loader'},
          ],
        },
        {
          test: /\.(ttf|otf|woff|woff2|svg|eot)/,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[name].[contenthash][ext]',
          },
        },
      ],
    },

    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [new TerserPlugin()],
    },

    plugins: [
      new HtmlPlugin({
        title: 'Nuke',
        filename: 'index.html',
        inject: 'body',
        template: 'template/index.html',
      }),
      new ExtractTextPlugin({
        filename: 'static/[name].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [{from: 'public'}],
      }),
    ],

    output: {
      path: path.resolve(__dirname, 'bin'),
      publicPath: '/',
      filename: 'static/[name].[contenthash].js',
    },

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },

    devtool: 'source-map',

    devServer: {
      static: {
        directory: 'public',
        watch: true,
      },
      compress: true,
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      hot: false,
    },
  };

  return config;
};

module.exports = createConfig;
