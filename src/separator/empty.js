const { builder } = require('../util');

/**
 * Creates a function, which creates empty lines with the specified width.
 * @function empty
 * @param {number} gapWidth The height of empty lines.
 * @returns {function} The function which creates the separator.
 */
module.exports = function empty(gapWidth = 1) {
  gapWidth = Math.max(0, gapWidth);
  return width => {
    let separators = [];
    for (let lineIndex = 0 ; lineIndex < gapWidth ; lineIndex++) {
      separators.push(builder.buildHs(width, 'empty'));
    }
    return separators;
  }
}
