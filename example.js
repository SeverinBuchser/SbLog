const {
  SbLog,
  SbHorizontalLog,
  SbVerticalLog,
  SbTableLog,
  prelog,
  separator } = require('.');
const chalk = require('chalk');

console.log(require('.'))
const gridWidth = 40;
const separatorString = ' | ';

const defaultLog = new SbLog();
const smallLoger = new SbLog({
  width: 40,
  prelog: prelog.border(),
  format: 'primary',
  applyFormatToWholeBlock: false
})
const horizontalLog = new SbHorizontalLog([smallLoger, smallLoger],{
  separatorString,
  prelog: prelog.border()
});
const smallLogerWide = new SbLog({
  width: 2 * gridWidth + separatorString.length,
  prelog: prelog.border(),
  format: 'info',
  applyFormatToWholeBlock: false
})
const verticalLog = new SbVerticalLog([horizontalLog, smallLogerWide], {
  separatorBuilder: separator.line(2),
  prelog: prelog.border()
})

const tableLog = new SbTableLog({
  rows: [
    {
      columns: [
        {},
        {}
      ]
    },
    {
      columns: [{
        width: 63
      }]
    }
  ]
});


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

console.log()
tableLog.log([
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
  ],
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e"
  ]
]);
