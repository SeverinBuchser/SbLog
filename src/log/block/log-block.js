/**
 * SbLogBlock class module.
 * @module SbLogBlock
 */

const SbLogBlockOptions = require('./log-block-options');
const { SbLines } = require('../../lines');
const { SbLogCore } = require('../core');

/**
 * @classdesc A class used to log a single string in form of {@link SbLines} or
 * build the the lines block.
 */
class SbLogBlock extends SbLogCore {

  /**
   * Instantiates a new {@link SbLogBlock} object with the appropriate options.
   * @param {SbLogBlockOptions} options The options.
   */
  constructor(options) {
    super(SbLogBlockOptions.merge(options));
  }

  /**
   * Builds the log by converting the string into a {@link SbLines} block.
   * @param {string} string The string to convert.
   * @returns {SbLines} The lines block created out of the string.
   * @override
   */
  build(string) {
    return SbLines.fromString(string, this.options);
  }

}

module.exports = SbLogBlock;
