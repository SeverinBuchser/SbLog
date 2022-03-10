const empty = require('./empty');
const { builder } = require('../util');

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
