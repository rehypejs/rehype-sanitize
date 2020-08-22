import unified = require('unified')
import sanitize = require('rehype-sanitize')

unified().use(sanitize)
unified().use(sanitize, {})
unified().use(sanitize, {
  attributes: {
    video: ['src']
  }
})
unified().use(sanitize, {
  tagNames: ['video']
})
