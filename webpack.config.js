'use strict'

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

let config = {
  module: {
    preLoaders: [{
      test: /\.css?$/,
      loader: 'csslint',
      include: /stylesheets/
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    library: 'redbox-react',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
  config.plugins.push(new ExtractTextPlugin('redbox.css', {allChunks: true}))

  config.module.loaders.push({
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[hash:base64:5]')
  })
} else {
  config.module.loaders.push({
    test: /\.css?$/,
    loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
  })
}

module.exports = config
