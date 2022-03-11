# sb-log

Library for easy console logs.

## Installation

```
npm install --save sb-log
```

## Usage

A sample usage of `SbLogBlock`:

```js
const { SbLogBlock } = require('sb-log');
const log = new SbLogBlock();
log.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv");

// Output:
// Lorem ipsum dolor sit amet, co
// nsetetur sadipscing elitr, sed
//  diam nonumy eirmod tempor inv
```

With the default options of `SbLogBlock`, a string can be logged to the console which has a width of 30 characters. If the string exceeds this width, the string gets wrapped onto a new line. The only downside to this is that as you can see, the string gets cut mid word. This will maybe fixed in future versions. 

The default options also include a default format/color:

```js
// Default SbLog options:
{
	width: 30,
	format: 'default',
	applyFormatToWholeBlock: false,
	prelog: prelog.none // lines => lines
}
```

The `prelog` option gets applied to the output, before logging it to the console. The function takes an argument of `SbLines`, which get built by `SbLog`, when calling `log`. There is also a method to directly create the `SbLines`:

```js
const lines = log.build("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv");
```

In the `log` method of `SbLog`, the following happens:

```js
this.options.prelog(this.build(string)).forEach(line => console.log(line))
```

You can plug into a log, by calling the `build` method and do whatever you desire with the output.

### Colors

There are some predefined colors, which can be used by passing a string like `'default'`, into the format field of the log's options. The colors are defined using  [chalk](https://www.npmjs.com/package/chalk):

| Format    | Implementation             |
| --------- | -------------------------- |
| default   | `string => string`         |
| primary   | `chalk.cyanBright.bold`    |
| secondary | `chalk.magentaBright.bold` |
| success   | ` chalk.greenBright.bold`  |
| warn      | ` chalk.redBright.bold`    |
| info      | ` chalk.yellowBright.bold` |

You can plug in any function which takes a string and returns a string, **but you need to be careful with zero-width-characters!** At the moment only the characters for ANSI-Color-Codes are accounted for.

### Prelog

The `prelog` provides two predefined functions: The first is the identity function `lines => lines` and the second is the `border` function. The border function takes a configuration as parameter:

```js
border(config = 'solid')
```

The `config` can take any value provided by the `lineConfig` module:

| Configuration   | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `solid`         | A solid border with sharp corners.                           |
| `solidBold`     | A solid bold border with sharp corners.                      |
| `solidRounded`  | A solid border with round outside corners and sharp inside corners. |
| `dashed`        | A dashed border with sharp corners.                          |
| `dashedBold`    | A dashed bold border with sharp corners.                     |
| `dashedRounded` | A dashed border with round outside corners and sharp inside corners. |
| `empty`         | No border, but one space. **Don't use this for no border, use `prelog.none.`** |

The border can be applied as follows:

```js
const { SbLog, prelog } = require('sb-log');
const logBorder = new SbLog({
	prelog: prelog.border()
});
logBorder.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv");

// Output:
// ┌────────────────────────────────┐
// │ Lorem ipsum dolor sit amet, co │
// │ nsetetur sadipscing elitr, sed │
// │  diam nonumy eirmod tempor inv │
// └────────────────────────────────┘
```

Again you can substitute any function which takes a `SbLines` object and returns a string array.

### SbLines - The fundamental building block

This class takes the same options as `SbLog`, without the `prelog` field. The class extends an array and overrides the `push` method, but provides a substitute `pushUnformatted(...lines)`. What the default `push` method does is best described by an example:

```js
const { SbLines } = require('sb-log');

const linesWholeBlock = new SbLines()
linesWholeBlock.setOptions({
  format: chalk.underline,
  applyFormatToWholeBlock: true
})

linesWholeBlock.push("This is some sample line.")
linesWholeBlock.forEach(line => console.log([line]))

const linesPartialBlock = new SbLines()
linesPartialBlock.setOptions({
  format: chalk.underline,
  applyFormatToWholeBlock: false
})

linesPartialBlock.push("This is some sample line.")
linesPartialBlock.forEach(line => console.log([line]))

// linesWholeBlock Output:
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]

// linesPartialBlock Output:
// [ '\x1B[4mThis is some sample line.\x1B[24m     ' ]
```

The above `SbLines` receive two different strings as the first line. This is caused by the `applyFormatToWholeBlock` option. If this flag is set to true, the format (in this case underline), will be set to the whole line. If not, **only the last line with non whitespace characters** will not have the whole line formatted:

 ```js
// Same example but push two lines and an empty line:
...
linesWholeBlock.push("This is some sample line.")
linesWholeBlock.push("This is some sample line.")
linesWholeBlock.addMarginBottom(1);
...
linesPartialBlock.push("This is some sample line.")
linesPartialBlock.push("This is some sample line.")
linesPartialBlock.addMarginBottom(1);
...

// linesWholeBlock Output:
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]
// [ '\x1B[4m                              \x1B[24m' ]

// linesPartialBlock Output:
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]
// [ '\x1B[4mThis is some sample line.\x1B[24m     ' ]
// [ '                              ' ]
 ```

As you can see in the `linesPartialBlock`, the format only gets applied to the last line with non-whitespace characters. You can also make use of the `addEpmtyLines` method to push empty lines. There are also other useful static methods:

```js
const { SbLines } = require('sb-log');
const options = {
  format: chalk.underline,
  applyFormatToWholeBlock: false
}


SbLines.fromArrayFormatted(["This is some sample line."], options)
// [ '\x1B[4mThis is some sample line.\x1B[24m     ' ]

SbLines.fromArrayUnformatted(["This is some sample line."], options)
// [ 'This is some sample line.' ]

SbLines.fromString("Lorem ipsum dolor sit amet, consetetur sadipscing", options)
// [ '\x1B[4mLorem ipsum dolor sit amet, co\x1B[24m' ]
// [ '\x1B[4mnsetetur sadipscing\x1B[24m           ' ]

...
```

There are also methods to calculate the total width, max-width, total-height and max-height of multiple `SbLines`. The public members consist of adding margin to the left, right, top and bottom. For further functions see the [GitHub Page](https://github.com/SeverinBuchser/SbLog.git).

### Other logs

There are other logs:

| Log Name          | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `SbLogHorizontal` | Combines logs into one log and joins the lines horizontally. |
| `SbLogVertical`   | Combines logs into one log and joins the lines vertically.   |
| `SbLogTable`      | Combines logs into one log. The loggers can be arranged into a table. The configuration of the table layout happens in the tables options. |
| `SbLogField`      | Logs different fields with different formats. You can use predefined configurations in `fieldConfig` or you can define your own. |

A log extends the core log `SbLogCore`. This class defines the `log` method any only accepts a `prelog` as an options. It also defines an empty build method, which just returns an empty array. 

## Further Documentation

For more accurate and detailed insight go visit the [GitHub Page](https://github.com/SeverinBuchser/SbLog.git) and look into the source code.

## Creator

Severin Buchser

* [GitHub](https://github.com/SeverinBuchser)
* [Npm](https://www.npmjs.com/~severinbuchser)

