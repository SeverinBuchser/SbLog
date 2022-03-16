/**
 * @module sb-log.lines.class
 */

const { SbLinesOptions } = require('./options');
const wrap = require('word-wrap');
const { SbAnsiString, SbVerticalString, whitespace, builder } = require('../util');

/**
 * A class used to store strings in form of an array. The class
 * manages the insertion and overall manipulation of the strings. The main
 * difficulty, when managing strings with specific lengths are zero-width
 * characters, specifically with console outputs, having ANSI-escape-characters
 * in the strings.
 * @extends {Array}
 */
class SbLines extends Array {

  /**
   * The options.
   * @type {SbLinesOptions}
   */
  options;

  /**
   * The height of the `SbLines` object.
   * @type {number}
   */
  get height() {
    return this.length;
  }

  /**
   * The width of the `SbLines` object.
   * @type {number}
   */
  get width() {
    return this.options.width;
  }

  /**
   * Converts the `SbLines` object into a regular Array of strings.
   * @returns {Array<string>} The lines of the `SbLines` object.
   */
  toArray() {
    return this.reduce((array, line) => {
      array.push(line);
      return array
    }, []);
  }

  /**
   * Sets new options to the `SbLines` object.
   * @param {SbLinesOptions} options The new options.
   */
  setOptions(options) {
    this.options = SbLinesOptions.merge(options);
  }

  /**
   * Adds margin to the left of every line in form of spaces. The amount of
   * spaces added is given by `margin`.
   * @param {number} margin The amount of spaces to be added to the left.
   */
  addMarginLeft(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.spliceVertical(0, 0, builder.buildVs(this.height, 'empty'));
    }
  }

  /**
   * Adds margin to the right of every line in form of spaces. The amount of
   * spaces added is given by `margin`.
   * @param {number} margin The amount of spaces to be added to the right.
   */
  addMarginRight(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.spliceVertical(this.width, 0, builder.buildVs(this.height, 'empty'));
    }
  }

  /**
   * Adds margin to the top of the `SbLines` object in form of an empty line.
   * The amount of lines added is given by `margin`.
   * @param {number} margin The amount of lines to be added to the top.
   */
  addMarginTop(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.splice(0, 0, builder.buildHs(this.width, 'empty'));
    };
  }

  /**
   * Adds margin to the bottom of the `SbLines` object in form of an empty line.
   * The amount of lines added is given by `margin`.
   * @param {number} margin The amount of lines to be added to the bottom.
   */
  addMarginBottom(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.splice(this.height, 0, builder.buildHs(this.width, 'empty'));
    };
  }

  /**
   * Pushes new lines to the block. The new lines get formatted with the format
   * specified in the `options` of this class. If the `applyFormatToWholeBlock`
   * option is set to true, the whole block will be formatted, which means that
   * every line will be formatted completely. If it's not set, every empty line
   * (only spaces) will not be formatted as well as the trailing whitespace of
   * the line before an empty line and the trailing whitespaces in the last line
   * will not be formatted. <br/>If a line is too short, the line will be filled
   * with spaces until the length of the line is the same as the `width`,
   * specified in the `options` of this class.
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
   * filled with spaces until the length of the line is the same as the `width`,
   * specified in the `options` of this class.
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
   * @returns {boolean} True if the line is empty and false otherwise.
   */
  isEmptyLine(line) {
    return whitespace.trimTrailing(SbAnsiString.strip(line)).length == 0
        && SbAnsiString.strippedLength(line) == this.width;
  }

  /**
   * Works the same as the default `splice` method method of an `Array`, but
   * instead of strings, `SbVerticalString`'s are used.
   * @param {number} start The start at which to insert the new vertical
   * strings.
   * @param {number} deleteCount The number of vertical strings to remove after
   * the `start` index.
   * @param {Array<SbVerticalString>} strings The new vertical strings to
   * insert.
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
   * Calculates the total height of multiple `SbLines` objects. The method adds
   * up the height of every `SbLines` object.
   * @param {Array<SbLines>} allLines The lines to get the total height from.
   * @returns {number} The total height of all `SbLines` objects.
   */
  static getTotalHeight(allLines) {
    return allLines.reduce((height, lines) => {
      return height + lines.height;
    }, 0);
  }

  /**
   * Calculates the maximum height of multiple `SbLines` objects. The method
   * returns the maximum height of all the `SbLines` objects.
   * @param {Array<SbLines>} allLines The lines to get the maximum height from.
   * @returns {number} The maximum height of all `SbLines` objects.
   */
  static getMaxHeight(allLines) {
    return allLines.reduce((height, lines) => {
      return Math.max(height, lines.height);
    }, 0);
  }

  /**
   * Calculates the total width of multiple `SbLines` objects. The method adds
   * up the width of every `SbLines` object.
   * @param {Array<SbLines>} allLines The lines to get the total width from.
   * @returns {number} The total width of all `SbLines` objects.
   */
  static getTotalWidth(allLines) {
    return allLines.reduce((width, lines) => {
      return width + lines.width;
    }, 0);
  }

  /**
   * Calculates the maximum width of multiple `SbLines` objects. The method
   * returns the maximum width of all the `SbLines` objects.
   * @param {Array<SbLines>} allLines The lines to get the maximum width from.
   * @returns {number} The maximum width of all `SbLines` objects.
   */
  static getMaxWidth(allLines) {
    return allLines.reduce((width, lines) => {
      return Math.max(width, lines.width);
    }, 0);
  }

  /**
   * Constructs a `SbLines` object from an `Array` of `strings` and a
   * `SbLinesOptions` object. The lines will be formatted according to the
   * `format` specified in the `options`.
   * @param {Array<string>} array The array of strings.
   * @param {SbLinesOptions} options The options to use for the new `SbLines`
   * object.
   * @returns {SbLines} A new `SbLines` object with the lines in the `array` and
   * the specified options.
   */
  static fromArrayFormatted(array, options) {
    const lines = new SbLines();
    lines.setOptions(options);
    lines.pushFormatted(...array);
    return lines;
  }

  /**
   * Constructs a `SbLines` object from an `Array` of `strings` and a
   * `SbLinesOptions` object. The lines will not be formatted.
   * @param {Array<string>} array The array of strings.
   * @param {SbLinesOptions} options The options to use for the new `SbLines`
   * object.
   * @returns {SbLines} A new `SbLines` object with the lines in the `array` and
   * the specified options.
   */
  static fromArrayUnformatted(array, options) {
    const lines = new SbLines();
    lines.setOptions(options);
    lines.pushUnformatted(...array);
    return lines;
  }

  /**
   * Constructs a `SbLines` object from a `string` and a `SbLinesOptions`
   * object. If the `string` is too long, the `string` will be wrapped onto new
   * lines. The maximum width of the `string` is given by the `options`. The
   * wrapping cannot accommodate for long words and will cut any word in half if
   * it is too long to fit on the line. The wrapped string will then be
   * formatted with the specified `format` from the `options`.
   * @param {string} string The string to wrap.
   * @param {SbLinesOptions} options The options to use for the new `SbLines`
   * object.
   * @returns {SbLines} A new `SbLines` object with the wrapped `string` as the
   * lines.
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

module.exports = {
  SbLines
}
