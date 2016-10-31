'use strict';

/* Dependencies. */
var test = require('tape');
var rehype = require('rehype');
var merge = require('deepmerge');
var gh = require('hast-util-sanitize/lib/github');
var sanitize = require('./');

/* Tests. */
test('sanitize', function (t) {
  t.plan(2);

  t.test('should work', function (st) {
    var input = '<img onmouseover="alert(\'alpha\')">';
    var output = '<img>';

    st.plan(3);

    rehype()
      .use(sanitize)
      .process(input, function (err, file) {
        st.ifErr(err, 'shouldn’t fail');
        st.equal(file.messages.length, 0, 'shouldn’t warn');
        st.equal(String(file), String(output), 'should match');
      });
  });

  t.test('options', function (st) {
    var input = '<math><mi xlink:href="data:x,<script>alert(\'echo\')</script>"></mi></math>';
    var output = '<math><mi></mi></math>';

    st.plan(3);

    rehype()
      .use(sanitize, merge(gh, {tagNames: ['math', 'mi']}))
      .process(input, function (err, file) {
        st.ifErr(err, 'shouldn’t fail');
        st.equal(file.messages.length, 0, 'shouldn’t warn');
        st.equal(String(file), String(output), 'should match');
      });
  });
});
