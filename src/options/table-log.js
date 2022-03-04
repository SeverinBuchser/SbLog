const SbVerticalLogOptions = require('./vertical-log');
const SbHorizontalLogOptions = require('./horizontal-log');
const { border } = require('./prelog');
const { line } = require('./separator');


class SbTableLogOptions extends SbVerticalLogOptions {
  static defaults = new SbTableLogOptions([], undefined, undefined, line(), border())

  constructor(rows, rowNumber, columnNumber, separatorBuilder, prelog) {
    super(separatorBuilder, prelog);
    this.rows = rows;
    this.rowNumber = rowNumber;
    this.columnNumber = columnNumber;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbTableLogOptions.defaults);
    options = super.getOptions(options, defaults);
    if (!options.rowNumber || !options.columnNumber) {

      super.mergeKeys([
        'rows'
      ], options, defaults);

      options.rows = options.rows.map(row => {
        return SbTableLogRowOptions.merge(row);
      })
    } else { // if rowNumber and columnNumber are both set, ignore the rows
      options.rows = [];
      for (let row = 0 ; row < options.rowNumber ; row ++) {
        let rowOptions = SbTableLogRowOptions.defaults;
        rowOptions.columns = options.columnNumber;
        options.rows.push(SbTableLogRowOptions.merge(rowOptions));
      }
    }
    return super.merge(options, defaults);
  }
}


class SbTableLogRowOptions extends SbHorizontalLogOptions {
  static defaults = new SbTableLogRowOptions([], ' \u2502 ');

  constructor(columns, separator) {
    super(separator);
    this.columns = columns;
  }

  static merge(options, defaults) {
    defaults = super.getDefaults(defaults, SbTableLogRowOptions.defaults);
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
  SbTableLogOptions,
  SbTableLogRowOptions
};
