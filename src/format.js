const chalk = require('chalk');

/**
 * Predefined formats using chalk.
 * @constant {object}
 * @see {@link https://www.npmjs.com/package/chalk}
 */
const format = {
  none: string => string,
  bold: chalk.bold,
  primary: chalk.cyanBright.bold,
  secondary: chalk.magentaBright.bold,
  success: chalk.greenBright.bold,
  warn: chalk.yellowBright.bold,
  fail: chalk.redBright.bold
}

module.exports = format;
