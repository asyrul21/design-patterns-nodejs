# The Singleton 

Ensure a class only has one and only one intance, and provide a global point of access to it.

## Example Problem

Let's say we have a Logger class which we only want to instantiate once. Typically, the class definition would look something like:

```javascript
class Logger {
	constructor(){
		this.logs = []
	}

	get count (){
		return this.logs.length;
	}

	log(message){
		const timestamp = new Date().toISOString()
		this.logs.push({ message, timestamp})
		console.log(`${timestamp} - ${message}`)
	}
}

module.exports = Logger
```

Then the client would instantiate this class:

```javascript
const logger = new Logger()
```

Doing things this way would create multiple instances of the same class. For example, as we use the Logger in the `Shopper.js`,`Store.js` and the client, each file has its own instance of Logger. Client:

```javascript
const Logger = require("./Logger")
const Shopper = require("./Shopper")
const Store = require("./Store")

const logger = new Logger();

logger.log("Starting app...")

const alex = new Shopper('alex', 500)
const skiShop = new Store("Steep and Deep Supplies", [
	{
		item: "Downhill Skis",
		qty: 5,
		price: 750
	},
	{
		item: "Knit Hat",
		qty: 20,
		price: 50
	}
])

logger.log("finished config...")
console.log(`${logger.count} logs total`) // will give 2 - but incorrect - 2 only includes Logger instance in Main
logger.logs.map(log => console.log(`	${log.message}`))
```

As we did `logger.count` it only shows 2 (at top level / main), instead is should include the logs in `Shopper.js` and `Store.js` as well.

To solve this we can use the Singleton pattern:

```javascript
class Logger {
	constructor(){
		this.logs = []
	}

	get count (){
		return this.logs.length;
	}

	log(message){
		const timestamp = new Date().toISOString()
		this.logs.push({ message, timestamp})
		console.log(`${timestamp} - ${message}`)
	}
}

class Singleton {
	constructor(){
		if(!Singleton.instance){
			Singleton.instance = new Logger()
		}
	}

	getInstance(){
		return Singleton.instance
	}
}

// export the Singleton
module.exports = Singleton;
```

Then in client:

```javascript
const logger = require("./Logger") // import the Singleton
const logger = new Logger().getInstance()
```

## Javascript Feature

However, this can easily be done in Javascript. Simple by doing:

```javascript
class Logger {
	constructor(){
		this.logs = []
	}

	get count (){
		return this.logs.length;
	}

	log(message){
		const timestamp = new Date().toISOString()
		this.logs.push({ message, timestamp})
		console.log(`${timestamp} - ${message}`)
	}
}

// in Node JS
module.exports = new Logger() // export the same instance
```

In client:

```javascript
const logger = require("./Logger") // import as usual
```