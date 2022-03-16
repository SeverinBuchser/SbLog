# sb-log.module:separator
## Functions
##### `none()`
The empty separator.
| Parameters | - |  | 
| --- | --- | --- |
| **Returns** | `void` |  | 

##### `empty(gapWidth)`
Creates a function, which creates empty lines with the specified width.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `gapWidth` | `number` | The height of empty lines. | 
| **Returns** | `function` | The function which creates the separator. | 

##### `hLine(marginOrMarginLeft, marginRight, config)`
Creates a vertical line separator with left- and right-margin. The margins are spaces.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `marginOrMarginLeft` | `number` | The left-margin or left- and right-margin. | 
| `marginRight` | `number` | The right-margin. | 
| `config` | `string` | The line config to use. | 
| **Returns** | `string` | The separator. | 

##### `vLine(marginOrMarginTop, marginBottom, config)`
Creates a function, which creates horizontal line separator with top- and bottom-margin. The function then takes a width, to which the line gets built to. The margins are empty lines.
| Parameters |  |  | 
| --- | --- | --- |
| **Name** | **Type** | **Description** | 
| `marginOrMarginTop` | `number` | The top-margin or top- and bottom-margin. | 
| `marginBottom` | `number` | The bottom-margin. | 
| `config` | `string` | The line config to use. | 
| **Returns** | `string` | The separator. | 

