/**
 * @module sb-log.separator
 */

const { builder } = require('./util');
const lineConfig = require('./line-config');

/**
 * The empty separator.
 * @returns {void}
 */
const none = () => {};

/**
 * Creates a function, which creates empty lines with the specified width.
 * @param {number} gapWidth The height of empty lines.
 * @returns {function} The function which creates the separator.
 */
function empty(gapWidth = 1) {
  gapWidth = Math.max(0, gapWidth);
  return width => {
    let separators = [];
    for (let lineIndex = 0 ; lineIndex < gapWidth ; lineIndex++) {
      separators.push(builder.buildHs(width, 'empty'));
    }
    return separators;
  }
}

/**
 * Creates a vertical line separator with left- and right-margin. The margins
 * are spaces.
 * @param {number} marginOrMarginLeft The left-margin or left- and right-margin.
 * @param {number} marginRight The right-margin.
 * @param {string} config The line config to use.
 * @returns {string} The separator.
 */
function hLine(marginOrMarginLeft = 0, marginRight = 0, config = 'solid') {
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

/**
 * Creates a function, which creates horizontal line separator with top- and
 * bottom-margin. The function then takes a width, to which the line gets built
 * to. The margins are empty lines.
 * @param {number} marginOrMarginTop The top-margin or top- and bottom-margin.
 * @param {number} marginBottom The bottom-margin.
 * @param {string} config The line config to use.
 * @returns {string} The separator.
 */
function vLine(marginOrMarginTop = 0, marginBottom = 0, config = 'solid') {
  if (!marginBottom) {
    marginBottom = marginOrMarginTop;
  }
  marginOrMarginTop = Math.max(0, marginOrMarginTop);
  marginBottom = Math.max(0, marginBottom);
  return width => {
    let separators = [];
    separators.push(...empty(marginOrMarginTop)(width));
    separators.push(builder.buildHs(width, config));
    separators.push(...empty(marginBottom)(width));
    return separators;
  };
}


module.exports = {
  none,
  hLine,
  empty,
  vLine
}
