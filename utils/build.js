var webpack = require('webpack')

var config = require('../webpack.config')

require('./prepare')

delete config.chromeExtensionBoilerplate

webpack(config, function(err) {
  if (err) throw err
})
