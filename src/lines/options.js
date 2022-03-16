/**
 * @module sb-log.lines.options
 */

const { SbOptions } = require('../options');
const format = require('../format');

/**
 * Describes the options which a `SbLines` object can take.
 * @extends {SbOptions}
 */
class SbLinesOptions extends SbOptions {
  /**
   * The default options.
   * @type {SbLinesOptions}
   * @readonly
   * @see {@link format}
   */
  static defaults = new SbLinesOptions(30, format.none, false);

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
   * Instantiates a new `SbLines` object.
   * @param {number} width The width of the `SbLines` object.
   * @param {function} format The format of the `SbLines` object.
   * @param {boolean} applyFormatToWholeBlock Determines if the `format` gets
   * applied to the whole block of the `SbLines` object.
   */
  constructor(width, format, applyFormatToWholeBlock) {
    super();
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  /**
   * Merges options width default options. If `defaults` is `undefined`, the
   * `SbLinesOptions.defaults` member gets used as the default options. If the
   * format of the options is of type `string`, the format should represent a
   * predefined format, defined with chalk. These predefined definitions can be
   * found under 'src/format.js'.
   * @param {object} options The options to extend with the default options.
   * @param {object} defaults The options to use, when the option in the
   * `options` object is `undefined`.
   * @returns {object} The `options` extended with the default options.
   * @override
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLinesOptions.defaults);
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
  SbLinesOptions
}
