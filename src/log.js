const SbLogLines = require('./log-lines');
const SbLogCore = require('./log-core');
const { SbLogOptions } = require('./options');

class SbLog extends SbLogCore {

  constructor(options) {
    super(SbLogOptions.merge(options));
  }

  build(string) {
    return SbLogLines.fromString(string, this.options);
  }

}

module.exports = SbLog;
