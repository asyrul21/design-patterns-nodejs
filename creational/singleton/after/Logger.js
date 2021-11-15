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

// typical Singleton class
//
// class Singleton {
// 	constructor(){
// 		if(!Singleton.instance){
// 			Singleton.instance = new Logger
// 		}
// 	}

// 	getInstance(){
// 		return Singleton.instance
// 	}
// }

// module.exports = Singleton;

// in Node JS
module.exports = new Logger() // export the same instance