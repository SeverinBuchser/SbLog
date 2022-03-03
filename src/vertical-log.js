const SbLogLines = require('./log-lines');
const SbLogCore = require('./log-core');
const { SbVerticalLogOptions } = require('./options');

class SbVerticalLog extends SbLogCore {

  constructor(logs, options) {
    super(SbVerticalLogOptions.merge(options));
    this.logs = logs ? logs : [];
  }

  build(strings) {
    if (!Array.isArray(strings) || strings.length != this.logs.length) {
      throw new Erorr('Strings must be an array and there must be as many string objects as logs.');
    }
    let allLines = this.logs.map((log, index) => log.build(strings[index]));
    let width = SbLogLines.getMaxWidth(allLines);
    allLines.forEach(lines => lines.addMarginRight(width - lines.width));

    return SbLogLines.fromArrayUnformatted(this.joinLines(allLines), {
      ...this.options,
      width
    })
  }

  joinLines(allLines) {
    return allLines.reduce((joined, lines, linesIndex, allLines) => {
      lines.forEach(line => joined.push(line));
      if (linesIndex < allLines.length - 1) {
        let separator = this.options.separatorBuilder(lines.width);
        if (separator) {
          joined.push(...this.options.separatorBuilder(lines.width))
        }
      }
      return joined;
    }, []);
  }

}

module.exports = SbVerticalLog;
