const SbAnsiString = require('./ansi-string');
const SbVerticalString = require('./vertical-string');
const { SbLogLinesOptions } = require('./options');
const wrap = require('word-wrap');
const utils = require('./utils');

class SbLogLines extends Array {

  get height() {
    return this.length;
  }

  get width() {
    return this.options.width;
  }

  toArray() {
    return this.reduce((array, line) => {
      array.push(line);
      return array
    }, []);
  }

  setOptions(options) {
    this.options = SbLogLinesOptions.merge(options);
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
      if (line != '' && line != undefined) {
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
      }
    })
  }

  pushUnformatted(...lines) {
    lines.forEach(line => {
      if (line != '' && line != undefined) {
        super.push(line)
      }
    })
  }

  isEmptyLine(line) {
    return utils.hasOnlySpaces(SbAnsiString.strip(line));
  }

  fillLine(string, format = true, formatAll = false) {
    string = SbAnsiString.strip(string);
    if (format && !formatAll) {
      string = utils.trimTrailing(string);
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

  setHorizontal(string, index) {
    this.splice(index, 1, string);
  }

  setVertical(string, index) {
    this.spliceVertical(index, 1, string);
  }

  pushVertical(string) {
    this.spliceVertical(this.width, 0, string);
  }

  spliceVertical(start, deleteCount, ...strings) {
    if (strings) {
      strings.forEach(string => {
        if (!(string instanceof SbVerticalString)) {
          throw new Error("String must be a vertical string!");
        }
      })
    }
    let stringsJoined = this.map(() => '');
    strings.forEach(string => {
      string.strings.forEach((character, index) => {
        stringsJoined[index] += character;
      })
    })

    this.forEach((line, lineIndex) => {
      let ansiLine = new SbAnsiString(this[lineIndex]);
      this[lineIndex] = ansiLine.substring(0, start) + stringsJoined[lineIndex] + ansiLine.substring(start + deleteCount)
    })

    this.options.width += strings.length - deleteCount;
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
    lines.push(...array);
    return lines;
  }

  static fromArrayUnformatted(array, options) {
    const lines = new SbLogLines();
    lines.setOptions(options);
    lines.pushUnformatted(...array);
    return lines;
  }

  static fromString(string, options) {
    options = SbLogLinesOptions.merge(options);
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
