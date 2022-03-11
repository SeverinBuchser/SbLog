/**
 * SbLogHorizontal class module.
 * @module SbLogHorizontal
 */

const SbLogHorizontalOptions = require('./log-horizontal-options');
const { SbLines } = require('../../lines');
const { SbLogCore } = require('../core');
const { SbAnsiString } = require('../../util');

/**
 * @classdesc A class used to log multiple strings side by side. Each of the
 * strings has its own logger.
 */
class SbLogHorizontal extends SbLogCore {

  /**
   * Calculates the width of the separator string, defined in the options.
   * @returns {number} The width of the separator string.
   */
  get separatorWidth() {
    return SbAnsiString.strippedLength(this.options.separator);
  }

  /**
   * Instantiates a new {@link SbLogHorizontal} object with the appropriate options.
   * @param {Array<SbLogCore>} logs The loggers, used to log each string.
   * @param {SbLogHorizontalOptions} options The options.
   */
  constructor(logs, options) {
    super(SbLogHorizontalOptions.merge(options));
    this.logs = logs ? logs : [];
  }

  /**
   * Builds the log by building each of the loggers with its dedicated string.
   * This means that the strings Array parameter must have the same length as
   * the logs Array. After each log gets built, the lines get joined. Each line
   * of each logger gets appended to the right of the previous logger.
   * @param {Array<string>} strings The strings to convert.
   * @returns {SbLines} The lines block created out of the strings.
   * @override
   */
  build(strings) {
    if (!Array.isArray(strings) || strings.length != this.logs.length) {
      throw new Error('Strings must be an array and there must be as many string objects as logs.');
    }

    let allLines = this.logs.map((log, index) => log.build(strings[index]));
    let height = SbLines.getMaxHeight(allLines);
    let separatorWidth = this.separatorWidth * (allLines.length - 1);
    let width = SbLines.getTotalWidth(allLines);

    allLines.forEach(lines => lines.addMarginBottom(height - lines.height))

    return SbLines.fromArrayUnformatted(this.joinLines(allLines), {
      ...this.options,
      width: width + separatorWidth
    });
  }

  /**
   * Combines all the lines into one single Array of strings. The strings of
   * each Array get concatenated into one string.
   * @param {Array<Array<string>>} allLines The lines to combine.
   * @returns {Array<string>} The combined lines.
   */
  joinLines(allLines) {
    return allLines.reduce((joined, lines, linesIndex, allLines) => {
      lines.forEach((line, lineIndex) => {
        if (joined[lineIndex]) joined[lineIndex] += line;
        else joined[lineIndex] = line;
      })
      if (linesIndex < allLines.length  - 1) {
        joined = joined.map(line => line + this.options.separator)
      }
      return joined;
    }, []);
  }

}

module.exports = SbLogHorizontal;
