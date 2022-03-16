# sb-log.log.horizontal.module:class
## Classes
### SbLogHorizontal
A class used to log multiple strings side by side. Each of the strings has its own logger.
```js
class SbLogHorizontal {
	constructor(logs, options);
	@override build(strings);
	joinLines(allLines);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `logs` | `Array<SbLogCore>` | The loggers, used to log each string. | 
| `separatorWidth` | `number` | The width of the separator string. | 

#### Functions
##### `@override build(strings)`
Builds the log by building each of the loggers with its dedicated string. This means that the strings Array parameter must have the same length as the logs Array. After each log gets built, the lines get joined. Each line of each logger gets appended to the right of the previous logger.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `strings` | `Array<string>` | The strings to convert. | 
| **Returns** | `SbLines` | The lines block created out of the strings. | 

##### `joinLines(allLines)`
Combines all the lines into one single Array of strings. The strings of each Array get concatenated into one string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `allLines` | `Array<Array<string>>` | The lines to combine. | 
| **Returns** | `Array<string>` | The combined lines. | 

