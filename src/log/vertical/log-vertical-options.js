/**
 * SbLogVerticalOptions class module.
 * @module SbLogVerticalOptions
 */

const { SbLogCoreOptions } = require('../core');
const { empty } = require('../../separator');

/**
 * Describes the options which a {@link SbLogVertical} object can take.
 */
class SbLogVerticalOptions extends SbLogCoreOptions {
  /**
   * Default options.
   * @see {@link empty}
   */
  static defaults = new SbLogVerticalOptions(empty(1), lines => lines)

  /**
   * Instantiates a new {@link SbLogVerticalOptions} object.
   * @param {function} separatorBuilder The function to build the separator
   * string, which vertically separates the logs.
   */
  constructor(separatorBuilder, prelog) {
    super(prelog);
    this.separatorBuilder = separatorBuilder;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLogHorizontalOptions.defaults} member gets used as
   * the default options. 
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogVerticalOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'separatorBuilder'
    ], options, defaults);

    return super.merge(options, defaults);
  }
}


module.exports = SbLogVerticalOptions;
