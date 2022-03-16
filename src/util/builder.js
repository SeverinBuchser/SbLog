/**
 * @module sb-log.util.builder
 */

const { SbVerticalString } = require('./vertical-string');
const lineConfig = require('../line-config');

/**
 * Builds a string of the specified length consisting out of only one type of
 * character, specified by the config.
 * @param {number} width The width of the string.
 * @param {string} config The line config to use.
 * @returns {string} The string with the specified width and character of the
 * speficied config.
 * @see {@link lineConfig}
 */
function buildHs(width, config) {
  return lineConfig[config].h.repeat(width)
}

/**
 * Builds a `SbVerticalString` of the specified height consisting out of
 * only one type of character, specified by the config.
 * @param {number} height The height of the string.
 * @param {string} config The line config to use.
 * @returns {string} The string with the specified height and character of the
 * speficied config.
 * @see {@link lineConfig}
 */
function buildVs(height, config) {
  return new SbVerticalString(lineConfig[config].v.repeat(height).split(''))
}

module.exports = {
  buildHs,
  buildVs
}
