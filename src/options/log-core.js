const SbOptions = require('./options');


class SbLogCoreOptions extends SbOptions {
  static defaults = new SbLogCoreOptions(lines => lines);

  constructor(prelog) {
    super();
    this.prelog = prelog;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogCoreOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'prelog'
    ], options, defaults);

    return options;
  }
}


module.exports = SbLogCoreOptions;
