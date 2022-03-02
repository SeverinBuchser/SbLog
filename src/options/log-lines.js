const SbOptions = require('./options');
const color = require('./color');


class SbLogLinesOptions extends SbOptions {
  static defaults = new SbLogLinesOptions(30, 'default', false);

  constructor(width, format, applyFormatToWholeBlock) {
    super();
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogLinesOptions.defaults);
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


module.exports = SbLogLinesOptions;
