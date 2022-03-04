const SbAnsiString = require('./ansi-string');
const regExp = require('./line-config').regExp;

function findVerticalSeparators(string, config) {
  string = SbAnsiString.strip(string);
  let separatorIndices = [];
  for (let { index } of string.matchAll(regExp[config].v)) {
    separatorIndices.push(index)
  }
  return separatorIndices;
}

function findHorizontalSeparators(string, config) {
  string = SbAnsiString.strip(string);
  let separatorIndices = [];
  for (let { index } of string.matchAll(regExp[config].h)) {
    separatorIndices.push(index)
  }
  return separatorIndices;
}

module.exports = {
  findVerticalSeparators,
  findHorizontalSeparators
}
