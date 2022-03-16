/**
 * @module sb-log.format
 * @see {@link https://www.npmjs.com/package/chalk}
 */

const chalk = require('chalk');

/**
 * Applies no format.
 * @static
 * @function none
 * @param {string} string The input string.
 * @returns {string} The same unaltered string.
 */
module.exports.none = string => string;

/**
 * Applies a bold format.
 * @static
 * @function bold
 * @param {string} string The string to format.
 * @returns {string} The bold string.
 */
module.exports.bold = chalk.bold;

/**
 * Applies a bright-cyan and bold format.
 * @static
 * @function primary
 * @param {string} string The string to format.
 * @returns {string} The bright-cyan and bold string.
 */
module.exports.primary = chalk.cyanBright.bold;

/**
 * Applies a bright-magenta and bold format.
 * @static
 * @function secondary
 * @param {string} string The string to format.
 * @returns {string} The bright-magenta and bold string.
 */
module.exports.secondary = chalk.magentaBright.bold;

/**
 * Applies a bright-green and bold format.
 * @static
 * @function success
 * @param {string} string The string to format.
 * @returns {string} The bright-green and bold string.
 */
module.exports.success = chalk.greenBright.bold;

/**
 * Applies a bright-yellow and bold format.
 * @static
 * @function warn
 * @param {string} string The string to format.
 * @returns {string} The bright-yellow and bold string.
 */
module.exports.warn = chalk.yellowBright.bold;

/**
 * Applies a bright-red and bold format.
 * @static
 * @function fail
 * @param {string} string The string to format.
 * @returns {string} The bright-red and bold string.
 */
module.exports.fail = chalk.redBright.bold;
