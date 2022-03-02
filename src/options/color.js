const chalk = require('chalk');

const color = {
  'default': string => string,
  'primary': chalk.cyanBright.bold,
  'secondary': chalk.magentaBright.bold,
  'success': chalk.greenBright.bold,
  'warn': chalk.redBright.bold,
  'info': chalk.yellowBright.bold
}

module.exports = color;
