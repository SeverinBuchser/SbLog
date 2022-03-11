/**
 * SbLogField class module.
 * @module SbLogField
 */

const { SbLogTable, SbLogTableOptions } = require('../table');
const separator = require('../../separator');
const fieldTransform = require('./field-transform');
const fieldConfig = require('./field-config');

/**
 * @classdesc A class used to log different strings in a specific configuration.
 * The configuration has a name and different fields, which are logged using a
 * log table. The configuration can take the field 'multiple'. If this field is
 * set to true, each field can have multiple entries. If the config has a format
 * propperty, the format gets applied to the name. The then has a propperty
 * fields. The fields propperty contains an array of field configurations. These
 * configurations can be a string, which then takes a default configuration. If
 * the configuration for a field is supplied, the config will be taken. This
 * config must have a name. It then can have the readOnly propperty, which is
 * tells the builder to not allow inputs for this field but to display the name
 * of the field as output. Another propperty is the transform one, which is a
 * function of a predefined one, selected by string. A field can also be
 * formatted by setting a format attribute.
 */
class SbLogField extends SbLogTable {

  /**
   * Instantiates a new {@link SbLogField} object with the appropriate config.
   * If the config is predefined, the predefined config will be used otherwise
   * the supplied config will be used. To use a predefined config, the config
   * parameter has to be a string with values matching the names of the configs
   * defined in {@link fieldConfig}.
   * @param {object} config The config.
   */
  constructor(config) {
    super();

    if (fieldConfig.hasOwnProperty(config)) {
      this.config = fieldConfig[config];
    } else {
      this.config = config;
    }
  }

  /**
   * Calculates the row number which are needed to show all the inputfields.
   * Each inputField can be an Array. If so, the length of that array is the row
   * number for that field. The rowNumber is now the maximum of the rowNumbers.
   * @param {Array<Array<any> | any>} inputFields The field values.
   * @return {number} The row number.
   */
  getRowNumber(inputFields) {
    return inputFields.reduce((rowNumber, inputField) => {
      if (Array.isArray(inputField)) {
        return Math.max(rowNumber, inputField.length);
      } else return Math.max(rowNumber, 1);
    }, 0);
  }

  /**
   * Builds the fieldsRows. Each field gets configured according to the config.
   * @param {Array<Array<any> | any>} inputFields The field values.
   * @return {number} The row number.
   */
  buildFieldsRows(inputFields) {
    let rowNumber = this.getRowNumber(inputFields);

    // If the row number is greater than one and the multiple field is set an
    // error gets thrown, since this is not allowed. Else if the multiple field
    // is set and the row number is equal to one, the input is different and the
    // input has to be transformed. The same applies, if the multiple field is
    // not set. The input in the case where the input is different, the input
    // is an Array of strings. In the other case, the input is an Array of an
    // Arrays of strings.
    if (!this.config.multiple && rowNumber > 1) {
      throw new Error('Multiple field rows are not allowed!');
    } else if (!this.config.multiple || this.config.multiple && rowNumber == 1) {
      inputFields = inputFields.map(inputField => [inputField]);
    }

    // build the structure for the new fields
    let inputFieldIndex = 0;
    let fieldsRows = [];
    for (let row = 0 ; row < rowNumber ; row++) {
      fieldsRows.push([]);
    }

    this.config.fields.forEach(configField => {
      // get the input (Array)
      let inputField = inputFields[inputFieldIndex];

      // when readonly is set, the name of the configField gets copied to all
      // rows
      if (configField.hasOwnProperty("readonly") && configField.readonly) {
        for (let row = 0 ; row < rowNumber ; row++) {
          fieldsRows[row].push(configField.name);
        }
      } else {
        if (Array.isArray(inputField) && inputField.length == rowNumber) {
          // add the inputs to the rows
          for (let row = 0 ; row < rowNumber ; row++) {
            fieldsRows[row].push(inputField[row]);
          }
        } else {
          throw new Error('Input field either needs to be an array with the' +
            'same length as every other array!');
        }
        inputFieldIndex++;
      }
    })
    return fieldsRows;
  }

  /**
   * Applies the transformations to each field with the specified transformation
   * in the configuration. If the transofm property is set, the field gets
   * transformed. The field can either be a string or a function returning a
   * string. If its a string, the function with that name will be looked up.
   * @param {Array<Array<any>>} fieldsRows The rows for each field.
   * @return {Array<Array<string>>} The transormed fields.
   * @see {@link fieldTransform}
   */
  transformFields(fieldsRows) {
    return fieldsRows.map(fieldsRow => {
      return fieldsRow.map((fieldRow, fieldIndex) => {
        let configField = this.config.fields[fieldIndex];
        if (configField.hasOwnProperty("transform")) {
          if (fieldTransform.hasOwnProperty(configField.transform)) {
            let transform = fieldTransform[configField.transform];
            return transform(fieldRow);
          } else {
            return configField.transform(fieldRow);
          }
        } else return fieldRow;
      })
    })
  }

  /**
   * Calculates the width of each field. The width will be the maximum length
   * of all strings in that field column.
   * @param {Array<Array<string>>} fieldsRows The rows for each field.
   * @return {Array<number>} The widths of each field.
   */
  buildFieldsRowsWidths(fieldsRows) {
    return fieldsRows.reduce((widths, fieldsRow) => {
      if (widths.length != fieldsRow.length) {
        return fieldsRow.map(fieldRow => fieldRow.length)
      }
      return fieldsRow.map((fieldRow, index) => Math.max(widths[index], fieldRow.length))
    }, [])
  }

  /**
   * Builds the rows options.
   * @param {Array<Array<string>>} fieldsRows The rows for each field.
   * @param {Array<number>} fieldsRowsWidths The widths of each field.
   * @return {Array<SbLogTableRowOptions>} The row options.
   */
  buildRows(fieldsRows, fieldsRowsWidths) {
    return fieldsRows.map(() => {
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
  }

  /**
   * Builds the options and the fields from the inputs.
   * @param {Array<Array<any> | any>} fields The field values.
   * @return {Array<Array<string>>} The row options.
   */
  buildOptions(fields) {
    let fieldsRows = this.transformFields(this.buildFieldsRows(fields));
    let fieldsRowsWidths = this.buildFieldsRowsWidths(fieldsRows);

    // prepends the config name to the fields
    fieldsRows.forEach((fieldsRow, index) => {
      fieldsRow.splice(0, 0, index == 0 ? this.config.name : '');
    })

    this.options = SbLogTableOptions.merge({
      rows: this.buildRows(fieldsRows, fieldsRowsWidths),
      separatorBuilder: separator.none,
      prelog: lines => lines
    });
    return fieldsRows;
  }

  /**
   * Builds the log by first building the options and also the fields from the
   * input.
   * @param {Array<Array<any> | any>} fields The field values.
   * @returns {SbLines} The lines block created out of the strings.
   * @override
   */
  build(fields) {
    fields = this.buildOptions(fields);
    this.buildLogs();
    return super.build(fields);
  }

  /**
   * Logs the line block built by the build method to the console.
   * @param {Array<Array<any> | any>} fields The field values.
   * @override
   */
  log(...fields) {
    this.build(fields).forEach(line => console.log(line));
  }

}

module.exports = SbLogField;
