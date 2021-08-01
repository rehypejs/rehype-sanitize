/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-sanitize').Schema} Options
 */

import {sanitize as hastUtilSanitize, defaultSchema} from 'hast-util-sanitize'

export {defaultSchema}

/**
 * Plugin to sanitize HTML.
 *
 * @type {import('unified').Plugin<[Options?] | void[], Root, Root>}
 */
export default function rehypeSanitize(options = defaultSchema) {
  // @ts-expect-error: assume input `root` matches output root.
  return (tree) => hastUtilSanitize(tree, options)
}
