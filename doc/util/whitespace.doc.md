# sb-log.util.module:whitespace
## Functions
##### `trimTrailing(string)`
Removes any whitespace at the end of a string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `string` | `string | SbVerticalString` | The string to remove the whitespace from. | 
| **Returns** | `string | SbVerticalString` | The new trimmed string or vertical string. | 

##### `fillTrailing(string, width)`
Adds spaces to the end of a string to reach the specified width. This method uses `SbAnsiString` to get the width without the ANSI-characters.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `string` | `string | SbVerticalString` | The string to remove the whitespace from. | 
| `width` | `number` | The width of the final string. | 
| **Returns** | `string | SbVerticalString` | The new filled string or vertical string. | 

