const SbLog = require('./src/log');
const SbHorizontalLog = require('./src/horizontal-log');
const SbVerticalLog = require('./src/vertical-log');
const SbTableLog = require('./src/table-log');
const { border } = require('./src/prelog');
const { verticalLine } = require('./src/separator');
const chalk = require('chalk');


const gridWidth = 40;
const separator = ' | ';


const defaultLog = new SbLog();
const smallLoger = new SbLog({
  width: 40,
  prelog: border(),
  format: 'primary',
  applyFormatToWholeBlock: false
})
const horizontalLog = new SbHorizontalLog([smallLoger, smallLoger],{
  separator,
  prelog: border()
});
const smallLogerWide = new SbLog({
  width: 2 * gridWidth + separator.length,
  prelog: border(),
  format: 'info',
  applyFormatToWholeBlock: false
})
const verticalLog = new SbVerticalLog([horizontalLog, smallLogerWide], {
  separatorBuilder: verticalLine(),
  prelog: border()
})


defaultLog.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv")
console.log()
smallLoger.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv")
console.log()
horizontalLog.log([
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
])
console.log()
verticalLog.log([
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
  ], "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
])

const table = new SbTableLog({
  rows: [
    {
      columns: [
        {},
        {}
      ]
    },
    {
      columns: 1
    }
  ]
})

table.log([["hello", "hi"], ["asdf"]])
