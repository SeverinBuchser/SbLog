const SbLogHorizontalOptions = require('./log-horizontal-options');
const { SbLines } = require('../../lines');
const { SbLogCore } = require('../core');
const { SbAnsiString } = require('../../util');

class SbLogHorizontal extends SbLogCore {

  get separatorWidth() {
    return SbAnsiString.strippedLength(this.options.separator);
  }

  constructor(logs, options) {
    super(SbLogHorizontalOptions.merge(options));
    this.logs = logs ? logs : [];
  }

  build(strings) {
    if (!Array.isArray(strings) || strings.length != this.logs.length) {
      throw new Error('Strings must be an array and there must be as many string objects as logs.');
    }

    let allLines = this.logs.map((log, index) => log.build(strings[index]));
    let height = SbLines.getMaxHeight(allLines);
    let separatorWidth = this.separatorWidth * (allLines.length - 1);
    let width = SbLines.getTotalWidth(allLines);

    allLines.forEach(lines => lines.addMarginBottom(height - lines.height))

    return SbLines.fromArrayUnformatted(this.joinLines(allLines), {
      ...this.options,
      width: width + separatorWidth
    });
  }

  joinLines(allLines) {
    return allLines.reduce((joined, lines, linesIndex, allLines) => {
      lines.forEach((line, lineIndex) => {
        if (joined[lineIndex]) joined[lineIndex] += line;
        else joined[lineIndex] = line;
      })
      if (linesIndex < allLines.length  - 1) {
        joined = joined.map(line => line + this.options.separator)
      }
      return joined;
    }, []);
  }

}

module.exports = SbLogHorizontal;
