function verticalLine(marginOrMarginTop = 0, marginBottom = 0) {
  if (!marginBottom) {
    marginBottom = marginOrMarginTop;
  }
  return (width) => '\n'.repeat(marginOrMarginTop) + '-'.repeat(width) + '\n'.repeat(marginBottom);
}

module.exports = {
  verticalLine
}
