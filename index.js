var connectivity = require('connectivity')
var difference = require('lodash.difference')
var fs = require('fs')
var get = require('simple-get')
var packageNames = require('all-the-package-names')
var parallelLimit = require('run-parallel-limit')
var path = require('path')

var LIMIT = 10

var words = fs.readFileSync(path.join(__dirname, 'dictionary.txt'))
  .toString()
  .split('\n')

words = difference(words, packageNames)

function offlineResult () {
  console.error('OFFLINE MODE – printing list of *LIKELY* available package names...')
  words.forEach(function (word) {
    console.log(word)
  })
}

if (process.argv.slice(2).join(' ').match('--offline')) {
  offlineResult()
  process.exit(0)
}

connectivity(function (online) {
  if (!online) return offlineResult()

  var tasks = words.map(function (word) {
    return function (cb) {
      get.head('https://registry.npmjs.com/' + word, function (err, res) {
        if (err) return cb(err)
        if (res.statusCode === 404) console.log(word)
        res.resume() // consume the stream
        cb(null)
      })
    }
  })

  parallelLimit(tasks, LIMIT, function (err) {
    if (err) {
      console.error(err.stack || err.message || err)
      process.exit(1)
    }
  })
})
