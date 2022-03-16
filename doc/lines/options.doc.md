# sb-log.lines.module:options
## Classes
### SbLinesOptions
Describes the options which a `SbLines` object can take.
```js
class SbLinesOptions extends SbOptions {
	constructor(width, format, applyFormatToWholeBlock);
	@override static merge(options, defaults);
}
```
#### Members
| Name | Type | Description | 
| --- | --- | --- |
| `static defaults` | `SbLinesOptions` | The default options. | 
| `width` | `number` | The width of the `SbLines` object. | 
| `format` | `function` | The format of the `SbLines` object. | 
| `applyFormatToWholeBlock` | `boolean` | Determines if the `format` gets applied to the whole block of the `SbLines` object. | 

#### Functions
##### `@override static merge(options, defaults)`
Merges options width default options. If `defaults` is `undefined`, the `SbLinesOptions.defaults` member gets used as the default options. If the format of the options is of type `string`, the format should represent a predefined format, defined with chalk. These predefined definitions can be found under 'src/format.js'.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | The options to extend with the default options. | 
| `defaults` | `object` | The options to use, when the option in the `options` object is `undefined`. | 
| **Returns** | `object` | The `options` extended with the default options. | 

