const SbAnsiString = require('./ansi-string');

function lines(string) {
  return string.split('\n');
}

function maxStringLineLength(string) {
  return lines(string).reduce((length, line) => {
    Math.max(length, SbAnsiString.strippedLength(line))
  }, 0)
}

module.exports = {
  lines,
  maxStringLength
}
