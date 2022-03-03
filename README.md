# sb-log

Library for easy console logs.

## Installation

```
npm install --save sb-log
```

## Usage

A sample usage of `SbLog`:

```js
const { SbLog } = require('sb-log');
const log = new SbLog();
log.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv");

// Output:
// Lorem ipsum dolor sit amet, co
// nsetetur sadipscing elitr, sed
//  diam nonumy eirmod tempor inv
```

With the default options of `SbLog`, a string can be logged to the console which has a width of 30 characters. If the string exceeds this width, the string gets wrapped onto a new line. The only downside to this is that as you can see, the string gets cut mid word. This will maybe fixed in future versions. 

The default options also includes a default format/color:

```js
// Default SbLog options:
{
	width: 30,
	format: 'default',
	applyFormatToWholeBlock: false,
	prelog: lines => lines
}
```

The `prelog` option gets applied to the output, before logging it to the console. The function takes an argument of `SbLogLines`, which get built by `SbLog`, when calling `log`. There is also a method to directly create the `SbLogLines`:

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

### Prelogs

There is only one prelog provided by the library:

```js
const { SbLog, prelog } = require('sb-log');
const log = new SbLog({
	width: 40,
	prelog: prelog.border()
});

// Output:
// +------------------------------------------+
// │ Lorem ipsum dolor sit amet, consetetur s │
// │ adipscing elitr, sed diam nonumy eirmod  │
// │ tempor inv                               │
// +------------------------------------------+
```

Again you can substitute any function which takes a `SbLogLines` object and returns a string array.

### SbLogLines - The fundamental building block

This class takes the same options as `SbLog`, without the `prelog` field. The class extends an array and overrides the `push` method, but provides a substitute `pushUnformatted(...lines)`. What the default `push` method does is best described by an example:

```js
const { SbLogLines } = require('sb-log');

const logLinesWholeBlock = new SbLogLines()
logLinesWholeBlock.setOptions({
  format: chalk.underline,
  applyFormatToWholeBlock: true
})

logLinesWholeBlock.push("This is some sample line.")
logLinesWholeBlock.forEach(line => console.log([line]))

const logLinesPartialBlock = new SbLogLines()
logLinesPartialBlock.setOptions({
  format: chalk.underline,
  applyFormatToWholeBlock: false
})

logLinesPartialBlock.push("This is some sample line.")
logLinesPartialBlock.forEach(line => console.log([line]))

// logLinesWholeBlock Output:
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]

// logLinesPartialBlock Output:
// [ '\x1B[4mThis is some sample line.\x1B[24m     ' ]
```

The above `SbLogLines` receive two different strings as the first line. This is caused by the `applyFormatToWholeBlock` option. If this flag is set to true, the format (in this case underline), will be set to the whole line. If not, **only the last line with non whitespace characters** will not have the whole line formatted:

 ```js
// Same example but push two lines and an empty line:
...
logLinesWholeBlock.push("This is some sample line.")
logLinesWholeBlock.push("This is some sample line.")
logLinesWholeBlock.addEmptyLines(1);
...
logLinesPartialBlock.push("This is some sample line.")
logLinesPartialBlock.push("This is some sample line.")
logLinesPartialBlock.addEmptyLines(1);
...

// logLinesWholeBlock Output:
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]
// [ '\x1B[4m                              \x1B[24m' ]

// logLinesPartialBlock Output:
// [ '\x1B[4mThis is some sample line.     \x1B[24m' ]
// [ '\x1B[4mThis is some sample line.\x1B[24m     ' ]
// [ '                              ' ]
 ```

As you can see in the `logLinesPartialBlock`, the format only gets applied to the last line with non-whitespace characters. You can also make use of the `addEpmtyLines` method to push empty lines. There are also other useful static methods:

```js
const { SbLogLines } = require('sb-log');
const options = {
  format: chalk.underline,
  applyFormatToWholeBlock: false
}


SbLogLines.fromArray(["This is some sample line."], options)
// [ '\x1B[4mThis is some sample line.\x1B[24m     ' ]

SbLogLines.fromArrayUnformatted(["This is some sample line."], options)
// [ 'This is some sample line.' ]

SbLogLines.fromString("Lorem ipsum dolor sit amet, consetetur sadipscing", options)
// [ '\x1B[4mLorem ipsum dolor sit amet, co\x1B[24m' ]
// [ '\x1B[4mnsetetur sadipscing\x1B[24m           ' ]

...
```

There are also methods to calculate the total width, max-width, total-height and max-height of multiple `SbLogLines`. The public members consist of adding empty lines, adding margin to the right, getting the with and height and filling a string up to the width with spaces:

| `SbLogLines extends Array`                           |
| ---------------------------------------------------- |
| **Static**                                           |
| `getTotalHeight(allLines)`                           |
| `getMaxHeight(allLines)`                             |
| `getTotalWidth(allLines)`                            |
| `getMaxWidth(allLines)`                              |
| **Public**                                           |
| `height`                                             |
| `width`                                              |
| `setOptions(options)`                                |
| `addMarginRight(spaces)`                             |
| `addEmptyLines(lines)`                               |
| `push(...lines)`                                     |
| `pushUnformatted(...lines)`                          |
| `isEmptyLine(line)`                                  |
| `fillLine(string, format = true, formatAll = false)` |

### Other logs

There are other logs:

| Log Name          | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `SbHorizontalLog` | Combines loggers into one logger and joins the lines horizontally. |
| `SbVerticalLog`   | Combines loggers into one logger and joins the lines vertically. |
| `SbTableLog`      | Combines loggers into one logger. The loggers can be arranged into a table. The configuration of the table layout happens in the tables options. |

A log extends the core log `SbLogCore`. This class defines the `log` method any only accepts a `prelog` as an options. It also defines an empty build method, which just returns an empty array. 

## Creator

Severin Buchser

* [GitHub](https://github.com/SeverinBuchser)
* [Npm](https://www.npmjs.com/~severinbuchser)

