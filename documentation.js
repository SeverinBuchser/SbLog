const fs = require('fs');
const path = require('path');
const sbDoc = require('sb-doc');

const root = path.resolve();
const srcDir = 'src';
const docDir = 'doc';

function walk(dir, filter, callback) {
  fs.readdirSync(dir).forEach(file => {
  	let filePath = path.join(dir, file);
  	let stats = fs.statSync(filePath)
  	if (stats.isDirectory()) {
  		walk(filePath, filter, callback);
  	} else if (stats.isFile() && filter(filePath)) {
  		callback(filePath);
  	}
  });
}

walk(srcDir, filePath => filePath.endsWith('.js'), filePath => {
  let fileDir = path.dirname(filePath).replace(srcDir, '').replace(path.sep, '');
  let fileName = path.basename(filePath);
  buildDoc(fileDir, fileName);
})

// buildDoc('log/table', 'class.js')

function buildDoc(fileDir, fileName) {
  try {
    let srcFilePath = path.resolve(root, srcDir, fileDir, fileName);
    let doc = sbDoc(srcFilePath);
    fs.mkdirSync(path.resolve(root, docDir, fileDir), {recursive: true});
    fs.writeFileSync(
      path.format({
        dir: path.resolve(root, docDir, fileDir),
        name: doc.moduleDoc.name,
        ext: '.doc.md'
      }),
      doc.markdown
    );
  } catch (err) {
    console.log(err.message)
  }
}
