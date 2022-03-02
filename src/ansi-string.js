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

  static strip(string) {
    return string.replace(regExp, '');
  }

  static strippedLength(string) {
    return SbAnsiString.strip(string).length;
  }
}

module.exports = SbAnsiString;
