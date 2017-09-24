var fileSystem = require('fs')
var path = require('path')

var manifest = require('@/src/manifest.json')

var env = require('@/utils/env')
var resolvePath = require('@/utils/resolvePath')

// Generates the manifest file using information from package.json.
manifest.description = process.env.npm_package_description
manifest.version = process.env.npm_package_version

fileSystem.writeFileSync(
  resolvePath('build/manifest.json'),
  JSON.stringify(manifest)
)
