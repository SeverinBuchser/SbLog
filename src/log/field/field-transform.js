const fns = require('date-fns');

function toTime(date) {
  return fns.format(date, 'HH:mm:ss')
}

module.exports = {
  toTime
}
