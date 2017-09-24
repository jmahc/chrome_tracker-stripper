var fs = require('fs')
var path = require('path')

// Grabs the application's directory.
var applicationDirectory = fs.realpathSync(process.cwd())

/**
 * Resolves a path using the current working directory.
 * @param  {String} myPath - Relative path to a file.
 * @example
 * // returns '~/path/to/chrome_tr-stripper/utils/env.js'
 * resolvePath('utils/env')
 * @returns {String} - Absolute path to a file.
 */
function resolvePath(myPath) {
  return path.resolve(applicationDirectory, myPath)
}

module.exports = resolvePath
