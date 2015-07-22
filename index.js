var fs = require('fs')
var get = require('simple-get')
var parallelLimit = require('run-parallel-limit')

var WORDS = fs.readFileSync('./dictionary.txt').toString().split('\n')

var LIMIT = 5

var tasks = WORDS.map(function (word) {
  return function (cb) {
    get('https://registry.npmjs.com/' + word, function (err, res) {
      if (err) return cb(err)
      if (res.statusCode === 404) console.log(word)
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
