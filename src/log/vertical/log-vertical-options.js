const { SbLogCoreOptions } = require('../core');
const { empty } = require('../../separator');


class SbLogVerticalOptions extends SbLogCoreOptions {
  static defaults = new SbLogVerticalOptions(empty(1), lines => lines)

  constructor(separatorBuilder, prelog) {
    super(prelog);
    this.separatorBuilder = separatorBuilder;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogVerticalOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'separatorBuilder'
    ], options, defaults);

    return super.merge(options, defaults);
  }
}


module.exports = SbLogVerticalOptions;
