# The Proxy

Provide a surrogate or placeholder or GUARD/PROXY to another expensive object in order to control access to that object. Also to manage remote resource, provide data validation, security, cache data, and log actions.

Just like Adapter, a Proxy needs to implement the EXACT same interfaces as the subject.

## Example Problem

The Code below reads file directly using the `fs` extension.

```javascript
var fs = require('fs');
var path = require('path');

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
```

Let's create a proxy to validate and only allow reading of Markdown `.md` files.

```javascript
class FS_Proxy{
	constructor(fs_subject){
		this.fs = fs_subject
	}

	readFile(path, format, callback){
		// the proxy check
		if(!path.match(/.md$|.MD$/)){
			return callback(new Error(`Can only read Markdown files`))
		}
		// calls the actual readFile
		this.fs.readFile(path, format, (err, contents) => {
			if(err){
				console.error(error)
				return callback(error)
			}
			return callback(null, contents)
		})
	}
}

module.exports = FS_Proxy;
```

The client:

```javascript
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

fs.readFile(txtFile, 'UTF-8', result); // this should throw an error
fs.readFile(mdFile, 'UTF-8', result);

```