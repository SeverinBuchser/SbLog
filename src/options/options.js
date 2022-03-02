const clone = require('clone');


class SbOptions {
  static getDefaults(defaults, fallBackDefaults) {
    return defaults ? defaults : fallBackDefaults;
  }

  static getOptions(options, defaults) {
    return clone(options ? options : defaults);
  }

  static mergeKey(key, options, defaults) {
    if (options[key] == undefined) {
      options[key] = defaults[key]
    }
  }

  static mergeKeys(keys, options, defaults) {
    keys.forEach(key => SbOptions.mergeKey(key, options, defaults))
  }
}


module.exports = SbOptions;
