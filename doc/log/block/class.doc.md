# sb-log.log.block.module:class
## Classes
### SbLogBlock
A class used to log a single string in form of `SbLines` or build the the lines block.
```js
class SbLogBlock extends SbLogCore {
	constructor(options);
	@override build(string);
}
```
#### Functions
##### `@override build(string)`
Builds the log by converting the string into a `SbLines` block.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `string` | `string` | The string to convert. | 
| **Returns** | `SbLines` | The lines block created out of the string. | 

