#!/usr/bin/env node

const available = require('../')
const connectivity = require('connectivity')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2), {
  boolean: ['related', 'offline', 'version', 'help'],
  alias: {
    o: 'offline',
    v: 'version',
    h: 'help'
  }
})

if (argv.help) {
  runHelp()
} else {
  if (argv.offline) { // Force offline mode
    run(false)
  } else {
    connectivity(run)
  }
}

function runHelp () {
  console.log(`
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
  `)
}

function run (online) {
  if (argv._[0]) {
    runCheckName(argv._[0], online)
  } else {
    runGetNames(online)
  }
}

function runGetNames (online) {
  if (!online) {
    console.error('OFFLINE MODE: Printing list of likely available names...')
  }
  available.getNames({online}, printName)
  return
}

function runCheckName (name, online) {
  available.checkName(name, {
    online,
    related: argv.related
  }, printName)
}

function printName (err, name) {
  if (err) throw err
  console.log(name)
}
