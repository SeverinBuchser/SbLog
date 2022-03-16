/**
 * @module sb-log.util.whitespace
 */

const { SbAnsiString } = require('./ansi-string');

/**
 * Removes any whitespace at the end of a string.
 * @param {string | SbVerticalString} string The string to remove the whitespace
 * from.
 * @returns {string | SbVerticalString} The new trimmed string or vertical
 * string.
 */
function trimTrailing(string) {
  return string.replace(/\s+$/, '');
}

/**
 * Adds spaces to the end of a string to reach the specified width. This method
 * uses `SbAnsiString` to get the width without the ANSI-characters.
 * @param {string | SbVerticalString} string The string to remove the whitespace
 * from.
 * @param {number} width The width of the final string.
 * @returns {string | SbVerticalString} The new filled string or vertical
 * string.
 */
function fillTrailing(string, width) {
  let lengthDifference = width - SbAnsiString.strippedLength(string);
  if (lengthDifference < 0) throw new Error("String already exeeded length!");
  return string + ' '.repeat(lengthDifference);
}

module.exports = {
  trimTrailing,
  fillTrailing
}
