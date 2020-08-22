# rehype-sanitize

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**rehype**][rehype] plugin to sanitize HTML.

## Install

[npm][]:

```sh
npm install rehype-sanitize
```

## Use

Say we have the following file, `index.html`:

```html
<div onmouseover="alert('alpha')">
  <a href="jAva script:alert('bravo')">delta</a>
  <img src="x" onerror="alert('charlie')">
  <iframe src="javascript:alert('delta')"></iframe>
  <math>
    <mi xlink:href="data:x,<script>alert('echo')</script>"></mi>
  </math>
</div>
<script>
require('child_process').spawn('rm', ['-r', '-f', process.env.HOME]);
</script>
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var rehype = require('rehype')
var merge = require('deepmerge')
var gh = require('hast-util-sanitize/lib/github')
var sanitize = require('rehype-sanitize')

var schema = merge(gh, {tagNames: ['math', 'mi']})

rehype()
  .data('settings', {fragment: true})
  .use(sanitize, schema)
  .process(fs.readFileSync('index.html'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<div>
  <a>delta</a>
  <img src="x">

  <math>
    <mi></mi>
  </math>
</div>
```

## API

### `rehype().use(sanitize[, schema])`

Remove potentially dangerous things from HTML, or more correct: keep only the
safe things in a document.

###### `schema`

The sanitation schema defines how and if nodes and properties should be cleaned.
The schema is documented in [`hast-util-sanitize`][schema].

## Security

Improper use of `rehype-sanitize` can open you up to a
[cross-site scripting (XSS)][xss] attack.
The defaults *are* safe, but deviating from them is likely *unsafe*.

Use `rehype-sanitize` *after* all other plugins, as other plugins are likely
also unsafe.

## Related

*   [`hast-util-sanitize`](https://github.com/syntax-tree/hast-util-sanitize)
    — Core utility that does the sanitation

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-sanitize.svg

[build]: https://travis-ci.org/rehypejs/rehype-sanitize

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-sanitize.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-sanitize

[downloads-badge]: https://img.shields.io/npm/dm/rehype-sanitize.svg

[downloads]: https://www.npmjs.com/package/rehype-sanitize

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-sanitize.svg

[size]: https://bundlephobia.com/result?p=rehype-sanitize

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[schema]: https://github.com/syntax-tree/hast-util-sanitize#schema
