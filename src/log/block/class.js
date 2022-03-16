/**
 * @module sb-log.log.block.class
 */

const { SbLogBlockOptions } = require('./options');
const { SbLines } = require('../../lines');
const { SbLogCore } = require('../core');

/**
 * A class used to log a single string in form of `SbLines` or build the the
 * lines block.
 * @extends {SbLogCore}
 */
class SbLogBlock extends SbLogCore {

  /**
   * Instantiates a new `SbLogBlock` object with the appropriate options.
   * @param {SbLogBlockOptions} options The options.
   */
  constructor(options) {
    super(SbLogBlockOptions.merge(options));
  }

  /**
   * Builds the log by converting the string into a `SbLines` block.
   * @param {string} string The string to convert.
   * @returns {SbLines} The lines block created out of the string.
   * @override
   */
  build(string) {
    return SbLines.fromString(string, this.options);
  }
}



module.exports = {
  SbLogBlock
}
