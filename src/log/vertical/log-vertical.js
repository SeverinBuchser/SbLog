/**
 * SbLogVertical class module.
 * @module SbLogVertical
 */

const SbLogVerticalOptions = require('./log-vertical-options');
const { SbLogCore } = require('../core');
const { SbLines } = require('../../lines');

/**
 * @classdesc A class used to log multiple strings ontop of each other. Each of
 * the strings has its own logger.
 */
class SbLogVertical extends SbLogCore {

  /**
   * Instantiates a new {@link SbLogVertical} object with the appropriate options.
   * @param {Array<SbLogCore>} logs The loggers, used to log each string.
   * @param {SbLogVerticalOptions} options The options.
   */
  constructor(logs, options) {
    super(SbLogVerticalOptions.merge(options));
    this.logs = logs ? logs : [];
  }

  /**
   * Builds the log by building each of the loggers with its dedicated string.
   * This means that the strings Array parameter must have the same length as
   * the logs Array. After each log gets built, the lines get joined. Each line
   * of each logger gets pushed to the bottom of the previous logger.
   * @param {Array<string>} strings The strings to convert.
   * @returns {SbLines} The lines block created out of the strings.
   * @override
   */
  build(strings) {
    if (!Array.isArray(strings) || strings.length != this.logs.length) {
      throw new Erorr('Strings must be an array and there must be as many string objects as logs.');
    }
    let allLines = this.logs.map((log, index) => log.build(strings[index]));
    let width = SbLines.getMaxWidth(allLines);
    allLines.forEach(lines => lines.addMarginRight(width - lines.width));

    return SbLines.fromArrayUnformatted(this.joinLines(allLines), {
      ...this.options,
      width
    })
  }

  /**
   * Combines all the lines into one single Array of strings. The strings of
   * each Array get pushed to the bottom of the previous line.
   * @param {Array<Array<string>>} allLines The lines to combine.
   * @returns {Array<string>} The combined lines.
   */
  joinLines(allLines) {
    return allLines.reduce((joined, lines, linesIndex, allLines) => {
      lines.forEach(line => joined.push(line));
      if (linesIndex < allLines.length - 1) {

        let separator = this.options.separatorBuilder(lines.width);
        if (separator) {
          joined.push(...this.options.separatorBuilder(lines.width))
        }
      }
      return joined;
    }, []);
  }

}

module.exports = SbLogVertical;
