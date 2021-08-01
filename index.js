import {sanitize as hastUtilSanitize, defaultSchema} from 'hast-util-sanitize'

export {defaultSchema}

export default function rehypeSanitize(options) {
  return transformer
  function transformer(tree) {
    return hastUtilSanitize(tree, options)
  }
}
