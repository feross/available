module.exports = {
  getNames
}

const difference = require('lodash.difference')
const fs = require('fs')
const get = require('simple-get')
const packageNames = require('all-the-package-names')
const parallelLimit = require('run-parallel-limit')
const path = require('path')

const LIMIT = 10
const REGISTRY_URL = 'https://registry.npmjs.com/'

const DICTIONARY = fs.readFileSync(path.join(__dirname, 'dictionary.txt'))
  .toString()
  .split('\n')

const POSSIBLE_NAMES = difference(DICTIONARY, packageNames)

function getNames (online, next) {
  if (online) {
    verifyAvailable(POSSIBLE_NAMES, next)
  } else {
    POSSIBLE_NAMES.forEach(name => next(null, name))
  }
}

function verifyAvailable (names, next) {
  const tasks = names.map(function (name) {
    return function (cb) {
      get.head(REGISTRY_URL + name, function (err, res) {
        if (err) return cb(err)
        if (res.statusCode === 404) next(null, name)
        res.resume() // consume the stream
        cb(null)
      })
    }
  })

  parallelLimit(tasks, LIMIT, function (err) {
    if (err) {
      next(err)
      process.exit(1)
    }
  })
}
