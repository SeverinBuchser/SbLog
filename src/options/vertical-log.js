const SbLogCoreOptions = require('./log-core');
const { gap } = require('./separator');


class SbVerticalLogOptions extends SbLogCoreOptions {
  static defaults = new SbVerticalLogOptions(gap(1), lines => lines)

  constructor(separatorBuilder, prelog) {
    super(prelog);
    this.separatorBuilder = separatorBuilder;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbVerticalLogOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'separatorBuilder'
    ], options, defaults);

    return super.merge(options, defaults);
  }
}


module.exports = SbVerticalLogOptions;
