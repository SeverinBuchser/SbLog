# sb-log.log.horizontal.module:options
## Classes
### SbLogHorizontalOptions
Describes the options which a `SbLogHorizontal` object can take.
```js
class SbLogHorizontalOptions {
	constructor(separator);
	@override static merge(options, defaults);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `static defaults` | `SbLogHorizontalOptions` | Default options. | 
| `separator` | `string` | The separator string to separate the logs. | 

#### Functions
##### `@override static merge(options, defaults)`
Merges options width default options. If the default options are not undefined, the `SbLogHorizontalOptions.defaults` member gets used as the default options. If the separator value in the options is a number, the method will replace the separator value with a string containing the number of spaces which is specified by the original value.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | Any options object. | 
| `defaults` | `object` | The defaults options. | 
| **Returns** | `object` | The merged options. | 

