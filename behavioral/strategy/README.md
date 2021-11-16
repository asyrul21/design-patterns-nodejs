# The Strategy

Defining a family of algorithms, encapsulate each one, and make them interchangeable. This allows the algorithms to vary independently from clieant that use it.

## Example Problem

Consider the following Logger class. There is only one concrete implementation of the `log` method. The Strategy pattern allows us to dynamically change this implementation based on different strategies/algorithms.

```javascript
class Logger {

    constructor() {
        this.logs = [];
    }

    get count() {
        return this.logs.length
    }

    log(message) {
        const timestamp = new Date().toISOString()
        this.logs.push({ message, timestamp })
        console.log(`${timestamp} - ${message}`)
    }

}
```

To implement strategy we need a Strategy class with `static` methods. Each of those methods represent different strategies of implemetation.

```javascript
class LogStrategy{

	// strategies are defined as Static methods
	static noDate(timestamp, message){
		console.log(message);
	}

	static toFile(timestamp, message){
		const fileName = path.join(__dirname, 'logs.txt')
		appendFile(fileName, `${timestamp} - ${message} \n`, error => {
			if(error){
				console.log(`Error writing to file`);
				console.error(error)
			}
		})

	}

	static toConsole(timestamp, message){
		console.log(`${timestamp} - ${message}`)
	}

	static toMorseCode(timestamp, message){
		const morseCode = morse.encode(message)
		console.log(morseCode);
	}

	static none(){
	}

}
```

Then implement this Strategy class in the Logger class, assigning a default strategy in Constructor:

```javascript
class Logger {

    constructor(strategy="toConsole") {
        this.logs = [];
        // set default strategy
        this.strategy = LogStrategy[strategy];
    }

    get count() {
        return this.logs.length
    }

    // change strategy
    changeStrategy(newStrategy){
        this.strategy = LogStrategy[newStrategy]
    }

    log(message) {
        const timestamp = new Date().toISOString()
        this.logs.push({ message, timestamp })
        // console.log(`${timestamp} - ${message}`)

        // use strategy
        this.strategy(timestamp, message)
    }

}
module.exports = new Logger(config.logs.strategy);
```

The client:

```javascript
var logger = require('./Logger');

logger.log('Hello World');
logger.log('Hi World');
logger.log('Yo World');

// change strategy
// logger.changeStrategy('toFile')
logger.changeStrategy('none')

logger.log('Hello World');
logger.log('Hi World');
logger.log('Yo World');
```