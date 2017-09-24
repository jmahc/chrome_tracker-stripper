var fileSystem = require('fs-extra')
var path = require('path')

var resolvePath = require('./resolvePath')

// Clean the dist folder
fileSystem.emptyDirSync(resolvePath('build'))

require('./generate_manifest')
