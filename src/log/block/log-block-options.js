/**
 * SbLogBlockOptions class module.
 * @module SbLogBlockOptions
 */

const { SbLogCoreOptions } = require('../core');
const format = require('../../format');
const prelog = require('../../prelog');

/**
 * @classdesc Describes the options which a {@link SbLogBlock} object can take.
 */
class SbLogBlockOptions extends SbLogCoreOptions {
  /**
   * Default options.
   * @see {@link format}
   * @see {@link prelog}
   */
  static defaults = new SbLogBlockOptions(30, format.none, false, prelog.none);

  /**
   * Instantiates a new {@link SbLogBlockOptions} object.
   * @param {number} width The width of the line block.
   * @param {function} format The format of the line block.
   * @param {boolean} applyFormatToWholeBlock If the format gets applied to the
   * whole line block or not.
   * @param {function} prelog The function applied to the lines before logging.
   */
  constructor(width, format, applyFormatToWholeBlock, prelog) {
    super(prelog);
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLogBlockOptions.defaults} member gets used as the
   * default options. If the format of the options is of type string, the
   * format should represent a predefined format, defined with chalk. For the
   * definitions.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   * @see {@link format}
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogBlockOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'width',
      'format',
      'applyFormatToWholeBlock'
    ], options, defaults);

    if (typeof options.format == 'string') {
      options.format = format[options.format];
    }
    return options;
  }
}


module.exports = SbLogBlockOptions;
