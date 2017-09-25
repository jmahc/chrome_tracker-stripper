var fileSystem = require('fs')

var env = require('../utils').env
var resolvePath = require('../utils').resolvePath

// Establish the src & public aliases before loading the secrets.
var alias = {
  // Set our alias reference for more explicit imports when referencing `src`.
  '@': resolvePath('src'),
  // Handles images and other static files inside the `public` directory.
  '@@': resolvePath('public')
}

// Grab the path to the secrets (if they exist).
var secretsPath = resolvePath('secrets.' + env.NODE_ENV + '.js')

// Create a webpack alias to more easily reference the secrets.
if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath
}

module.exports = alias
