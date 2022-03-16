/**
 * @module sb-log.log.table.class
 */

const { SbLogBlock } = require('../block');
const { SbLogHorizontal } = require('../horizontal');
const { SbLogVertical } = require('../vertical');
const { SbLogTableOptions } = require('./options');

/**
 * A class used to log multiple strings in a table layout. Each of the strings
 * has its own logger.
 */
class SbLogTable extends SbLogVertical {
  /**
   * Instantiates a new `SbLogTable` object with the appropriate options. The
   * logs get constructed according to the options.
   * @param {SbLogHorizontalOptions} options The options.
   */
  constructor(options) {
    super([], SbLogTableOptions.merge(options));
    this.buildLogs();
  }

  /**
   * Builds logs Array of the parent class `SbLogVertical`. The options contain
   * an Array with rows, which each contain an Array with columns. So for each
   * row a `SbLogHorizontal` gets built which consists out of `SbLogBlock`, the
   * columns. The options for each log, are contained within the options.
   */
  buildLogs() {
    this.logs = this.options.rows.map(row => {
      return new SbLogHorizontal(row.columns.map(column => {
        return new SbLogBlock(column);
      }), row)
    })
  }
}

module.exports = {
  SbLogTable
}
