#!/usr/bin/env node

const available = require('../')
const connectivity = require('connectivity')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2), {
  boolean: ['offline', 'version', 'help'],
  alias: {
    o: 'offline',
    v: 'version',
    h: 'help'
  }
})

if (argv.help) {
  runHelp()
} else {
  if (argv.offline) {
    // Assume no internet
    runAvailable(false)
  } else {
    // Check connectivity
    connectivity(function (online) {
      runAvailable(online)
    })
  }
}

function runHelp () {
  console.log(`
Usage:
    available <options>

    Scan npm for available package names.

Flags:
    -o, --offline    Force offline mode. (Does not verify names are actually available.)
    -v, --version    Show current version
    -h, --help       Show usage information
  `)
}

function runAvailable (online) {
  if (!online) {
    console.error('OFFLINE MODE: Printing list of likely available names...')
  }
  available.getNames(online, word => console.log(word))
  return
}
