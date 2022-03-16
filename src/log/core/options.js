/**
 * @module sb-log.log.core.options
 */

const { SbOptions } = require('../../options');
const prelog = require('../../prelog');

/**
 * Describes the options which a `SbLogCore` object can take.
 * @extends SbOptions
 */
class SbLogCoreOptions extends SbOptions {
  /**
   * Default options.
   * @type {SbLogCoreOptions}
   * @readonly
   * @see {@link prelog}
   */
  static defaults = new SbLogCoreOptions(prelog.none);

  /**
   * The function which gets applied to the lines, before logging them to the
   * console.
   * @type {function}
   */
   prelog;

  /**
   * Instantiates a new `SbLogCoreOptions` object.
   * @param {function} prelog The function which gets applied to the lines,
   * before logging them to the console.
   */
  constructor(prelog) {
    super();
    this.prelog = prelog;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the `SbLogCoreOptions.defaults` member gets used as the
   * default options.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   * @override
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


module.exports = {
  SbLogCoreOptions
}
