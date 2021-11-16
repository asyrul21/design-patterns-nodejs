class Conductor{
	constructor(){
		this.history = []
		this.undone = []
	}

	run(command){
		console.log(`Executing command: ${command.name}`);
		command.execute()

		// add to history
		this.history.push(command)
	}

	printHistory(){
		this.history.forEach(command => console.log(command.name))
	}

	// the command pattern allows for powerful features
	// such as the Undo and Redo methods
	undo(){
		const command = this.history.pop() // get the last one
		console.log(`Undo ${command.name}`);
		command.undo();
		this.undone.push(command)
	}

	redo(){
		const command = this.undone.pop()
		console.log(`Redo ${command.name}`);
		command.execute()
		this.history.push(command)
	}
}

module.exports = new Conductor()