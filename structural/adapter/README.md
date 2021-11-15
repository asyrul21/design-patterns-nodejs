# The Adapter

Converts an interface of a class, into another interface that the client expects. Adapter lets classes work together, which could not otherwise, due to incompatible interfaces.

The Adapter MUST implement the EXACT same interfaces/variables as the subject.

## Example Problem:

We may have some code which is designed to run specifically in a certain environment:

```javascript
console.log( "localStorage length: ", localStorage.length );

var uid = localStorage.getItem("user_id");

console.log( "user_id: ", uid );

if (!uid) {
    console.log('User ID not found. Setting the user id and token...');
    localStorage.setItem("token", "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
    localStorage.setItem("user_id", "12345");
} else {
    console.log('User ID found.', uid);
    console.log('clearning the User ID...');
    localStorage.clear();
}
```
This code will fail, and you will get a `ReferenceError: localStorage is not defined` error.

## The Adapter

The adapter class aims to mimic the Browser's `localStorage` behaviour which prevents the code above from breaking. Have a scan on which of the methods are being used - `getItem`, `setItem`, `clear`, etc. We will build a class that contains all of these methods:

```javascript
const { writeFile, existsSync, readFileSync, unlink} = require("fs")

class LocalStorage{
	constructor(){
		if(existsSync('localStorage.json')){
			console.log("loading items from localStorage.json");
			const txt = readFileSync('localStorage.json')
			this.items = JSON.parse(txt)
		}else{
			this.items = {}
		}
	}

	get length(){
		return Object.keys(this.items).length;
	}

	getItem(key){
		return this.items[key]
	}

	setItem(key, value){
		this.items[key] = value;
		writeFile('localStorage.json', JSON.stringify(this.items), error => {
			if(error){
				console.error(error)
			}
		})
	}

	clear(){
		this.items = {};
		unlink('localStorage.json', () => {
			console.log('localStorage file removed.')
		})
	}
}

module.exports = new LocalStorage();
```

And simply import it at the top of the client file:

```javascript
const localStorage = require("./localStorage") // the adapter

console.log( "localStorage length: ", localStorage.length );

var uid = localStorage.getItem("user_id");

console.log( "user_id: ", uid );

if (!uid) {
    console.log('User ID not found. Setting the user id and token...');
    localStorage.setItem("token", "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
    localStorage.setItem("user_id", "12345");
} else {
    console.log('User ID found.', uid);
    console.log('clearning the User ID...');
    localStorage.clear();
}
```


