# rehype-sanitize

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Sanitise HTML with [**rehype**][rehype].

## Installation

[npm][]:

```bash
npm install rehype-sanitize
```

## Usage

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

```javascript
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

Remove potentially dangerous things from HTML.

###### `schema`

The sanitation schema defines how and if nodes and properties should
be cleaned.  The schema is documented in [`hast-util-sanitize`][schema].

## Related

*   [`hast-util-sanitize`](https://github.com/syntax-tree/hast-util-sanitize)
    — Core utility that does the sanitation

## Contribute

See [`contributing.md` in `rehypejs/rehype`][contribute] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-sanitize.svg

[build]: https://travis-ci.org/rehypejs/rehype-sanitize

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-sanitize.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-sanitize

[downloads-badge]: https://img.shields.io/npm/dm/rehype-sanitize.svg

[downloads]: https://www.npmjs.com/package/rehype-sanitize

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[schema]: https://github.com/syntax-tree/hast-util-sanitize#schema

[contribute]: https://github.com/rehypejs/rehype/blob/master/contributing.md

[coc]: https://github.com/rehypejs/rehype/blob/master/code-of-conduct.md
