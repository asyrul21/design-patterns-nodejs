// var fs = require('fs');
var path = require('path');

const FS_PROXY = require("./FS_Proxy")
const fs = new FS_PROXY(require("fs")) 
// the fs goes through a proxy which will
// control its access

var txtFile = path.join(__dirname, 'Readme.txt');
var mdFile = path.join(__dirname, 'Readme.md');

var result = (error, contents) => {

    if (error) {
        console.log('\x07');
        console.error(error);
        process.exit(0);
    }

    console.log('reading file...');
    console.log(contents);

}

fs.readFile(txtFile, 'UTF-8', result);
fs.readFile(mdFile, 'UTF-8', result);
