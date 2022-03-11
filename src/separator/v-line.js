const empty = require('./empty');
const { builder } = require('../util');

/**
 * Creates a function, which creates horizontal line separator with top- and
 * bottom-margin. The function then takes a width, to which the line gets built
 * to. The margins are empty lines.
 * @function hLine
 * @param {number} marginOrMarginTop The top-margin or top- and bottom-margin.
 * @param {number} marginBottom The bottom-margin.
 * @param {string} config The line config to use.
 * @returns {string} The separator.
 */
module.exports = function vLine(marginOrMarginTop = 0, marginBottom = 0, config = 'solid') {
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
