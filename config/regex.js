var fileExtensions = require('./file_extensions')

module.exports = {
  css: /\.css$/,
  files: new RegExp('.(' + fileExtensions.join('|') + ')$'),
  html: /\.html$/,
  js: /\.js$/,
  nodeModules: /node_modules/,
  npm: /node_modules/,
  pkg: /node_modules/
}
