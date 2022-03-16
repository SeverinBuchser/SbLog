# sb-log.log.core.module:options
## Classes
### SbLogCoreOptions
Describes the options which a `SbLogCore` object can take.
```js
class SbLogCoreOptions extends SbOptions {
	constructor(prelog);
	@override static merge(options, defaults);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `static defaults` | `SbLogCoreOptions` | Default options. | 
| `prelog` | `function` | The function which gets applied to the lines, before logging them to the console. | 

#### Functions
##### `@override static merge(options, defaults)`
Merges options width default options. If the default options are not undefined, the `SbLogCoreOptions.defaults` member gets used as the default options.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | Any options object. | 
| `defaults` | `object` | The defaults options. | 
| **Returns** | `object` | The merged options. | 

