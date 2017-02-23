# rehype-sanitize [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

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
var vfile = require('to-vfile');
var rehype = require('rehype');
var merge = require('deepmerge');
var gh = require('hast-util-sanitize/lib/github');
var sanitize = require('rehype-sanitize');

var doc = vfile.readSync('index.html');

var schema = merge(gh, {tagNames: ['math', 'mi']});

rehype()
  .data('settings', {fragment: true})
  .use(sanitize, schema)
  .process(doc, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/rehype-sanitize.svg

[travis]: https://travis-ci.org/wooorm/rehype-sanitize

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/rehype-sanitize.svg

[codecov]: https://codecov.io/github/wooorm/rehype-sanitize

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[rehype]: https://github.com/wooorm/rehype

[schema]: https://github.com/wooorm/hast-util-sanitize#schema
