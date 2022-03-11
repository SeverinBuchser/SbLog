/**
 * SbLogTable class module.
 * @module SbLogTable
 */

const { SbLogBlock } = require('../block');
const { SbLogHorizontal } = require('../horizontal');
const { SbLogVertical } = require('../vertical');
const { SbLogTableOptions } = require('./log-table-options');

/**
 * @classdesc A class used to log multiple strings in a table layout. Each of
 * the strings has its own logger.
 */
class SbLogTable extends SbLogVertical {
  /**
   * Instantiates a new {@link SbLogTable} object with the appropriate options.
   * The logs get constructed according to the options.
   * @param {Array<SbLogCore>} logs The loggers, used to log each string.
   * @param {SbLogHorizontalOptions} options The options.
   */
  constructor(options) {
    super([], SbLogTableOptions.merge(options));
    this.buildLogs();
  }

  /**
   * Builds logs Array of the parent class {@link SbLogVertical}. The options
   * contain an Array with rows, which each contain an Array with columns. So
   * for each row a {@link SbLogHorizontal} gets built which consists out of
   * [SbLogBlocks]{@link SbLogBlock}, the columns. The options for each log, are
   * contained within the options.
   */
  buildLogs() {
    this.logs = this.options.rows.map(row => {
      return new SbLogHorizontal(row.columns.map(column => {
        return new SbLogBlock(column);
      }), row)
    })
  }
}

module.exports = SbLogTable;
