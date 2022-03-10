const SbAnsiString = require('./ansi-string');

function trimTrailing(string) {
  return string.replace(/\s+$/, '');
}

function fillTrailing(string, width) {
  let lengthDifference = width - SbAnsiString.strippedLength(string);
  if (lengthDifference < 0) throw new Error("String already exeeded length!");
  return string + ' '.repeat(lengthDifference);
}

module.exports = {
  trimTrailing,
  fillTrailing
}
