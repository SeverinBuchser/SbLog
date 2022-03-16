# sb-log.log.table.module:options
## Classes
### SbLogTableOptions
Describes the options which a `SbLogTable` object can take.
```js
class SbLogTableOptions {
	constructor(rows, rowNumber, columnNumber);
	@override static merge(options, defaults);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `static defaults` | `SbLogTableOptions` | Default options. | 
| `rows` | `Array<SbLogTableRowOptions>` | The rows of the log. | 
| `rowNumber` | `number` | The number of rows. | 
| `columnNumber` | `number` | The number of columns. | 

#### Functions
##### `@override static merge(options, defaults)`
Merges options width default options. If the default options are not undefined, the `SbLogHorizontalOptions.defaults` member gets used as the default options. If both the rowNumber and columnNumber options are set the method builds rows based on default row and column options. If not, the method merges each of the row options with the default row options.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | Any options object. | 
| `defaults` | `object` | The defaults options. | 
| **Returns** | `object` | The merged options. | 

### SbLogTableRowOptions
Describes the options which a row of the `SbLogTable` object can take.
```js
class SbLogTableRowOptions {
	constructor(columns, separator);
	@override static merge(options, defaults);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `static defaults` | `SbLogTableRowOptions` | Default options. | 
| `columns` | `Array<object>` | The columns of the log. | 
| `separator` | `string` | The horizontal separator of the log. | 

#### Functions
##### `@override static merge(options, defaults)`
Merges options width default options. If the default options are not undefined, the `SbLogHorizontalOptions.defaults` member gets used as the default options. If the separator value in the options is a number, the method will replace the separator value with a string containing the number of spaces which is specified by the original value. If the type of the columns is a number, the method creates as many default columns as the columns value suggests.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | Any options object. | 
| `defaults` | `object` | The defaults options. | 
| **Returns** | `object` | The merged options. | 

