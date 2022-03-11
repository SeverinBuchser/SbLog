/**
 * SbLogCoreOptions class module.
 * @module SbLogCoreOptions
 */

const { SbOptions } = require('../../options');
const prelog = require('../../prelog');

/**
 * @classdesc Describes the options which a {@link SbLogCore} object can take.
 */
class SbLogCoreOptions extends SbOptions {
  /**
   * Default options.
   * @see {@link prelog}
   */
  static defaults = new SbLogCoreOptions(prelog.none);

  /**
   * Instantiates a new {@link SbLogCoreOptions} object.
   * @param {function} prelog The function applied to the lines before logging.
   */
  constructor(prelog) {
    super();
    this.prelog = prelog;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLogCoreOptions.defaults} member gets used as the
   * default options.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogCoreOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'prelog'
    ], options, defaults);

    return options;
  }
}


module.exports = SbLogCoreOptions;
