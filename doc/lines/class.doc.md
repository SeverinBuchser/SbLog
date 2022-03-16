# sb-log.lines.module:class
## Classes
### SbLines
A class used to store strings in form of an array. The class manages the insertion and overall manipulation of the strings. The main difficulty, when managing strings with specific lengths are zero-width characters, specifically with console outputs, having ANSI-escape-characters in the strings.
```js
class SbLines extends Array {
	toArray();
	setOptions(options);
	addMarginLeft(margin);
	addMarginRight(margin);
	addMarginTop(margin);
	addMarginBottom(margin);
	pushFormatted(...lines);
	pushUnformatted(...lines);
	formatLineIncludeWhitespace(lineIndex);
	formatLineExcludeWhitespace(lineIndex);
	isEmptyLine(line);
	spliceVertical(start, deleteCount, ...strings);
	static getTotalHeight(allLines);
	static getMaxHeight(allLines);
	static getTotalWidth(allLines);
	static getMaxWidth(allLines);
	static fromArrayFormatted(array, options);
	static fromArrayUnformatted(array, options);
	static fromString(string, options);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `options` | `SbLinesOptions` | The options. | 
| `height` | `number` | The height of the `SbLines` object. | 
| `width` | `number` | The width of the `SbLines` object. | 

#### Functions
##### `toArray()`
Converts the `SbLines` object into a regular Array of strings.
| Parameters | - |  | 
| --- | --- | --- |
| **Returns** | `Array<string>` | The lines of the `SbLines` object. | 

##### `setOptions(options)`
Sets new options to the `SbLines` object.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `SbLinesOptions` | The new options. | 
| **Returns** | `void` | 

##### `addMarginLeft(margin)`
Adds margin to the left of every line in form of spaces. The amount of spaces added is given by `margin`.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `margin` | `number` | The amount of spaces to be added to the left. | 
| **Returns** | `void` | 

##### `addMarginRight(margin)`
Adds margin to the right of every line in form of spaces. The amount of spaces added is given by `margin`.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `margin` | `number` | The amount of spaces to be added to the right. | 
| **Returns** | `void` | 

##### `addMarginTop(margin)`
Adds margin to the top of the `SbLines` object in form of an empty line. The amount of lines added is given by `margin`.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `margin` | `number` | The amount of lines to be added to the top. | 
| **Returns** | `void` | 

##### `addMarginBottom(margin)`
Adds margin to the bottom of the `SbLines` object in form of an empty line. The amount of lines added is given by `margin`.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `margin` | `number` | The amount of lines to be added to the bottom. | 
| **Returns** | `void` | 

##### `pushFormatted(...lines)`
Pushes new lines to the block. The new lines get formatted with the format specified in the `options` of this class. If the `applyFormatToWholeBlock` option is set to true, the whole block will be formatted, which means that every line will be formatted completely. If it's not set, every empty line (only spaces) will not be formatted as well as the trailing whitespace of the line before an empty line and the trailing whitespaces in the last line will not be formatted. <br/>If a line is too short, the line will be filled with spaces until the length of the line is the same as the `width`, specified in the `options` of this class.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `...lines` | `Array<string>` | The lines to add. | 
| **Returns** | `void` | 

##### `pushUnformatted(...lines)`
Pushes new lines to the block. If a line is too short, the line will be filled with spaces until the length of the line is the same as the `width`, specified in the `options` of this class.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `...lines` | `Array<string>` | The lines to add. | 
| **Returns** | `void` | 

##### `formatLineIncludeWhitespace(lineIndex)`
Formats a line including the trailing whitespaces. For this the whole line gets stripped of its ANSI-escape-characters, in case there are any and the new format will be applied.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `lineIndex` | `number` | The index of the line to format. | 
| **Returns** | `void` | 

##### `formatLineExcludeWhitespace(lineIndex)`
Formats a line excluding the trailing whitespaces. For this the whole line gets stripped of its ANSI-escape-characters, in case there are any. Then the trailing whitespaces of the line will be removed and the rest of the line will be formatted. Then the formatted part of the line will be filled with spaces again.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `lineIndex` | `number` | The index of the line to format. | 
| **Returns** | `void` | 

##### `isEmptyLine(line)`
Checks wether a line is empty or not. A line is considered empty if the ANSI-stripped line without whitespace has length zero. The line also has to have a length of the width of the block.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `line` | `string` | The line to be checked. | 
| **Returns** | `boolean` | True if the line is empty and false otherwise. | 

##### `spliceVertical(start, deleteCount, ...strings)`
Works the same as the default `splice` method method of an `Array`, but instead of strings, `SbVerticalString`'s are used.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `start` | `number` | The start at which to insert the new vertical strings. | 
| `deleteCount` | `number` | The number of vertical strings to remove after the `start` index. | 
| `...strings` | `Array<SbVerticalString>` | The new vertical strings to insert. | 
| **Returns** | `void` | 

##### `static getTotalHeight(allLines)`
Calculates the total height of multiple `SbLines` objects. The method adds up the height of every `SbLines` object.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `allLines` | `Array<SbLines>` | The lines to get the total height from. | 
| **Returns** | `number` | The total height of all `SbLines` objects. | 

##### `static getMaxHeight(allLines)`
Calculates the maximum height of multiple `SbLines` objects. The method returns the maximum height of all the `SbLines` objects.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `allLines` | `Array<SbLines>` | The lines to get the maximum height from. | 
| **Returns** | `number` | The maximum height of all `SbLines` objects. | 

##### `static getTotalWidth(allLines)`
Calculates the total width of multiple `SbLines` objects. The method adds up the width of every `SbLines` object.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `allLines` | `Array<SbLines>` | The lines to get the total width from. | 
| **Returns** | `number` | The total width of all `SbLines` objects. | 

##### `static getMaxWidth(allLines)`
Calculates the maximum width of multiple `SbLines` objects. The method returns the maximum width of all the `SbLines` objects.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `allLines` | `Array<SbLines>` | The lines to get the maximum width from. | 
| **Returns** | `number` | The maximum width of all `SbLines` objects. | 

##### `static fromArrayFormatted(array, options)`
Constructs a `SbLines` object from an `Array` of `strings` and a `SbLinesOptions` object. The lines will be formatted according to the `format` specified in the `options`.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `array` | `Array<string>` | The array of strings. | 
| `options` | `SbLinesOptions` | The options to use for the new `SbLines` object. | 
| **Returns** | `SbLines` | A new `SbLines` object with the lines in the `array` and the specified options. | 

##### `static fromArrayUnformatted(array, options)`
Constructs a `SbLines` object from an `Array` of `strings` and a `SbLinesOptions` object. The lines will not be formatted.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `array` | `Array<string>` | The array of strings. | 
| `options` | `SbLinesOptions` | The options to use for the new `SbLines` object. | 
| **Returns** | `SbLines` | A new `SbLines` object with the lines in the `array` and the specified options. | 

##### `static fromString(string, options)`
Constructs a `SbLines` object from a `string` and a `SbLinesOptions` object. If the `string` is too long, the `string` will be wrapped onto new lines. The maximum width of the `string` is given by the `options`. The wrapping cannot accommodate for long words and will cut any word in half if it is too long to fit on the line. The wrapped string will then be formatted with the specified `format` from the `options`.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `string` | `string` | The string to wrap. | 
| `options` | `SbLinesOptions` | The options to use for the new `SbLines` object. | 
| **Returns** | `SbLines` | A new `SbLines` object with the wrapped `string` as the lines. | 

