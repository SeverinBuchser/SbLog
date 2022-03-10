const { builder } = require('../util');

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
