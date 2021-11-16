# The Command

Encapsulating a request as an object. This lets you parameterize with different requests, queue or log requests, and support undoable operations.

This is a very powerful pattern as it allows for features such as Undoing and Redoing.

## Example Problem

Let's say we are building a Command Line app that can create a text file.

```javascript
var { createInterface }  = require('readline');
var rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('create <fileName> <text> | exit');
rl.prompt();

rl.on('line', input => {

    var [ commandText, ...remaining ] = input.split(' ')
    var [ fileName, ...fileText ] = remaining
    var text = fileText.join(' ')

    switch(commandText) {

        case "exit":
            console.log('TODO: Exit');
            break;

        case "create" :
            console.log(`TODO: Create File ${fileName}`);
            console.log('file contents:', text);
            break;

        default :
            console.log(`${commandText} command not found!`);
    }

    rl.prompt();

});
```

In the Switch statement, we can use the Command pattern to encapsulate the actions as a Command object. We then need a Conductor that monitors the execution of these commands.

The conductor:

```javascript
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

// export as singleton
module.exports = new Conductor()
```

The commands:

```javascript
class ExitCommand{
	get name(){
		return "...exit bye!"
	}

	// every command must implement the execute
	execute(){
		process.exit(0)
	}
}

class CreateCommand{
	constructor(fileName, text){
		this.fileName = fileName
		this.body = text
		this.fullPath = path.join(__dirname, fileName)
	}

	get name(){
		return `create ${this.fileName}`
	}

	// every command must implement the execute
	execute(){
		writeFile(this.fullPath, this.body, f => f)
	}

	undo(){
		unlink(this.fullPath, f => f)
	}
}
```

The client:

```javascript
// create a conductor
const conductor = require("./conductor")
// get the commands
const { ExitCommand, CreateCommand } = require("./commands")

var { createInterface }  = require('readline');
var rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('create <fileName> <text> | history| undo| redo | exit');
rl.prompt();

rl.on('line', input => {

    var [ commandText, ...remaining ] = input.split(' ')
    var [ fileName, ...fileText ] = remaining
    var text = fileText.join(' ')

    switch(commandText) {

        case "history":
            conductor.printHistory()
            break;

        case "undo":
            conductor.undo()
            break;

        case "redo":
            conductor.redo()
            break;

        case "exit":
            // console.log('TODO: Exit');
            conductor.run(new ExitCommand())
            break;

        case "create" :
            // console.log(`TODO: Create File ${fileName}`);
            // console.log('file contents:', text);
            conductor.run(new CreateCommand(fileName,  text))
            break;

        default :
            console.log(`${commandText} command not found!`);
    }

    rl.prompt();

});
```