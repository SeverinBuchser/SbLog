/**
 * @module sb-log.util
 */

const { SbAnsiString } = require('./ansi-string');
const { SbVerticalString } = require('./vertical-string');

const whitespace = require('./whitespace');
const builder = require('./builder');
const replacer = require('./replacer');

module.exports = {
  SbAnsiString,
  SbVerticalString,

  whitespace,
  builder,
  replacer
}
