const { SbLogCoreOptions } = require('./options');

class SbLogCore {
  constructor(options) {
    this.options = SbLogCoreOptions.merge(options);
  }

  build(strings) {return []}

  log(strings) {
    this.options.prelog(this.build(strings)).forEach(line => console.log(line));
  }
}

module.exports = SbLogCore;
