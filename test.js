import test from 'tape'
import {rehype} from 'rehype'
import merge from 'deepmerge'
import rehypeSanitize, {defaultSchema} from './index.js'

test('rehypeSanitize', (t) => {
  t.plan(2)

  t.test('should work', (st) => {
    const input = '<img onmouseover="alert(\'alpha\')">'
    const output = '<img>'

    st.plan(3)

    rehype()
      .use(rehypeSanitize)
      .process(input, (error, file) => {
        st.ifErr(error, 'shouldn’t fail')
        st.equal(file.messages.length, 0, 'shouldn’t warn')
        st.equal(String(file), String(output), 'should match')
      })
  })

  t.test('options', (st) => {
    const input =
      '<math><mi xlink:href="data:x,<script>alert(\'echo\')</script>"></mi></math>'
    const output = '<math><mi></mi></math>'

    st.plan(3)

    rehype()
      .use(rehypeSanitize, merge(defaultSchema, {tagNames: ['math', 'mi']}))
      .process(input, (error, file) => {
        st.ifErr(error, 'shouldn’t fail')
        st.equal(file.messages.length, 0, 'shouldn’t warn')
        st.equal(String(file), String(output), 'should match')
      })
  })
})
