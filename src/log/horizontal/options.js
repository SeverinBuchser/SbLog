/**
 * @module sb-log.log.horizontal.options
 */

const { SbLogCoreOptions } = require('../core');
const prelog = require('../../prelog');

/**
 * Describes the options which a `SbLogHorizontal` object can take.
 */
class SbLogHorizontalOptions extends SbLogCoreOptions {
  /**
   * Default options.
   * @type {SbLogHorizontalOptions}
   * @readonly
   * @see {@link prelog}
   */
  static defaults = new SbLogHorizontalOptions(3, prelog.none);

  /**
   * The separator string to separate the logs.
   * @type {string}
   */
  separator;

  /**
   * Instantiates a new `SbLogHorizontalOptions` object.
   * @param {string} separator The separator string to separate the logs.
   */
  constructor(separator, prelog) {
    super(prelog);
    this.separator = separator;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the `SbLogHorizontalOptions.defaults` member gets used as the
   * default options. If the separator value in the options is a number, the
   * method will replace the separator value with a string containing the number
   * of spaces which is specified by the original value.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   * @override
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogHorizontalOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'separator'
    ], options, defaults);

    if (typeof options.separator == 'number') {
      options.separator = ' '.repeat(options.separator);
    }

    return super.merge(options, defaults);
  }
}


module.exports = {
  SbLogHorizontalOptions
}
