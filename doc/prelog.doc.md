# sb-log.module:prelog
## Functions
##### `none(lines)`
Returns the input, does nothing to the lines.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `lines` | `SbLines | Array<string>` | The input lines. | 
| **Returns** | `SbLines | Array<string>` | The original lines. | 

##### `border(config)`
Adds a border to a lines block. The border must use a predefined configuration. The configuration consists out of border segments out of Unicode characters. The method creates a border with corners around the block as well as replaces all corners inside the block with the appropriate characters. For example if a horizontal separator meets a vertical one, a T- junction is used instead of the horizontal line segment.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `config` | `string` | The `lineConfig` to use. | 
| **Returns** | `function` | The function, which builds the border. | 

