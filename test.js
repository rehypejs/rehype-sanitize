import test from 'tape'
import rehype from 'rehype'
import merge from 'deepmerge'
import rehypeSanitize, {defaultSchema} from './index.js'

test('rehypeSanitize', function (t) {
  t.plan(2)

  t.test('should work', function (st) {
    var input = '<img onmouseover="alert(\'alpha\')">'
    var output = '<img>'

    st.plan(3)

    rehype()
      .use(rehypeSanitize)
      .process(input, function (error, file) {
        st.ifErr(error, 'shouldn’t fail')
        st.equal(file.messages.length, 0, 'shouldn’t warn')
        st.equal(String(file), String(output), 'should match')
      })
  })

  t.test('options', function (st) {
    var input =
      '<math><mi xlink:href="data:x,<script>alert(\'echo\')</script>"></mi></math>'
    var output = '<math><mi></mi></math>'

    st.plan(3)

    rehype()
      .use(rehypeSanitize, merge(defaultSchema, {tagNames: ['math', 'mi']}))
      .process(input, function (error, file) {
        st.ifErr(error, 'shouldn’t fail')
        st.equal(file.messages.length, 0, 'shouldn’t warn')
        st.equal(String(file), String(output), 'should match')
      })
  })
})
