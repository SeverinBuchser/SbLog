/**
 * @module sb-log.log.core.class
 */

const { SbLogCoreOptions } = require('./options');

/**
 * @classdesc A core class, which is used by all log classes to unify the
 * logging process.
 */
class SbLogCore {
  /**
   * The options.
   * @type {SbLogCoreOptions}
   */
   options;

  /**
   * Instantiates a new `SbLogCore` object with the appropriate options.
   * @param {SbLogCoreOptions} options The options.
   */
  constructor(options) {
    this.options = SbLogCoreOptions.merge(options);
  }

  /**
   * Builds the log. Since this is a core class, the class itself does not log
   * anything.
   * @returns {Array} An empty array.
   */
  build() {return []}

  /**
   * Logs each line of the Array returned by the `SbLogCore.build` method
   * to the console. The prelog method from the options will be applied to the
   * lines before logging.
   * @param {Array<string>} strings The Array to be logged to the console.
   */
  log(strings) {
    this.options.prelog(this.build(strings)).forEach(line => console.log(line));
  }
}

module.exports = {
  SbLogCore
}
