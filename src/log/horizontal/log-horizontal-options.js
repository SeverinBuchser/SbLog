/**
 * SbLogHorizontalOptions class module.
 * @module SbLogHorizontalOptions
 */

const { SbLogCoreOptions } = require('../core');

/**
 * Describes the options which a {@link SbLogHorizontal} object can take.
 */
class SbLogHorizontalOptions extends SbLogCoreOptions {
  /**
   * Default options.
   */
  static defaults = new SbLogHorizontalOptions(3, lines => lines);

  /**
   * Instantiates a new {@link SbLogHorizontalOptions} object.
   * @param {string} separator The separator string to separate the logs.
   */
  constructor(separator, prelog) {
    super(prelog);
    this.separator = separator;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLogHorizontalOptions.defaults} member gets used as
   * the default options. If the separator value in the options is a number, the
   * method will replace the separator value with a string containing the number
   * of spaces which is specified by the original value.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
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


module.exports = SbLogHorizontalOptions;
