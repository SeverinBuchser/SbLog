const { SbAnsiString } = require('./util');
const lineConfig = require('./line-config');

const vRegExp = new RegExp(
  lineConfig.solid.v
  + '|' + lineConfig.solidBold.v
  + '|' + lineConfig.solidRounded.v
  + '|' + lineConfig.dashed.v
  + '|' + lineConfig.dashedBold.v
  + '|' + lineConfig.dashedRounded.v,
  'g'
);

const hRegExp = new RegExp(
  lineConfig.solid.h
  + '|' + lineConfig.solidBold.h
  + '|' + lineConfig.solidRounded.h
  + '|' + lineConfig.dashed.h
  + '|' + lineConfig.dashedBold.h
  + '|' + lineConfig.dashedRounded.h,
  'g'
);

function findVs(string) {
  string = SbAnsiString.strip(string);
  let separatorIndices = [];
  for (let { index } of string.matchAll(vRegExp)) {
    separatorIndices.push(index)
  }
  return separatorIndices;
}

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
