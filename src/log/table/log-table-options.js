const { SbLogVerticalOptions } = require('../vertical');
const { SbLogHorizontalOptions } = require('../horizontal');
const { border } = require('../../prelog');
const { vLine } = require('../../separator');


class SbLogTableOptions extends SbLogVerticalOptions {
  static defaults = new SbLogTableOptions([], undefined, undefined, vLine(), border())

  constructor(rows, rowNumber, columnNumber, separatorBuilder, prelog) {
    super(separatorBuilder, prelog);
    this.rows = rows;
    this.rowNumber = rowNumber;
    this.columnNumber = columnNumber;
  }

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


class SbLogTableRowOptions extends SbLogHorizontalOptions {
  static defaults = new SbLogTableRowOptions([], ' \u2502 ');

  constructor(columns, separator) {
    super(separator);
    this.columns = columns;
  }

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
