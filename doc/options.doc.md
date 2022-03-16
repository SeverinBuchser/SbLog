# sb-log.module:options
## Classes
### SbOptions
A core class to define options with unified options handling and merging.
```js
class SbOptions {
	static getDefaults(defaults, fallBackDefaults);
	static getOptions(options, defaults);
	static mergeKey(key, options, defaults);
	static mergeKeys(keys, options, defaults);
}
```
#### Functions
##### `static getDefaults(defaults, fallBackDefaults)`
Returns the default options to use. If there are no default options, the fallback default options are used.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `defaults` | `object` | The default options. | 
| `fallBackDefaults` | `object` | The fallback default options. | 
| **Returns** | `object` | The default options to use. | 

##### `static getOptions(options, defaults)`
If there are no options, the defaults are used.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `options` | `object` | The options. | 
| `defaults` | `object` | The default options. | 
| **Returns** | `object` | The options to use. | 

##### `static mergeKey(key, options, defaults)`
Merges a property of the options with name `key` with the default options. If the property is not defined in the options, the default values are used.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `key` | `string` | The key to the property. | 
| `options` | `object` | The options. | 
| `defaults` | `object` | The default options. | 
| **Returns** | `void` | 

##### `static mergeKeys(keys, options, defaults)`
Merges multiple properties of the options with the default options. If the properties are not defined in the options, the default values are used.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `keys` | `Array<string>` | The keys to the properties. | 
| `options` | `object` | The options. | 
| `defaults` | `object` | The default options. | 
| **Returns** | `void` | 

