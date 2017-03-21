# available [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/available/master.svg
[travis-url]: https://travis-ci.org/feross/available
[npm-image]: https://img.shields.io/npm/v/available.svg
[npm-url]: https://npmjs.org/package/available
[downloads-image]: https://img.shields.io/npm/dm/available.svg
[downloads-url]: https://npmjs.org/package/available
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Scan npm for available package names

## install

```
npm install available -g
```

## usage

### cli

Get available names from the npm registry:

```bash
$ available
your
was
our
...
```

Full options list:

```
Usage:
    available [optional-name] <options>

    Scan npm for available package names.

Examples:

    Print lots of possible names:
        available
        available --offline

    Check for a certain name:
        available my-cool-name
        available my-cool-name --related
        available my-cool-name --offline

Flags:
    -r, --related    Search for related module names (Uses thesaurus)
    -o, --offline    Force offline mode (Does not verify names are actually available)
    -v, --version    Show current version
    -h, --help       Show usage information
```

### api

#### `available.getNames(opts, next)`

Get available package names from npm.

If `opts.online` is `true`, verify that the
names are actually available. Otherwise, a local
[package name database](https://npmjs.com/package/all-the-package-names) is used,
which may be slightly out-of-date.

`next(err, name)` is called each time an available package is found. This allows
for "streaming" the possible names from the registry. If `err` is an `Error`, then
there was a problem and `next` will not be called again. `name` is the available
package name.

#### `available.checkName(name, opts, next)`

Check if a specific `name` is available on npm.

If `opts.online` is `true`, verify that the
names are actually available. Otherwise, a local
[package name database](https://npmjs.com/package/all-the-package-names) is used,
which may be slightly out-of-date.

If `opts.related` is `true`, then this will search for related module names using
a thesaurus.

`next(err, name)` is called each time an available package is found. This allows
for "streaming" the possible names from the registry. If `err` is an `Error`, then
there was a problem and `next` will not be called again. `name` is the available
package name.

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
