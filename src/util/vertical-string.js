/**
 * SbVerticalString class module.
 * @module SbVerticalString
 */

 /**
  * @classdesc A string class which manages a vertical string. A vertical string
  * is a string, which stores the characters in a vertical configuration,
  * specifically a Array of strings. Each line of the vertical string has
  * exactly one character. The class provides some functionality like a normal
  * string does.
  */
class SbVerticalString {

  /**
   * Transforms the vertical string into a normal string.
   * @returns {string} A normal string containing the characters of the vertical
   * string.
   */
  get string() {
    return this.strings.join('');
  }

  /**
   * Calculates the legnth/height of the vertical string.
   * @returns {number} The length of the vertical string.
   */
  get length() {
    return this.string.length;
  }

  /**
   * Instantiates a new {@link SbVerticalString} object. If the strings
   * parameter is a string, the string just gets split into an Array of strings,
   * each of the lines of the Array contains exactly one character of the
   * original string. If the strings parameter is an Aarray of strings, an index
   * must be specified. The default index is zero. The index specifies at which
   * index of a string from the Array to take the character from.
   * @param {string | Array<string>} strings The original string of an array of
   * strings.
   * @param {number} index The index from which to retreive the vertical string
   * if the strings parameter is an Array of strings.
   */
  constructor(strings, index = 0) {
    if (typeof strings == 'string') {
      this.strings = [strings.split('')[index]];
    } else {
      this.strings = strings.map(string => string.substring(index, index + 1));
    }
  }

  /**
   * Gets the character at the speficied index.
   * @param {number} index The index of the character.
   * @returns {string} The character at the specified index.
   */
  get(index) {
    return this.strings[index];
  }

  /**
   * Matches a regexp to the string. The same functionality and behaviour as a
   * normal string.
   * @param {RegExp} regexp The regexp to match the string to.
   * @returns {RegExpMatchArray} The result of the match.
   */
  match(regexp) {
    return this.string.match(regexp);
  }

  /**
   * Matches a regexp to the string. This method returns the all matched groups
   * of the string. The same functionality and behaviour as a normal string.
   * @param {RegExp} regexp The regexp to match the string to.
   * @returns {Iterator<RegExpMatchArray>} The result of the match.
   */
  matchAll(regexp) {
    return this.string.matchAll(regexp);
  }

  /**
   * Replaces parts of the string matching to the regexp with a new string or
   * uses a function to create the new string. Works exactly like the normal
   * string.
   * @param {RegExp} regexp A regexp to identitfy the parts of the string to
   * replace.
   * @param {string | function} newSubstrOrFunc The new string or the function
   * to get the new string from.
   */
  replace(regexp, newSubstrOrFunc) {
    return new SbVerticalString(this.string.replace(regexp, newSubstrOrFunc).split(''));
  }

  /**
   * Concatenates new strings or vertical strings and returns a new vertical
   * string. Works exactly like a normal string.
   * @param {Array<string | SbVerticalString>} strings The strings or vertical
   * strings to concatenate to this string.
   * @returns {SbVerticalString} The new concatenated vertical string.
   */
  concat(...strings) {
    strings = strings.map(string => {
      if (typeof string == 'string') {
        return new SbVerticalString(string.split(''));
      }
      if (!(string instanceof SbVerticalString)) {
        throw new Error('Cannot concatenate a non vertical string to a vertical string!');
      }
      return string
    })
    let newStrings = this.strings;
    strings.forEach(string => {
      newStrings = newStrings.concat(string.strings);
    })
    return new SbVerticalString(newStrings);
  }

  /**
   * Creates a new vertical substring from the original vertical string.
   * @param {number} indexA The start index of the substring.
   * @param {number} indexB The end index of the substring.
   * @returns {SbVerticalString} The substring of the original vertical string
   */
  substring(indexA, indexB) {
    return new SbVerticalString(this.strings.slice(indexA, indexB))
  }
}

module.exports = SbVerticalString;
