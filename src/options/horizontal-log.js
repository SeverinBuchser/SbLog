const SbLogCoreOptions = require('./log-core');


class SbHorizontalLogOptions extends SbLogCoreOptions {
  static defaults = new SbHorizontalLogOptions(3, lines => lines);

  constructor(separator, prelog) {
    super(prelog);
    this.separator = separator;
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

    return super.merge(options, defaults);
  }
}


module.exports = SbHorizontalLogOptions;
