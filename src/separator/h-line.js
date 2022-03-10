const { builder } = require('../util');
const lineConfig = require('../line-config');

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
