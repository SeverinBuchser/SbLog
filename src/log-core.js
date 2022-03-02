const clone = require('clone');

const defaultLogCoreOptions = {
  prelog: lines => lines
}

function mergeWithDefaultLogCoreOptions(options) {
  if (options) {
    if (!options.prelog) {
      options.prelog = defaultLogCoreOptions.prelog;
    }
    return options;
  } else return defaultLogCoreOptions;
}

class SbLogCore {
  constructor(options) {
    this.options = clone(mergeWithDefaultLogCoreOptions(options));
  }

  build(strings) {return []}

  log(strings) {
    this.options.prelog(this.build(strings)).forEach(line => console.log(line));
  }
}

module.exports = SbLogCore;
