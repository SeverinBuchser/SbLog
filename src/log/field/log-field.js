const { SbLogTable, SbLogTableOptions } = require('../table');
const { none } = require('../../separator');
const fieldTransform = require('./field-transform');
const fieldConfig = require('./field-config');

class SbLogField extends SbLogTable {

  constructor(config) {
    super();

    if (fieldConfig.hasOwnProperty(config)) {
      this.config = fieldConfig[config];
    } else {
      this.config = config;
    }
  }

  getRowNumber(inputFields) {
    return inputFields.reduce((rowNumber, inputField) => {
      if (Array.isArray(inputField)) {
        return Math.max(rowNumber, inputField.length);
      } else return Math.max(rowNumber, 1);
    }, 0);
  }

  transformFields(inputFields) {
    let rowNumber = this.getRowNumber(inputFields);

    if (!this.config.multiple && rowNumber > 1) {
      throw new Error('Multiple field rows are not allowed!');
    } else if (!this.config.multiple || this.config.multiple && rowNumber == 1) {
      inputFields = inputFields.map(inputField => [inputField]);
    }

    let inputFieldIndex = 0;
    let fieldsRows = [];
    for (let row = 0 ; row < rowNumber ; row++) {
      fieldsRows.push([]);
    }
    this.config.fields.forEach(configField => {
      let inputField = inputFields[inputFieldIndex];
      if (configField.hasOwnProperty("readonly")) {
        for (let row = 0 ; row < rowNumber ; row++) {
          fieldsRows[row].push(configField.name);
        }
      } else {
        if (
          !Array.isArray(inputField) && configField.allowToDuplicate
        ) {
          for (let row = 0 ; row < rowNumber ; row++) {
            fieldsRows[row].push(inputField);
          }
        } else if (Array.isArray(inputField) && inputField.length == rowNumber) {
          for (let row = 0 ; row < rowNumber ; row++) {
            fieldsRows[row].push(inputField[row]);
          }
        } else {
          throw new Error('Input field either needs to be an array with the same length as every other array or a string!')
        }
        inputFieldIndex++;
      }
    })
    return fieldsRows;
  }

  buildOptions(fields) {
    let fieldsRows = this.transformFields(fields).map(fieldsRow => {
      return fieldsRow.map((fieldRow, fieldIndex) => {
        let configField = this.config.fields[fieldIndex];
        if (configField.hasOwnProperty("transform")) {
          let transform = fieldTransform[configField.transform];
          return transform(fieldRow);
        } else return fieldRow;
      })
    })

    let fieldsRowsWidths = fieldsRows.reduce((widths, fieldsRow) => {
      if (widths.length != fieldsRow.length) {
        return fieldsRow.map(fieldRow => fieldRow.length)
      }
      return fieldsRow.map((fieldRow, index) => Math.max(widths[index], fieldRow.length))
    }, [])

    let rows = fieldsRows.map(fieldsRow => {
      let columns = [{
        format: this.config.format,
        width: 8
      }]

      columns.push(...this.config.fields.map((configField, index) => {
        let options = {
          width: fieldsRowsWidths[index]
        };
        if (configField.hasOwnProperty("format")) {
          options.format = configField["format"];
        }
        return options;
      }))

      return {columns, separator: ' '};
    })

    fieldsRows.forEach((fieldsRow, index) => {
      fieldsRow.splice(0, 0, index == 0 ? this.config.name : '');
    })

    this.options = SbLogTableOptions.merge({
      rows,
      separatorBuilder: none,
      prelog: lines => lines
    });
    return fieldsRows;
  }

  build(fields) {
    fields = this.buildOptions(fields);
    this.buildLogs();
    return super.build(fields);
  }

  log(...fields) {
    this.build(fields).forEach(line => console.log(line));
  }

}

module.exports = SbLogField;
