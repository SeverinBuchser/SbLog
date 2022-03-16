# sb-log.log.table.module:class
## Classes
### SbLogTable
A class used to log multiple strings in a table layout. Each of the strings has its own logger.
```js
class SbLogTable {
	constructor(options);
	buildLogs();
}
```
#### Functions
##### `buildLogs()`
Builds logs Array of the parent class `SbLogVertical`. The options contain an Array with rows, which each contain an Array with columns. So for each row a `SbLogHorizontal` gets built which consists out of `SbLogBlock`, the columns. The options for each log, are contained within the options.
| Parameters | - |  | 
| --- | --- | --- |
| **Returns** | `void` | 

