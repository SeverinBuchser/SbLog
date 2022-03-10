const { SbOptions } = require('../options');
const color = require('../color');


class SbLinesOptions extends SbOptions {
  static defaults = new SbLinesOptions(30, 'default', false);

  constructor(width, format, applyFormatToWholeBlock) {
    super();
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

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
