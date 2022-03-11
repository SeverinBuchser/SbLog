const { SbVerticalString, builder, replacer } = require('../util');
const lineConfig = require('../line-config');
const finder = require('../finder');

/**
 * Adds a border to a lines block. The border must use a predefined
 * configuration. The configuration consists out of border segments out of
 * unicode characters. The method creates a border with corners around the block
 * as well as replaces all corners inside the block with the apropriate
 * characters. For example if a horizontal separator meets a vertical one, a T-
 * junction is used instead of the horizontal line segment.
 * @function border
 * @param {string} config The line config to use.
 * @returns {SbLines} The lines block with a border around it.
 * @see {@link lineConfig}
 * @see {@link https://www.w3.org/TR/xml-entity-names/025.html}
 */
module.exports = function border(config = 'solid') {
  return lines => {
    const firstVString = new SbVerticalString(lines.toArray(), 0);
    const lastVString = new SbVerticalString(lines.toArray(), lines.width - 1);

    let mTs = finder.findVs(lines[0]);
    let mBs = finder.findVs(lines[lines.length - 1]);

    let hLine = builder.buildHs(lines.width, config);
    let topHLine = replacer.replace(hLine, mTs, lineConfig[config].mT);
    let bottomHLine = replacer.replace(hLine, mBs, lineConfig[config].mB);

    finder.findHs(firstVString).forEach(index => {
      let mTsTemp = finder.findVs(lines[index + 1]);
      let mBsTemp = finder.findVs(lines[index - 1]);

      let pluses = mTsTemp.reduce((pluses, index) => {
        if (mBsTemp.includes(index)) pluses.push(index);
        return pluses;
      }, []);

      lines.splice(index, 1, replacer.replace(lines[index], mTsTemp, lineConfig[config].mT));
      lines.splice(index, 1, replacer.replace(lines[index], mBsTemp, lineConfig[config].mB));
      lines.splice(index, 1, replacer.replace(lines[index], pluses, lineConfig[config].mM));
    })

    lines.splice(0, 0, topHLine);
    lines.pushUnformatted(bottomHLine);


    const mLs = finder.findHs(firstVString);
    const mRs = finder.findHs(lastVString);

    let vLine =  builder.buildVs(lines.height - 2, config);
    let leftVLine = new SbVerticalString(lineConfig[config].cTL)
      .concat(replacer.replace(vLine, mLs, lineConfig[config].mL))
      .concat(new SbVerticalString(lineConfig[config].cBL));
    let rightVLine = new SbVerticalString(lineConfig[config].cTR)
      .concat(replacer.replace(vLine, mRs, lineConfig[config].mR))
      .concat(new SbVerticalString(lineConfig[config].cBR));

    let vH = new SbVerticalString(lineConfig[config].h);
    let paddingVLine = builder.buildVs(lines.height - 2, 'empty');
    let leftPaddingVLine = vH.concat(replacer.replace(paddingVLine, mLs, lineConfig[config].h)).concat(vH);
    let rightPaddingVLine = vH.concat(replacer.replace(paddingVLine, mRs, lineConfig[config].h)).concat(vH);


    lines.spliceVertical(0, 0, leftVLine);
    lines.spliceVertical(lines.width, 0, rightVLine);

    lines.spliceVertical(1, 0, leftPaddingVLine);
    lines.spliceVertical(lines.width - 1, 0, rightPaddingVLine);

    return lines;
  }
}
