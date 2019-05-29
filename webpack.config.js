const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Crx = require('crx-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
  entry: {
    background: './src/js/background.js',
    'xe-gr-property-search': './src/js/xe-gr-property-search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  cache: true,
  devtool: 'eval-cheap-module-source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './manifest.json' },
    ])
  ]
};
