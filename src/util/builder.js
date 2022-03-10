const SbVerticalString = require('./vertical-string');
const lineConfig = require('../line-config');

function buildHs(width, config) {
  return lineConfig[config].h.repeat(width)
}

function buildVs(height, config) {
  return new SbVerticalString(lineConfig[config].v.repeat(height).split(''))
}

module.exports = {
  buildHs,
  buildVs
}
