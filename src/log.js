const SbLogLines = require('./log-lines');
const SbLogCore = require('./log-core');
const colors = require('./colors');
const clone = require('clone');

const defaultLogOptions = {
  width: 30,
  format: colors['default'],
  applyFormatToWholeBlock: false
}

function mergeWithDefaultLogOptions(options) {
  if (options) {
    if (!options.width) {
      options.width = defaultLogOptions.width;
    }
    if (!options.format) {
      options.format = defaultLogOptions.format;
    }
    if (typeof options.format == 'string') {
      options.format = colors[options.format];
    }
    if (options.applyFormatToWholeBlock == undefined) {
      options.applyFormatToWholeBlock = defaultLogOptions.applyFormatToWholeBlock;
    }
    return options;
  } else return defaultLogOptions;
}

class SbLog extends SbLogCore {

  constructor(options) {
    super(clone(mergeWithDefaultLogOptions(options)));
  }

  build(string) {
    return SbLogLines.fromString(string, this.options);
  }

}

module.exports = SbLog;
