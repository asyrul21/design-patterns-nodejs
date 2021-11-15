
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