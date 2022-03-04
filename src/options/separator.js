function line(marginOrMarginTop = 0, marginBottom = 0) {
  if (!marginBottom) {
    marginBottom = marginOrMarginTop;
  }
  marginOrMarginTop = Math.max(0, marginOrMarginTop);
  marginBottom = Math.max(0, marginBottom);
  return width => {
    let gaps = [];
    gaps.push(...gap(marginOrMarginTop)(width));
    gaps.push('\u2500'.repeat(width));
    gaps.push(...gap(marginBottom)(width));
    return gaps;
  };
}

function gap(gapWidth = 1) {
  gapWidth = Math.max(0, gapWidth);
  return width => {
    let gaps = [];
    for (let lineIndex = 0 ; lineIndex < gapWidth ; lineIndex++) {
      gaps.push(' '.repeat(width));
    }
    return gaps;
  }
}

module.exports = {
  none: () => {},
  line,
  gap,
}
