const { SbLogCoreOptions } = require('../core');
const color = require('../../color');


class SbLogBlockOptions extends SbLogCoreOptions {
  static defaults = new SbLogBlockOptions(30, 'default', false, lines => lines);

  constructor(width, format, applyFormatToWholeBlock, prelog) {
    super(prelog);
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogBlockOptions.defaults);
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


module.exports = SbLogBlockOptions;
