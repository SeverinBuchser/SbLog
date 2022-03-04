const SbLogCoreOptions = require('./log-core');
const SbAnsiString = require('./../ansi-string');


class SbHorizontalLogOptions extends SbLogCoreOptions {
  static defaults = new SbHorizontalLogOptions(3, 2, lines => lines);

  constructor(separator, separatorCenter, prelog) {
    super(prelog);
    this.separator = separator;
    this.separatorCenter = separatorCenter;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbHorizontalLogOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'separator'
    ], options, defaults);

    if (typeof options.separator == 'number') {
      options.separator = ' '.repeat(options.separator);
    }
    
    if (options.separatorCenter == undefined) {
      options.separatorCenter = Math.floor(SbAnsiString.strippedLength(options.separator) / 2);
    }

    return super.merge(options, defaults);
  }
}


module.exports = SbHorizontalLogOptions;
