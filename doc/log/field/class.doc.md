# sb-log.log.field.module:class
## Classes
### SbLogField
A class used to log different strings in a specific configuration. The configuration has a name and different fields, which are logged using a log table. The configuration can take the field `multiple`. If this field is set to true, each field can have multiple entries. If the config has a format propperty, the format gets applied to the name. The then has a propperty fields. The fields propperty contains an array of field configurations. These configurations can be a string, which then takes a default configuration. If the configuration for a field is supplied, the config will be taken. This config must have a name. It then can have the readOnly propperty, which is tells the builder to not allow inputs for this field but to display the name of the field as output. Another propperty is the transform one, which is a function of a predefined one, selected by string. A field can also be formatted by setting a format attribute.
```js
class SbLogField extends SbLogTable {
	constructor(config);
	getRowNumber(inputFields);
	buildFieldsRows(inputFields);
	transformFields(fieldsRows);
	buildFieldsRowsWidths(fieldsRows);
	buildRows(fieldsRows, fieldsRowsWidths);
	buildOptions(fields);
	@override build(fields);
	@override log(...fields);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `config` | `object` | The configuration to use. | 

#### Functions
##### `getRowNumber(inputFields)`
Calculates the row number which are needed to show all the inputfields. Each inputField can be an Array. If so, the length of that array is the row number for that field. The rowNumber is now the maximum of the rowNumbers.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `inputFields` | `Array<(Array<any>|any)>` | The field values. | 
| **Returns** | `number` | The row number. | 

##### `buildFieldsRows(inputFields)`
Builds the fieldsRows. Each field gets configured according to the config.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `inputFields` | `Array<(Array<any>|any)>` | The field values. | 
| **Returns** | `number` | The row number. | 

##### `transformFields(fieldsRows)`
Applies the transformations to each field with the specified transformation in the configuration. If the transofm property is set, the field gets transformed. The field can either be a string or a function returning a string. If its a string, the function with that name will be looked up.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `fieldsRows` | `Array<Array<any>>` | The rows for each field. | 
| **Returns** | `Array<Array<string>>` | The transormed fields. | 

##### `buildFieldsRowsWidths(fieldsRows)`
Calculates the width of each field. The width will be the maximum length of all strings in that field column.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `fieldsRows` | `Array<Array<string>>` | The rows for each field. | 
| **Returns** | `Array<number>` | The widths of each field. | 

##### `buildRows(fieldsRows, fieldsRowsWidths)`
Builds the rows options.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `fieldsRows` | `Array<Array<string>>` | The rows for each field. | 
| `fieldsRowsWidths` | `Array<number>` | The widths of each field. | 
| **Returns** | `Array<SbLogTableRowOptions>` | The row options. | 

##### `buildOptions(fields)`
Builds the options and the fields from the inputs.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `fields` | `Array<(Array<any>|any)>` | The field values. | 
| **Returns** | `Array<Array<string>>` | The row options. | 

##### `@override build(fields)`
Builds the log by first building the options and also the fields from the input.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `fields` | `Array<(Array<any>|any)>` | The field values. | 
| **Returns** | `SbLines` | The lines block created out of the strings. | 

##### `@override log(...fields)`
Logs the line block built by the build method to the console.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `...fields` | `Array<(Array<any>|any)>` | The field values. | 
| **Returns** | `void` | 

