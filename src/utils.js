const SbAnsiString = require('./ansi-string');

function trimTrailing(string) {
  return string.replace(/\s+$/, '');
}

function hasOnlySpaces(string) {
  return new RegExp(/^\s\s*\s$/).test(string);
}

module.exports = {
  trimTrailing,
  hasOnlySpaces
}
