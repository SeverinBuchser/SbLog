const SbLinesOptions = require('./lines-options');
const wrap = require('word-wrap');
const { SbAnsiString, SbVerticalString, whitespace, builder } = require('../util');

class SbLines extends Array {

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
    this.options = SbLinesOptions.merge(options);
  }

  addMarginLeft(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.spliceVertical(0, 0, builer.buildVs(this.height, 'empty'));
    }
  }

  addMarginRight(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.spliceVertical(this.width - 1, 0, builer.buildVs(this.height, 'empty'));
    }
  }

  addMarginTop(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.splice(0, 0, builder.buildHs(this.width, 'empty'));
    };
  }

  addMarginBottom(margin) {
    for (let i = 0 ; i < margin ; i++) {
      this.splice(this.height, 0, builder.buildHs(this.width, 'empty'));
    };
  }

  pushFormatted(...lines) {
    lines.forEach(line => {
      this.push(whitespace.fillTrailing(line, this.width))
      if (this.options.applyFormatToWholeBlock) {
        this.formatLineIncludeWhitespace(this.height - 1);
      } else if (!this.isEmptyLine(line)) {
        if (this.height - 2 >= 0 && !this.isEmptyLine(this[this.height - 2])) {
          this.formatLineIncludeWhitespace(this.height - 2);
        }
        this.formatLineExcludeWhitespace(this.height - 1);
      }
    })
  }

  pushUnformatted(...lines) {
    lines.forEach(line => {
      this.push(whitespace.fillTrailing(line, this.width))
    })
  }

  formatLineIncludeWhitespace(lineIndex) {
    this[lineIndex] = this.options.format(SbAnsiString.strip(this[lineIndex]));
  }

  formatLineExcludeWhitespace(lineIndex) {
    let line = whitespace.trimTrailing(SbAnsiString.strip(this[lineIndex]));
    this[lineIndex] = whitespace.fillTrailing(this.options.format(line), this.width);
  }

  isEmptyLine(line) {
    return whitespace.trimTrailing(SbAnsiString.strip(line)).length == 0
        && SbAnsiString.strippedLength(line) == this.width;
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
    const lines = new SbLines();
    lines.setOptions(options);
    lines.pushFormatted(...array);
    return lines;
  }

  static fromArrayUnformatted(array, options) {
    const lines = new SbLines();
    lines.setOptions(options);
    lines.pushUnformatted(...array);
    return lines;
  }

  static fromString(string, options) {
    options = SbLinesOptions.merge(options);
    return SbLines.fromArray(
      wrap(SbAnsiString.strip(string), {
        width: options.width,
        cut: true,
        indent: ''
      }).split('\n'),
      options
    );
  }

}

module.exports = SbLines;
