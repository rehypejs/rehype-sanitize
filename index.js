'use strict'

var clean = require('hast-util-sanitize')

module.exports = sanitize

function sanitize(options) {
  return transformer
  function transformer(tree) {
    return clean(tree, options)
  }
}
