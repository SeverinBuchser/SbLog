/**
 * SbLinesOptions class module.
 * @module SbLinesOptions
 */

const { SbOptions } = require('../options');
const color = require('../color');

/**
 * @classdesc Describes the options which a {@link SbLines} object can take.
 */
class SbLinesOptions extends SbOptions {
  /**
   * Default options.
   * @see {@link color}
   */
  static defaults = new SbLinesOptions(30, color.none, false);

  /**
   * Instantiates a new {@link SbLinesOptions} object.
   * @param {number} width The width of the line block.
   * @param {function} format The format of the line block.
   * @param {boolean} applyFormatToWholeBlock If the format gets applied to the
   * whole line block or not.
   */
  constructor(width, format, applyFormatToWholeBlock) {
    super();
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLinesOptions.defaults} member gets used as the
   * default options. If the format of the options is of type string, the
   * format should represent a predefined format, defined with chalk. For the
   * definitions.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   * @see {@link color}
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
      options.format = color[options.format];
    }
    return options;
  }
}


module.exports = SbLinesOptions;
