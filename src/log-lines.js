const SbAnsiString = require('./ansi-string');
const wrap = require('word-wrap');
const trim = require('trim-whitespace');
const clone = require('clone');
const colors = require('./colors');

const defaultLogLinesOptions = {
  width: 30,
  format: 'default',
  applyFormatToWholeBlock: false
}

function mergeWithDefaultLinesOptions(options) {
  if (options) {
    if (!options.width) {
      options.width = defaultLogLinesOptions.width;
    }
    if (!options.format) {
      options.format = defaultLogLinesOptions.format;
    }
    if (typeof options.format == 'string') {
      options.format = colors[options.format];
    }
    if (options.applyFormatToWholeBlock == undefined) {
      options.applyFormatToWholeBlock = defaultLogLinesOptions.applyFormatToWholeBlock;
    }
    return options;
  } else return defaultLogLinesOptions;
}

class SbLogLines extends Array {

  get height() {
    return this.length;
  }

  get width() {
    return this.options.width;
  }

  setOptions(options) {
    this.options = clone(mergeWithDefaultLinesOptions(options));
  }

  addMarginRight(spaces) {
    for (let i = 0 ; i < spaces ; i++) {
      this.options.width += 1;
      this.forEach((line, index) => this[index] = line + ' ')
    }
  }

  addEmptyLines(lines) {
    for (let i = 0 ; i < lines ; i++) {
      this.push(this.fillLine('', false));
    };
  }

  push(...lines) {
    lines.forEach(line => {
      if (this.options.applyFormatToWholeBlock) {
        super.push(this.fillLine(line, true, true));
      } else if (!this.isEmptyLine(line)){
        for (let lineIndex = 0 ; lineIndex < this.length ; lineIndex++) {
          this[lineIndex] = this.options.format(SbAnsiString.strip(this[lineIndex]));
        }
        super.push(this.fillLine(line, true, false))
      } else {
        super.push(line);
      }
    })
  }

  pushUnformatted(...lines) {
    lines.forEach(line => super.push(line))
  }

  isEmptyLine(line) {
    return new RegExp(/^  * $/).test(SbAnsiString.strip(line));
  }

  fillLine(string, format = true, formatAll = false) {
    string = SbAnsiString.strip(string);
    if (format && !formatAll) {
      string = trim.trailing(string);
    }
    let lengthDifference = this.options.width - string.length;
    if (lengthDifference < 0) throw new Error("String already exeeded length!");
    if (format) {
      if (formatAll) {
        return this.options.format(string + ' '.repeat(lengthDifference));
      } else {
        return this.options.format(string) + ' '.repeat(lengthDifference);
      }
    } else return string + ' '.repeat(lengthDifference);
  }

  static getTotalHeight(allLines) {
    return allLines.reduce((height, lines) => {
      return height + lines.height;
    }, 0);
  }

  static getMaxHeight(allLines) {
    return allLines.reduce((height, lines) => {
      return Math.max(height, lines.height);
    }, 0);
  }

  static getTotalWidth(allLines) {
    return allLines.reduce((width, lines) => {
      return width + lines.width;
    }, 0);
  }

  static getMaxWidth(allLines) {
    return allLines.reduce((width, lines) => {
      return Math.max(width, lines.width);
    }, 0);
  }

  static fromArray(array, options) {
    const lines = new SbLogLines();
    lines.setOptions(options);
    array.forEach(line => lines.push(line));
    return lines;
  }

  static fromArrayUnformatted(array, options) {
    const lines = new SbLogLines();
    lines.setOptions(options);
    array.forEach(line => lines.pushUnformatted(line));
    return lines;
  }

  static fromString(string, options) {
    options = clone(mergeWithDefaultLinesOptions(options));
    return SbLogLines.fromArray(
      wrap(SbAnsiString.strip(string), {
        width: options.width,
        cut: true,
        indent: ''
      }).split('\n'),
      options
    );
  }

}


module.exports = SbLogLines;
