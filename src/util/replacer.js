/**
 * @module sb-log.util.replacer
 */

/**
 * Replaces characters of a string, a `SbVerticalString` or a `SbAnsiString` at
 * specific indices with the specified character.
 * @param {string} string The string to replace the characters at the specified
 * indices.
 * @param {Array<number>} indices The indices where to replace a character.
 * @param {string} character The character which gets inserted at the indices.
 * @returns {string | SbVerticalString | SbAnsiString} The string to which the
 * replacements have been applied.
 */
function replace(string, indices, character) {
  indices.forEach(index => {
    string = string.substring(0, index).concat(character).concat(string.substring(index + 1));
  })
  return string;
}

module.exports = {
  replace
}
