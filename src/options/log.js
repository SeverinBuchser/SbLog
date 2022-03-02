const SbLogCoreOptions = require('./log-core');
const color = require('./color');


class SbLogOptions extends SbLogCoreOptions {
  static defaults = new SbLogOptions(30, 'default', false, lines => lines);

  constructor(width, format, applyFormatToWholeBlock, prelog) {
    super(prelog);
    this.width = width;
    this.format = format;
    this.applyFormatToWholeBlock = applyFormatToWholeBlock;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogOptions.defaults);
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


module.exports = SbLogOptions;
