const SbAnsiString = require('../ansi-string');
const SbVerticalString = require('../vertical-string');
const {h, v, cTL, cTR, cBL, cBR, mL, mR, mT, mB, mM} = require('../line-config').solid;
const builder = require('../builder');
const finder = require('../finder');
const replacer = require('../replacer');

function border(padding = 1) {
  return lines => {
    const firstVString = new SbVerticalString(lines.toArray(), 0);
    const lastVString = new SbVerticalString(lines.toArray(), lines.width - 1);

    let mTs = finder.findVerticalSeparators(lines[0], 'solid');
    let mBs = finder.findVerticalSeparators(lines[lines.length - 1], 'solid');

    let hLine = builder.buildHorizontalSolidLine(lines.width);
    let topHLine = replacer.replace(hLine, mTs, mT);
    let bottomHLine = replacer.replace(hLine, mBs, mB);

    finder.findHorizontalSeparators(firstVString, 'solid').forEach(index => {
      let mTsTemp = finder.findVerticalSeparators(lines[index + 1], 'solid');
      let mBsTemp = finder.findVerticalSeparators(lines[index - 1], 'solid');

      let pluses = mTsTemp.reduce((pluses, index) => {
        if (mBsTemp.includes(index)) pluses.push(index);
        return pluses;
      }, []);

      lines[index] = replacer.replace(lines[index], mTsTemp, mT);
      lines[index] = replacer.replace(lines[index], mBsTemp, mB);
      lines[index] = replacer.replace(lines[index], pluses, mM);
    })

    lines.splice(0, 0, topHLine);
    lines.pushUnformatted(bottomHLine);


    const mLs = finder.findHorizontalSeparators(firstVString, 'solid');
    const mRs = finder.findHorizontalSeparators(lastVString, 'solid');

    let vLine =  builder.buildVerticalSolidLine(lines.height - 2);
    let leftVLine = new SbVerticalString([cTL])
      .concat(replacer.replace(vLine, mLs, mL))
      .concat(new SbVerticalString([cBL]));
    let rightVLine = new SbVerticalString([cTR])
      .concat(replacer.replace(vLine, mRs, mR))
      .concat(new SbVerticalString([cBR]));

    let vH = new SbVerticalString([h]);
    let paddingVLine = builder.buildVerticalEmptyLine(lines.height - 2);
    let leftPaddingVLine = vH.concat(replacer.replace(paddingVLine, mLs, h)).concat(vH);
    let rightPaddingVLine = vH.concat(replacer.replace(paddingVLine, mRs, h)).concat(vH);


    lines.spliceVertical(0, 0, leftVLine);
    lines.spliceVertical(lines.width, 0, rightVLine);

    lines.spliceVertical(1, 0, leftPaddingVLine);
    lines.spliceVertical(lines.width - 1, 0, rightPaddingVLine);

    return lines;
  }
}

module.exports = {
  border
}
