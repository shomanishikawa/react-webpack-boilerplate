var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: [
    './entry.js'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel',
        include: path.join(__dirname, 'src') },
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style!css!sass!postcss-loader',
        include: path.join(__dirname, 'css') }
    ]
  },

  postcss: function() {
    return [autoprefixer]
  }
}