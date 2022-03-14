const chalk = require('chalk');

/**
 * Predefined formats using chalk.
 * @constant {object}
 * @see {@link https://www.npmjs.com/package/chalk}
 */
const format = {
  none: string => string,
  primary: chalk.cyanBright.bold,
  secondary: chalk.magentaBright.bold,
  success: chalk.greenBright.bold,
  warn: chalk.redBright.bold,
  info: chalk.yellowBright.bold
}

module.exports = format;
