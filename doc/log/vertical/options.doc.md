# sb-log.log.vertical.module:options
## Classes
### SbLogVerticalOptions
Describes the options which a `SbLogVertical` object can take.
```js
class SbLogVerticalOptions {
	constructor(separatorBuilder);
	@override static merge(options, defaults);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `static defaults` | `SbLogVerticalOptions` | Default options. | 
| `separatorBuilder` | `function` | The function to build the separator string, which vertically separates the logs. | 

#### Functions
##### `@override static merge(options, defaults)`
Merges options width default options. If the default options are not undefined, the `SbLogHorizontalOptions.defaults` member gets used as the default options.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | Any options object. | 
| `defaults` | `object` | The defaults options. | 
| **Returns** | `object` | The merged options. | 

