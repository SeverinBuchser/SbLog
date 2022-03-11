const { builder } = require('../util');
const lineConfig = require('../line-config');

/**
 * Creates a vertical line separator with left- and right-margin. The margins
 * are spaces.
 * @function hLine
 * @param {number} marginOrMarginLeft The left-margin or left- and right-margin.
 * @param {number} marginRight The right-margin.
 * @param {string} config The line config to use.
 * @returns {string} The separator.
 */
module.exports = function hLine(marginOrMarginLeft = 0, marginRight = 0, config = 'solid') {
  if (!marginRight) {
    marginRight = marginOrMarginLeft;
  }
  marginOrMarginLeft = Math.max(0, marginOrMarginLeft);
  marginRight = Math.max(0, marginRight);
  let separator = '';
  separator.concat(builder.buildHs(marginOrMarginLeft, 'empty'));
  separator.concat(lineConfig[config].v);
  separator.concat(builder.buildHs(marginRight, 'empty'));
  return separator;
}
