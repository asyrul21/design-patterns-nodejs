const LogStrategy = require("./LogStrategy")
const config = require("./config.json")

class Logger {

    constructor(strategy="toConsole") {
        this.logs = [];
        // set strategy
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
