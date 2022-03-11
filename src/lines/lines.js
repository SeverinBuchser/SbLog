/**
 * SbLines class module.
 * @module SbLines
 */

const SbLinesOptions = require('./lines-options');
const wrap = require('word-wrap');
const { SbAnsiString, SbVerticalString, whitespace, builder } = require('../util');

/**
 * @classdesc A class used to store strings in form of an array. The class
 * manages the insertion and overall manipulation of the strings. The main
 * difficulty is to have ANSI-escape-characters in the strings, which increases
 * the length of each string, but does not change the string length visibly
 * (zero-width-characters). So to handle this problem, this class can be used.
 */
class SbLines extends Array {

  /**
   * @returns {number} The height of the lines block.
   */
  get height() {
    return this.length;
  }

  /**
   * @returns {number} The width of the lines block.
   */
  get width() {
    return this.options.width;
  }

  /**
   * Converts the [SbLines object]{@link SbLines} into a regular Array.
   * @returns {Array} Array of the strings.
   */
  toArray() {
    return this.reduce((array, line) => {
      array.push(line);
      return array
    }, []);
  }

  /**
   * Sets new options to the [SbLines object]{@link SbLines}
   * @param {SbLinesOptions} options The new options.
   */
  setOptions(options) {
    this.options = SbLinesOptions.merge(options);
  }

  /**
   * Adds margin to the left of every line in form of spaces.
   * @param {number} margin The number of spaces.
   */
  addMarginLeft(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.spliceVertical(0, 0, builder.buildVs(this.height, 'empty'));
    }
  }

  /**
   * Adds margin to the right of every line in form of spaces.
   * @param {number} margin The number of spaces.
   */
  addMarginRight(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.spliceVertical(this.width - 1, 0, builder.buildVs(this.height, 'empty'));
    }
  }

  /**
   * Adds margin to the top of the Array in form of an empty line.
   * @param {number} margin The number of lines.
   */
  addMarginTop(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.splice(0, 0, builder.buildHs(this.width, 'empty'));
    };
  }

  /**
   * Adds margin to the bottom of the Array in form of an empty line.
   * @param {number} margin The number of lines.
   */
  addMarginBottom(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.splice(this.height, 0, builder.buildHs(this.width, 'empty'));
    };
  }

  /**
   * Pushes new lines to the block. The new lines get formatted with the format
   * specified in the [options]{@link SbLinesOptions} member of this class. If
   * the 'applyFormatToWholeBlock' option is set to true, the whole block will
   * be formatted, which means that every line will be formatted completely. If
   * this is not set, every empty line (only spaces) will not be formatted and
   * also the trailing whitespace of the line before an empty line of at the end
   * of the block will not be formatted.
   *
   * If a line is too short, the line will be filled with spaces until the
   * length of the line is the same as the 'width', specified in the
   * [options]{@link SbLinesOptions} member.
   * @param {Array<string>} lines The lines to add.
   */
  pushFormatted(...lines) {
    lines.forEach(line => {
      this.push(whitespace.fillTrailing(line, this.width))
      if (this.options.applyFormatToWholeBlock) {
        this.formatLineIncludeWhitespace(this.height - 1);
      } else if (!this.isEmptyLine(line)) {
        if (this.height - 2 >= 0 && !this.isEmptyLine(this[this.height - 2])) {
          this.formatLineIncludeWhitespace(this.height - 2);
        }
        this.formatLineExcludeWhitespace(this.height - 1);
      }
    })
  }

  /**
   * Pushes new lines to the block. If a line is too short, the line will be
   * filled with spaces until the length of the line is the same as the 'width',
   * specified in the [options]{@link SbLinesOptions} member.
   * @param {Array<string>} lines The lines to add.
   */
  pushUnformatted(...lines) {
    lines.forEach(line => {
      this.push(whitespace.fillTrailing(line, this.width))
    })
  }

  /**
   * Formats a line including the trailing whitespaces. For this the whole line
   * gets stripped of its ANSI-escape-characters, in case there are any and the
   * new format will be applied.
   * @param {number} lineIndex The index of the line to format.
   */
  formatLineIncludeWhitespace(lineIndex) {
    this[lineIndex] = this.options.format(SbAnsiString.strip(this[lineIndex]));
  }

  /**
   * Formats a line excluding the trailing whitespaces. For this the whole line
   * gets stripped of its ANSI-escape-characters, in case there are any. Then
   * the trailing whitespaces of the line will be removed and the rest of the
   * line will be formatted. Then the formatted part of the line will be filled
   * with spaces again.
   * @param {number} lineIndex The index of the line to format.
   */
  formatLineExcludeWhitespace(lineIndex) {
    let line = whitespace.trimTrailing(SbAnsiString.strip(this[lineIndex]));
    this[lineIndex] = whitespace.fillTrailing(this.options.format(line), this.width);
  }

  /**
   * Checks wether a line is empty or not. A line is considered empty if the
   * ANSI-stripped line without whitespace has length zero. The line also has
   * to have a length of the width of the block.
   * @param {string} line The line to be checked.
   */
  isEmptyLine(line) {
    return whitespace.trimTrailing(SbAnsiString.strip(line)).length == 0
        && SbAnsiString.strippedLength(line) == this.width;
  }

  /**
   *  Works the same as the 'splice' method of an 'Array', but instead of a
   * string, a {@link SbVerticalString} is used.
   * @param {number} start The start at which to insert the new vertical
   * strings.
   * @param {number} deleteCount The number of vertical strings to remove.
   * @param {Array<SbVerticalString>} strings The new strings to insert.
   */
  spliceVertical(start, deleteCount, ...strings) {
    if (strings) {
      strings.forEach(string => {
        if (!(string instanceof SbVerticalString)) {
          throw new Error("String must be a vertical string!");
        }
      })
    }
    let stringsJoined = this.map(() => '');
    strings.forEach(string => {
      string.strings.forEach((character, index) => {
        stringsJoined[index] += character;
      })
    })

    this.forEach((line, lineIndex) => {
      let ansiLine = new SbAnsiString(this[lineIndex]);
      this[lineIndex] = ansiLine.substring(0, start) + stringsJoined[lineIndex] + ansiLine.substring(start + deleteCount)
    })

    this.options.width += strings.length - deleteCount;
  }

  /**
   * Calculates the total height of multiple {@link SbLines}.
   * @param {Array<SbLines>} allLines The lines to get the total height from.
   * @returns {number} The total height of the lines.
   */
  static getTotalHeight(allLines) {
    return allLines.reduce((height, lines) => {
      return height + lines.height;
    }, 0);
  }

  /**
   * Calculates the maximum height of multiple {@link SbLines}.
   * @param {Array<SbLines>} allLines The lines to get the maximum height from.
   * @returns {number} The maximum height of the lines.
   */
  static getMaxHeight(allLines) {
    return allLines.reduce((height, lines) => {
      return Math.max(height, lines.height);
    }, 0);
  }

  /**
   * Calculates the total width of multiple {@link SbLines}.
   * @param {Array<SbLines>} allLines The lines to get the total width from.
   * @returns {number} The total width of the lines.
   */
  static getTotalWidth(allLines) {
    return allLines.reduce((width, lines) => {
      return width + lines.width;
    }, 0);
  }

  /**
   * Calculates the maximum width of multiple {@link SbLines}.
   * @param {Array<SbLines>} allLines The lines to get the maximum width from.
   * @returns {number} The maximum width of the lines.
   */
  static getMaxWidth(allLines) {
    return allLines.reduce((width, lines) => {
      return Math.max(width, lines.width);
    }, 0);
  }

  /**
   * Constructs a {@link SbLines} object from an Array of strings and a
   * {@link SbLinesOptions} object. The lines will be formatted according to
   * the options.
   * @param {Array<string>} array The array of strings.
   * @param {SbLinesOptions} options The options of the lines block.
   * @returns {SbLines} The formatted lines object.
   */
  static fromArrayFormatted(array, options) {
    const lines = new SbLines();
    lines.setOptions(options);
    lines.pushFormatted(...array);
    return lines;
  }

  /**
   * Constructs a {@link SbLines} object from an Array of strings and a
   * {@link SbLinesOptions} object. The lines will not be formatted.
   * @param {Array<string>} array The array of strings.
   * @param {SbLinesOptions} options The options of the lines block.
   * @returns {SbLines} The unformatted lines object.
   */
  static fromArrayUnformatted(array, options) {
    const lines = new SbLines();
    lines.setOptions(options);
    lines.pushUnformatted(...array);
    return lines;
  }

  /**
   * Constructs a {@link SbLines} object from a string and a
   * {@link SbLinesOptions} object. If the string is too long, the string will
   * be wrapped onto new lines. The wrapping cannot accomodate for long words
   * and will cut any word in half, if it is too long to fit on the line. The
   * wrapped string will then be formatted.
   * @param {string} string The array of strings.
   * @param {SbLinesOptions} options The options of the lines block.
   * @returns {SbLines} The formatted lines object.
   */
  static fromString(string, options) {
    options = SbLinesOptions.merge(options);
    return SbLines.fromArrayFormatted(
      wrap(SbAnsiString.strip(string), {
        width: options.width,
        cut: true,
        indent: ''
      }).split('\n'),
      options
    );
  }

}

module.exports = SbLines;
