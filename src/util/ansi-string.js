const regExp = new RegExp([
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|'), 'g')

class SbAnsiString {

  get length() {
    return this.string.length;
  }

  get strippedLength() {
    return this.stripped.length;
  }

  get stripped() {
    return this.string.replace(regExp, '');
  }

  constructor(string) {
    this.string = string;
  }

  substring(indexA, indexB) {
    if (indexB == undefined) {
      indexB = this.strippedLength;
    }
    if (indexA == indexB) return '';

    let ansis = this.string.match(regExp)
    let ansiPositions = [];
    if (ansis) {
      ansis = ansis.map(ansi => ansi.length);
      let split = this.string.split(regExp);

      let ansiPos = 0;
      for (let i = 0 ; i < ansis.length ; i++) {
        ansiPos += split[i].length
        ansiPositions.push({pos: ansiPos, len: ansis[i]});
      }
    }

    let indexAOffset = 0;
    let indexBOffset = 0;

    ansiPositions.forEach(position => {
      if (indexA > position.pos) indexAOffset += position.len;
      if (indexB >= position.pos) indexBOffset += position.len;
    })
    return this.string.substring(indexA + indexAOffset, indexB + indexBOffset);
  }

  static strip(string) {
    return string.replace(regExp, '');
  }

  static strippedLength(string) {
    return SbAnsiString.strip(string).length;
  }
}

module.exports = SbAnsiString;
