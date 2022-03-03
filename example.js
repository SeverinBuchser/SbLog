const {
  SbLog,
  SbHorizontalLog,
  SbVerticalLog,
  SbTableLog,
  SbFieldLog,
  prelog,
  separator,
  fieldsConfig } = require('./src');
const chalk = require('chalk');


const gridWidth = 40;
const separatorString = ' | ';


const defaultLog = new SbLog();
defaultLog.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv")


const smallLoger = new SbLog({
  width: 40,
  prelog: prelog.border(),
  format: 'primary',
  applyFormatToWholeBlock: false
})
console.log()
smallLoger.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv")


const horizontalLog = new SbHorizontalLog([smallLoger, smallLoger],{
  separatorString,
  prelog: prelog.border()
});
horizontalLog.log([
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
])


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
verticalLog.log([
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
  ], "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
])


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
tableLog.log([
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
  ],
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e"
  ]
]);


const startLog = new SbFieldLog('start');
const entryLog = new SbFieldLog('entry');
const copyLog = new SbFieldLog('copy');
const createLog = new SbFieldLog('create');
const deleteLog = new SbFieldLog('delete');
const informLog = new SbFieldLog('inform');
const warnLog = new SbFieldLog('warn');
const compileLog = new SbFieldLog('compile');
const endLog = new SbFieldLog('end');


console.log()
startLog.log("building process", new Date());
console.log()
entryLog.log(["./dark.scss", "./light.css"]);
console.log()
createLog.log(["./dark.css", "./light.css"], ["100kb", "100kb"]);
console.log()
copyLog.log(["./dark.css", "./light.css"], ["./dist/dark.css", "./dist/light.css"]);
console.log()
deleteLog.log(["./dark.css", "./light.css"]);
console.log()
informLog.log("There is an information, like something is deprecated.");
warnLog.log("There is an important warning!");
compileLog.log("dark theme", "1000ms");
endLog.log("building process", new Date());

const verticalLogTwo = new SbVerticalLog([createLog, createLog], {
  separatorBuilder: separator.line(),
  prelog: prelog.border()
})

console.log()
verticalLogTwo.log([
  [["./dark.css", "./light.css"], ["100kb", "100kb"]],
  [["./dark.css", "./light.css"], ["100kb", "100kb"]]
])
