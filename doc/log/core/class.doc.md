# sb-log.log.core.module:class
## Classes
### SbLogCore
A core class, which is used by all log classes to unify the logging process.
```js
class SbLogCore {
	constructor(options);
	build();
	log(strings);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `options` | `SbLogCoreOptions` | The options. | 

#### Functions
##### `build()`
Builds the log. Since this is a core class, the class itself does not log anything.
| Parameters | - |  | 
| --- | --- | --- |
| **Returns** | `Array` | An empty array. | 

##### `log(strings)`
Logs each line of the Array returned by the `SbLogCore.build` method to the console. The prelog method from the options will be applied to the lines before logging.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `strings` | `Array<string>` | The Array to be logged to the console. | 
| **Returns** | `void` | 

