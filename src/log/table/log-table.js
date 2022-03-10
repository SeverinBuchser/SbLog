const { SbLogBlock } = require('../block');
const { SbLogHorizontal } = require('../horizontal');
const { SbLogVertical } = require('../vertical');
const { SbLogTableOptions } = require('./log-table-options');

class SbLogTable extends SbLogVertical {
  constructor(options) {
    super([], SbLogTableOptions.merge(options));
    this.buildLogs();
  }

  buildLogs() {
    this.logs = this.options.rows.map(row => {
      return new SbLogHorizontal(row.columns.map(column => {
        return new SbLogBlock(column);
      }), row)
    })
  }
}

module.exports = SbLogTable;
