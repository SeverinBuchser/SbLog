const SbLogCore = require('./log-core');
const SbLog = require('./log');
const SbHorizontalLog = require('./horizontal-log');
const SbVerticalLog = require('./vertical-log');
const clone = require('clone');
const { border } = require('./prelog');
const { verticalLine } = require('./separator');

const defaultRowOptions = {
  columns: [],
  separator: ' | '
}

const defaultTableLogOptions = {
  rows: [],
  rowNumber: undefined,
  columnNumber: undefined,
  separatorBuilder: verticalLine(),
  prelog: border()
}

function mergeWithDefaultRowOptions(options) {
  if (options) {
    if (!options.columns) {
      options.columns = defaultRowOptions.columns;
    }
    if (typeof options.columns == 'number') {
      let numCols = options.columns;
      options.columns = [];
      for (let i = 0 ; i < numCols ; i++) {
        options.columns.push({})
      }

    }
    if (!options.separator) {
      options.separator = defaultRowOptions.separator;
    }
    return options;
  } else return defaultRowOptions;
}

function mergeWithDefaultTableLogOptions(options) {
  if (options) {
    if (!options.rowNumber || !options.columnNumber) {
      if (!options.rows) {
        options.rows = defaultTableLogOptions.rows;
      }
      options.rows = options.rows.map(row => {
        return clone(mergeWithDefaultRowOptions(row));
      })
    } else { // if rowNumber and columnNumber are both set, ignore the rows
      options.rows = [];
      for (let row = 0 ; row < options.rowNumber ; row ++) {
        let rowOptions = clone(defaultRowOptions);
        rowOptions.columns = options.columnNumber;
        options.rows.push(mergeWithDefaultRowOptions(rowOptions));
      }
    }

    if (!options.separatorBuilder) {
      options.separatorBuilder = defaultTableLogOptions.separatorBuilder;
    }
    if (!options.prelog) {
      options.prelog = defaultTableLogOptions.prelog;
    }
    return options;
  } else return defaultTableLogOptions;
}

class SbTableLog extends SbVerticalLog {
  constructor(options) {
    super([], clone(mergeWithDefaultTableLogOptions(options)));
    this.buildLoggers();
  }

  buildLoggers() {
    this.logs = this.options.rows.map(row => {
      return new SbHorizontalLog(row.columns.map(column => {
        return new SbLog(column);
      }), row)
    })
  }
}

module.exports = SbTableLog;
