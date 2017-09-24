var fileSystem = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var WriteFilePlugin = require('write-file-webpack-plugin')

var env = require('./utils').env
var fileExtensions = require('./config').fileExtensions
var htmlMinifyOptions = require('./config').htmlMinifyOptions
var resolvePath = require('./utils').resolvePath

// The curret application directory.
var applicationDirectory = resolvePath('src')
// Establish the src alias and prepare to load the secrets.
var alias = {
  // Set our alias references for more explicit imports.
  '@': applicationDirectory
}
// Grab the path to the secrets (if they exist).
var secretsPath = resolvePath('secrets.' + env.NODE_ENV + '.js')
// Create a webpack alias to more easily reference the secrets.
if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath
}

module.exports = {
  context: applicationDirectory,
  devtool:
    env.NODE_ENV === 'development'
      ? 'cheap-module-eval-source-map'
      : 'source-map',
  entry: {
    background: resolvePath('src/js/background.js'),
    options: resolvePath('src/js/options.js'),
    popup: resolvePath('src/js/popup.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: regex.css,
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
    alias: alias
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
  ]
}

// module.exports = options
