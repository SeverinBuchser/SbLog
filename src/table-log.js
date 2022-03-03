const SbLog = require('./log');
const SbHorizontalLog = require('./horizontal-log');
const SbVerticalLog = require('./vertical-log');
const { SbTableLogOptions } = require('./options');

class SbTableLog extends SbVerticalLog {
  constructor(options) {
    super([], SbTableLogOptions.merge(options));
    this.buildLogs();
  }

  buildLogs() {
    this.logs = this.options.rows.map(row => {
      return new SbHorizontalLog(row.columns.map(column => {
        return new SbLog(column);
      }), row)
    })
  }
}

module.exports = SbTableLog;
