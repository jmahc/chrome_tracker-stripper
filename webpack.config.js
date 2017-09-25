var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var WriteFilePlugin = require('write-file-webpack-plugin')

var alias = require('./config').alias
var env = require('./utils').env
var htmlMinifyOptions = require('./config').htmlMinifyOptions
var regex = require('./config').regex
var resolvePath = require('./utils').resolvePath
var stats = require('./config').stats

module.exports = {
  context: resolvePath('src'),
  devtool:
    env.NODE_ENV === 'development'
      ? 'cheap-module-eval-source-map'
      : '#source-map',
  entry: {
    background: [resolvePath('src/js/background.js')],
    options: [resolvePath('src/js/options.js')],
    popup: [resolvePath('src/js/popup.js')]
  },
  output: {
    path: resolvePath('build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: regex.css,
        include: resolvePath('src'),
        exclude: regex.nodeModules,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0
            }
          }
        ]
      },
      {
        test: regex.files,
        exclude: regex.npm,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: regex.html,
        exclude: regex.pkg,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    alias: alias,
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    enforceModuleExtension: false,
    extensions: ['.js', '.json']
  },
  plugins: [
    // Expose and write the allowed env vars within the compiled bundle.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      minify: htmlMinifyOptions,
      template: resolvePath('public/popup.html'),
      title: 'Tracker Stripper - Popup'
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      minify: htmlMinifyOptions,
      template: resolvePath('public/options.html'),
      title: 'Tracker Stripper - Options'
    }),
    new HtmlWebpackPlugin({
      chunks: ['background'],
      filename: 'background.html',
      minify: htmlMinifyOptions,
      template: resolvePath('public/background.html'),
      title: 'Tracker Stripper - Background'
    }),
    new WriteFilePlugin()
  ],
  stats: stats
}

// module.exports = options
