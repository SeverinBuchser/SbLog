# sb-log.util.module:vertical-string
## Classes
### SbVerticalString
A string class which manages a vertical string. A vertical string is a string, which stores the characters in a vertical configuration, specifically a Array of strings. Each line of the vertical string has exactly one character. The class provides some functionality like a normal string does.
```js
class SbVerticalString {
	constructor(strings, index);
	get(index);
	match(regexp);
	matchAll(regexp);
	replace(regexp, newSubstrOrFunc);
	concat(...strings);
	substring(indexA, indexB);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `strings` | `Array<string>` | The individual characters. | 
| `string` | `string` | A normal string containing the characters of the vertical string. | 
| `length` | `number` | The length of the vertical string. | 

#### Functions
##### `get(index)`
Gets the character at the speficied index.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `index` | `number` | The index of the character. | 
| **Returns** | `string` | The character at the specified index. | 

##### `match(regexp)`
Matches a regexp to the string. The same functionality and behaviour as a normal string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `regexp` | `RegExp` | The regexp to match the string to. | 
| **Returns** | `RegExpMatchArray` | The result of the match. | 

##### `matchAll(regexp)`
Matches a regexp to the string. This method returns the all matched groups of the string. The same functionality and behaviour as a normal string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `regexp` | `RegExp` | The regexp to match the string to. | 
| **Returns** | `Iterator<RegExpMatchArray>` | The result of the match. | 

##### `replace(regexp, newSubstrOrFunc)`
Replaces parts of the string matching to the regexp with a new string or uses a function to create the new string. Works exactly like the normal string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `regexp` | `RegExp` | A regexp to identitfy the parts of the string to replace. | 
| `newSubstrOrFunc` | `string | function` | The new string or the function to get the new string from. | 
| **Returns** | `SbVerticalString` | A new vertical string with replaced characters. | 

##### `concat(...strings)`
Concatenates new strings or vertical strings and returns a new vertical string. Works exactly like a normal string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `...strings` | `Array<(string|SbVerticalString)>` | The strings or vertical strings to concatenate to this string. | 
| **Returns** | `SbVerticalString` | The new concatenated vertical string. | 

##### `substring(indexA, indexB)`
Creates a new vertical substring from the original vertical string.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `indexA` | `number` | The start index of the substring. | 
| `indexB` | `number` | The end index of the substring. | 
| **Returns** | `SbVerticalString` | The substring of the original vertical string | 

