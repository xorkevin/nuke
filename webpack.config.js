const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const createConfig = (env, argv) => {
  const config = {
    target: 'web',

    context: path.resolve(__dirname, 'src'),
    entry: 'index.js',
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
        }),
      ],
    },

    plugins: [
      new CopyPlugin([
        {
          from: 'component/*.scss',
        },
      ]),
      new CopyPlugin([
        {
          from: 'style/*.scss',
        },
      ]),
      new CopyPlugin([
        {
          from: 'main.scss',
        },
      ]),
    ],

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'nuke.js',
      library: 'nuke',
      libraryTarget: 'umd',
    },

    externals: [nodeExternals()],
  };

  return config;
};

module.exports = createConfig;
