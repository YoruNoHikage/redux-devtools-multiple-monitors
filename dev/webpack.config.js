/* eslint-env node */
/* global __dirname */
/* eslint no-console: 0 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_DIR = path.resolve(__dirname, '..');
var SRC_DIR = path.resolve(ROOT_DIR, 'src');
var DEV_SRC_DIR = path.resolve(ROOT_DIR, 'dev');

module.exports = {
  bail: false,

  context: ROOT_DIR,
  entry: 'dev/main.jsx',

  resolve: {
    root: ROOT_DIR,
    extensions: [ '', '.js', '.jsx' ],
  },

  eslint: {
    configFile: path.join(ROOT_DIR, '.eslintrc'),
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [ SRC_DIR, DEV_SRC_DIR ],
        exclude: DEV_SRC_DIR + '/todos',
      },
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?presets[]=es2015-loose&presets[]=stage-0&presets[]=react'],
        include: [ SRC_DIR, DEV_SRC_DIR ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'eval-source-map',
  devServer: {
    contentBase: SRC_DIR,
    hot: true,
    inline: true,
    progress: true,
  },

};
