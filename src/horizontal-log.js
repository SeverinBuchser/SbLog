const SbAnsiString = require('./ansi-string');
const SbLogLines = require('./log-lines');
const SbLogCore = require('./log-core');
const { SbHorizontalLogOptions } = require('./options');

class SbHorizontalLog extends SbLogCore {

  constructor(logs, options) {
    super(SbHorizontalLogOptions.merge(options));
    this.logs = logs ? logs : [];
  }

  build(strings) {
    if (!Array.isArray(strings) || strings.length != this.logs.length) {
      throw new Erorr('Strings must be an array and there must be as many string objects as logs.');
    }
    let allLines = this.logs.map((log, index) => log.build(strings[index]));
    let height = SbLogLines.getMaxHeight(allLines);
    let separatorWidth = SbAnsiString.strippedLength(this.options.separator) * (allLines.length - 1);
    let width = SbLogLines.getTotalWidth(allLines);
    allLines.forEach(lines => lines.addEmptyLines(height - lines.height))

    return SbLogLines.fromArrayUnformatted(this.joinLines(allLines), {
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

module.exports = SbHorizontalLog;
