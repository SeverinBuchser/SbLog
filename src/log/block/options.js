/**
 * @module sb-log.log.block.options
 */

const { SbLogCoreOptions } = require('../core');
const format = require('../../format');
const prelog = require('../../prelog');

/**
 * Describes the options which a `SbLogBlock` object can take.
 */
class SbLogBlockOptions extends SbLogCoreOptions {
  /**
   * Default options.
   * @type {SbLogBlockOptions}
   * @readonly
   * @see {@link format}
   * @see {@link prelog}
   */
  static defaults = new SbLogBlockOptions(30, format.none, false, prelog.none);

  /**
   * The width of the `SbLines` object.
   * @type {number}
   */
   width;

   /**
    * The format of the `SbLines` object.
    * @type {function}
    */
   format;

   /**
    * Determines if the `format` gets applied to the whole block of the
    * `SbLines` object.
    * @type {boolean}
    */
   applyFormatToWholeBlock;

  /**
   * Instantiates a new `SbLogBlockOptions` object.
   * @param {number} width The width of the `SbLines` object.
   * @param {function} format The format of the `SbLines` object.
   * @param {boolean} applyFormatToWholeBlock Determines if the `format` gets
   * applied to the whole block of the `SbLines` object.
   * @param {function} prelog The function applied to the lines before logging.
   */
  constructor(width, format, applyFormatToWholeBlock, prelog) {
    super(prelog);
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  /**
   * Merges options width default options. If `defaults` is `undefined`, the
   * `SbLogBlockOptions.defaults` member gets used as the default options. If
   * the format of the options is of type `string`, the format should represent
   * a predefined format, defined with chalk. These predefined definitions can
   * be found under 'src/format.js'.
   * @param {object} options The options to extend with the default options.
   * @param {object} defaults The options to use, when the option in the
   * `options` object is `undefined`.
   * @returns {object} The `options` extended with the default options.
   * @override
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

module.exports = {
  SbLogBlockOptions
}
