const solid = {
  h: '\u2500',
  v: '\u2502',
  cTL: '\u250C',
  cTR: '\u2510',
  cBL: '\u2514',
  cBR: '\u2518',
  mL: '\u251C',
  mR: '\u2524',
  mT: '\u252C',
  mB: '\u2534',
  mM: '\u253C'
}

const regExp = {
  solid: {
    h: /\u2500/g,
    v: /\u2502/g,
    cTL: /\u250C/g,
    cTR: /\u2510/g,
    cBL: /\u2514/g,
    cBR: /\u2518/g,
    mL: /\u251C/g,
    mR: /\u2524/g,
    mT: /\u252C/g,
    mB: /\u2534/g,
    mM: /\u253C/g
  }
}

module.exports = {
  solid,
  regExp,
}
