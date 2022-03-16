/**
 * @module sb-log.options
 */

const clone = require('clone');

/**
 * A core class to define options with unified options handling and merging.
 */
class SbOptions {
  /**
   * Returns the default options to use. If there are no default options, the
   * fallback default options are used.
   * @param {object} defaults The default options.
   * @param {object} fallBackDefaults The fallback default options.
   * @returns {object} The default options to use.
   */
  static getDefaults(defaults, fallBackDefaults) {
    return defaults ? defaults : fallBackDefaults;
  }

  /**
   * If there are no options, the defaults are used.
   * @param {object} options The options.
   * @param {object} defaults The default options.
   * @returns {object} The options to use.
   */
  static getOptions(options, defaults) {
    return clone(options ? options : defaults);
  }

  /**
   * Merges a property of the options with name `key` with the default options.
   * If the property is not defined in the options, the default values are used.
   * @param {string} key The key to the property.
   * @param {object} options The options.
   * @param {object} defaults The default options.
   */
  static mergeKey(key, options, defaults) {
    if (options[key] == undefined) {
      options[key] = defaults[key]
    }
  }

  /**
   * Merges multiple properties of the options with the default options. If the
   * properties are not defined in the options, the default values are used.
   * @param {Array<string>} keys The keys to the properties.
   * @param {object} options The options.
   * @param {object} defaults The default options.
   */
  static mergeKeys(keys, options, defaults) {
    keys.forEach(key => SbOptions.mergeKey(key, options, defaults))
  }
}


module.exports = {
  SbOptions
}
