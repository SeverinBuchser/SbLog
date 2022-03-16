/**
 * @module sb-log.log.field.field-transform
 */

const fns = require('date-fns');

/**
 * Formats the given date into 'HH:mm:ss'. For example if a date has hour 1,
 * minute 10 and second 50, the final format will be '01:10:50'.
 * @param {Date} date The date to format.
 * @returns {string} The formatted date.
 */
function toTime(date) {
  return fns.format(date, 'HH:mm:ss')
}

module.exports = {
  toTime
}
