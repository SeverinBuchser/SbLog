/**
 * @module sb-log.finder
 */

const { SbAnsiString } = require('./util');
const lineConfig = require('./line-config');

/**
 * A regexp for identifing vertical sepraration-characters.
 * @constant {RegExp}
 * @ignore
 */
const vRegExp = new RegExp(
  [
    lineConfig.solid.v,
    lineConfig.solidBold.v,
    lineConfig.solidRounded.v,
    lineConfig.dashed.v,
    lineConfig.dashedBold.v,
    lineConfig.dashedRounded.v,
  ].join('|'), 'g'
);

/**
 * A regexp for identifing horizontal sepraration-characters.
 * @constant {RegExp}
 * @ignore
 */
const hRegExp = new RegExp(
  [
    lineConfig.solid.h,
    lineConfig.solidBold.h,
    lineConfig.solidRounded.h,
    lineConfig.dashed.h,
    lineConfig.dashedBold.h,
    lineConfig.dashedRounded.h
  ].join('|'), 'g'
);

/**
 * Finds the indices of vertical separation characters in a string or vertical
 * string.
 * @param {string | SbVerticalString} string The string in which to find the
 * separator characters.
 * @returns {Array<number>} The indices of the vertical separation characters.
 */
function findVs(string) {
  string = SbAnsiString.strip(string);
  let separatorIndices = [];
  for (let { index } of string.matchAll(vRegExp)) {
    separatorIndices.push(index)
  }
  return separatorIndices;
}

/**
 * Finds the indices of horizontal separation characters in a string or vertical
 * string.
 * @param {string | SbVerticalString} string The string in which to find the
 * separator characters.
 * @returns {Array<number>} The indices of the horizontal separation characters.
 */
function findHs(string) {
  string = SbAnsiString.strip(string);
  let separatorIndices = [];
  for (let { index } of string.matchAll(hRegExp)) {
    separatorIndices.push(index)
  }
  return separatorIndices;
}

module.exports = {
  findVs,
  findHs
}
