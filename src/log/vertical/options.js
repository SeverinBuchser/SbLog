/**
 * @module sb-log.log.vertical.options
 */


const { SbLogCoreOptions } = require('../core');
const prelog = require('../../prelog');
const sepatator = require('../../separator');

/**
 * Describes the options which a `SbLogVertical` object can take.
 */
class SbLogVerticalOptions extends SbLogCoreOptions {
  /**
   * Default options.
   * @type {SbLogVerticalOptions}
   * @readonly
   * @see {@link sepatator}
   * @see {@link prelog}
   */
  static defaults = new SbLogVerticalOptions(sepatator.empty(1), prelog.none)

  /**
   * The function to build the separator string, which vertically separates the
   * logs.
   * @type {function}
   */
   separatorBuilder;

  /**
   * Instantiates a new `SbLogVerticalOptions` object.
   * @param {function} separatorBuilder The function to build the separator
   * string, which vertically separates the logs.
   */
  constructor(separatorBuilder, prelog) {
    super(prelog);
    this.separatorBuilder = separatorBuilder;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the `SbLogHorizontalOptions.defaults` member gets used as the
   * default options.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   * @override
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


module.exports = {
  SbLogVerticalOptions
}
