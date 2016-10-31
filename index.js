'use strict';

/* Dependencies. */
var clean = require('hast-util-sanitize');

/* Expose. */
module.exports = sanitize;

/* Attacher - Clean HTML. */
function sanitize(processor, options) {
  return transformer;

  function transformer(tree) {
    return clean(tree, options);
  }
}
