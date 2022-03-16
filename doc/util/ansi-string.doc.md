# sb-log.util.module:ansi-string
## Classes
### SbAnsiString
A string which works with ANSI-escape-characters. The goal of the class is to work with a string, which has ANSI-characters and to not interfere with these.
```js
class SbAnsiString {
	constructor(string);
	substring(indexA, indexB);
	static strip(string);
	static strippedLength(string);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `string` | `string` | The original string. | 
| `length` | `number` | The length of the string including the ANSI-characters. | 
| `strippedLength` | `number` | The length of the string excluding the ANSI-characters. | 
| `stripped` | `string` | The string stripped of its ANSI-characters. | 

#### Functions
##### `substring(indexA, indexB)`
Returns a substring, of the original string. The indexing does account for the ANSI-characters, which means, that the indexing excludes the ANSI- characters.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `indexA` | `number` | The start index of the substring. | 
| `indexB` | `number` | The end index of the substring. | 
| **Returns** | `string` | The substring of the stripped string including the ANSI- charachters. | 

##### `static strip(string)`
Strips a string of its ANSI-characters.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `string` | `string` | The string to strip. | 
| **Returns** | `string` | The the stripped string excluding the ANSI-charachters. | 

##### `static strippedLength(string)`
Calculates the length of a string excluding the ANSI-characters.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `string` | `string` | The string get the stripped length from. | 
| **Returns** | `number` | The length of the string excluding the ANSI-characters. | 

