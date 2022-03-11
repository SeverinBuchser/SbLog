/**
 * LogTable options module.
 * @module log-table-options
 */

const { SbLogVerticalOptions } = require('../vertical');
const { SbLogHorizontalOptions } = require('../horizontal');
const prelog = require('../../prelog');
const separator = require('../../separator');
const lineConfig = require('../../line-config');

/**
 * @classdesc Describes the options which a {@link SbLogHorizontal} object can
 * take.
 */
class SbLogTableOptions extends SbLogVerticalOptions {
  /**
   * Default options.
   * @see {@link separator}
   * @see {@link prelog}
   */
  static defaults = new SbLogTableOptions(
    [],
    undefined,
    undefined,
    separator.vLine(),
    prelog.border()
  )

  /**
   * Instantiates a new {@link SbLogTableOptions} object.
   * @param {Array<object>} rows The rows of the log.
   * @param {number} rowNumber The number of rows.
   * @param {number} columnNumber The number of column.
   */
  constructor(rows, rowNumber, columnNumber, separatorBuilder, prelog) {
    super(separatorBuilder, prelog);
    this.rows = rows;
    this.rowNumber = rowNumber;
    this.columnNumber = columnNumber;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLogHorizontalOptions.defaults} member gets used as
   * the default options. If both the rowNumber and columnNumber options are set
   * the method builds rows based on default row and column options. If not, the
   * method merges each of the row options with the default row options.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogTableOptions.defaults);
    options = super.getOptions(options, defaults);
    if (!options.rowNumber || !options.columnNumber) {

      super.mergeKeys([
        'rows'
      ], options, defaults);

      options.rows = options.rows.map(row => {
        return SbLogTableRowOptions.merge(row);
      })
    } else { // if rowNumber and columnNumber are both set, ignore the rows
      options.rows = [];
      for (let row = 0 ; row < options.rowNumber ; row ++) {
        let rowOptions = SbLogTableRowOptions.defaults;
        rowOptions.columns = options.columnNumber;
        options.rows.push(SbLogTableRowOptions.merge(rowOptions));
      }
    }
    return super.merge(options, defaults);
  }
}

/**
 * @classdesc Describes the options which a row of the {@link SbLogHorizontal}
 * object can take.
 */
class SbLogTableRowOptions extends SbLogHorizontalOptions {
  /**
   * Default options.
   * @see {@link lineConfig}
   */
  static defaults = new SbLogTableRowOptions([], ' ' + lineConfig.solid.v + ' ');

  /**
   * Instantiates a new {@link SbLogTableRowOptions} object.
   * @param {Array<object>} columns The columns of the log.
   * @param {string} separator The horizontal separator of the log.
   */
  constructor(columns, separator) {
    super(separator);
    this.columns = columns;
  }

  /**
   * Merges options width default options. If the default options are not
   * undefined, the {@link SbLogHorizontalOptions.defaults} member gets used as
   * the default options. If the separator value in the options is a number, the
   * method will replace the separator value with a string containing the number
   * of spaces which is specified by the original value. If the type of the
   * columns is a number, the method creates as many default columns as the
   * columns value suggests.
   * @param {object} options Any options object.
   * @param {object} defaults The defaults options.
   * @returns {object} The merged options.
   */
  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbLogTableRowOptions.defaults);
    options = super.getOptions(options, defaults);

    super.mergeKeys([
      'columns'
    ], options, defaults);

    if (typeof options.columns == 'number') {
      let numCols = options.columns;
      options.columns = [];
      for (let i = 0 ; i < numCols ; i++) {
        options.columns.push({})
      }

    }
    return super.merge(options, defaults);
  }
}


module.exports = {
  SbLogTableOptions,
  SbLogTableRowOptions
};
