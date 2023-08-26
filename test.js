import assert from 'node:assert/strict'
import test from 'node:test'
import merge from 'deepmerge'
import {rehype} from 'rehype'
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize'

test('rehypeSanitize', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('rehype-sanitize')).sort(), [
      'default',
      'defaultSchema'
    ])
  })

  await t.test('should work', async function () {
    const file = await rehype()
      .use(rehypeSanitize)
      .process('<img onmouseover="alert(\'alpha\')">')

    assert.equal(file.messages.length, 0)
    assert.equal(String(file), '<img>')
  })

  await t.test('should support options', async function () {
    const file = await rehype()
      .use(rehypeSanitize, merge(defaultSchema, {tagNames: ['math', 'mi']}))
      .process(
        '<math><mi xlink:href="data:x,<script>alert(\'echo\')</script>"></mi></math>'
      )

    assert.equal(String(file), '<math><mi></mi></math>')
  })
})
