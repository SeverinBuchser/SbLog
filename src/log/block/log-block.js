const SbLogBlockOptions = require('./log-block-options');
const { SbLines } = require('../../lines');
const { SbLogCore } = require('../core');

class SbLogBlock extends SbLogCore {

  constructor(options) {
    super(SbLogBlockOptions.merge(options));
  }

  build(string) {
    return SbLines.fromString(string, this.options);
  }

}

module.exports = SbLogBlock;
