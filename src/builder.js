const SbVerticalString = require('./vertical-string');
const lineConfig = require('./line-config');

function buildHorizontalSolidLine(width) {
  return lineConfig.solid.h.repeat(width)
}

function buildVerticalSolidLine(height) {
  return new SbVerticalString(lineConfig.solid.v.repeat(height).split(''))
}

function buildHorizontalEmptyLine(width) {
  return ' '.repeat(width);
}

function buildVerticalEmptyLine(height) {
  return new SbVerticalString(' '.repeat(height).split(''));
}

module.exports = {
  buildHorizontalSolidLine,
  buildVerticalSolidLine,
  buildHorizontalEmptyLine,
  buildVerticalEmptyLine
}
