# available [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/feross/available.svg?style=flat
[travis-url]: https://travis-ci.org/feross/available
[npm-image]: https://img.shields.io/npm/v/available.svg?style=flat
[npm-url]: https://npmjs.org/package/available
[downloads-image]: https://img.shields.io/npm/dm/available.svg?style=flat
[downloads-url]: https://npmjs.org/package/available

### Scan npm for available package names

## install

```
npm install -g available
```

## usage

Stream live results from the npm registry:

```bash
$ available
your
was
our
...
```

List cached results (faster but out of date):

```bash
$ available --offline
```

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
