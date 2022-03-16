/**
 * @module sb-log.util.ansi-string
 */

/**
 * A regexp for identifing ANSI-escape-characters.
 * @constant {RegExp}
 * @ignore
 */
const regExp = new RegExp([
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|'), 'g')

/**
 * A string which works with ANSI-escape-characters. The goal of the class is to
 * work with a string, which has ANSI-characters and to not interfere with
 * these.
 */
class SbAnsiString {

  /**
   * The original string.
   * @type {string}
   */
  string;

  /**
   * The length of the string including the ANSI-characters.
   * @type {number}
   */
  get length() {
    return this.string.length;
  }

  /**
   * The length of the string excluding the ANSI-characters.
   * @type {number}
   */
  get strippedLength() {
    return this.stripped.length;
  }

  /**
   * The string stripped of its ANSI-characters.
   * @type {string}
   */
  get stripped() {
    return this.string.replace(regExp, '');
  }

  /**
   * Instantiates a new `SbAnsiString` object.
   * @param {string} string The original string.
   */
  constructor(string) {
    this.string = string;
  }

  /**
   * Returns a substring, of the original string. The indexing does account for
   * the ANSI-characters, which means, that the indexing excludes the ANSI-
   * characters.
   * @param {number} indexA The start index of the substring.
   * @param {number} indexB The end index of the substring.
   * @returns {string} The substring of the stripped string including the ANSI-
   * charachters.
   */
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

  /**
   * Strips a string of its ANSI-characters.
   * @param {string} string The string to strip.
   * @returns {string} The the stripped string excluding the ANSI-charachters.
   */
  static strip(string) {
    return string.replace(regExp, '');
  }

  /**
   * Calculates the length of a string excluding the ANSI-characters.
   * @param {string} string The string get the stripped length from.
   * @returns {number} The length of the string excluding the ANSI-characters.
   */
  static strippedLength(string) {
    return SbAnsiString.strip(string).length;
  }
}

module.exports = {
  SbAnsiString
}
