const {
  SbLogBlock,
  SbLogHorizontal,
  SbLogVertical,
  SbLogTable,
  SbLogField,
  prelog,
  separator } = require('./src');
const chalk = require('chalk');

const gridWidth = 40;
const separatorString = ' \u2502 ';


const defaultLog = new SbLogBlock();
defaultLog.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv")


const smallLoger = new SbLogBlock({
  width: 30,
  prelog: prelog.border(),
  format: 'none',
  applyFormatToWholeBlock: false
})
console.log()
smallLoger.log("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv")


const horizontalLog = new SbLogHorizontal([smallLoger, smallLoger],{
  separatorString,
  prelog: prelog.border()
});
horizontalLog.log([
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
])


const smallLogerWide = new SbLogBlock({
  width: 2 * gridWidth + separatorString.length,
  prelog: prelog.border(),
  format: 'info',
  applyFormatToWholeBlock: false
})
const verticalLog = new SbLogVertical([horizontalLog, smallLogerWide], {
  separatorBuilder: separator.vLine(2, 2, 'solid'),
  prelog: prelog.border()
})
verticalLog.log([
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
  ], "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
])


const startLog = new SbLogField('start');
const entryLog = new SbLogField('entry');
const copyLog = new SbLogField('copy');
const createLog = new SbLogField('create');
const deleteLog = new SbLogField('delete');
const informLog = new SbLogField('inform');
const warnLog = new SbLogField('warn');
const compileLog = new SbLogField('compile');
const endLog = new SbLogField('end');


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

const verticalLogTwo = new SbLogVertical([createLog, createLog], {
  separatorBuilder: separator.vLine(2, 2, 'solidBold'),
  prelog: prelog.border('solidBold')
})

console.log()
verticalLogTwo.log([
  [["./dark.css", "./light.css"], ["100kb", "100kb"]],
  [["./dark.css", "./light.css"], ["100kb", "100kb"]]
])


const tableLog = new SbLogTable({
  rows: [
    {
      columns: [
        {},
        {},
        {}
      ]
    },
    {
      columns: [{
        width: 63
      },
      {}]
    }
  ]
});
tableLog.log([
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inv"
  ],
  [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e"
  ]
]);
