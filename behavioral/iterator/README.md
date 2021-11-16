# The Iterator

Provide a way to access the elements of an aggregate object (data in a collection) SEQUENTIALLY without exposing its underlying representation.

Usually works with a collection of data.

## Example Problem

Let's try and traverse through an array of inventory items, using an Iterator. As we press the keyboard arrows right/left is should show the next/previous item, and if we press up/down it should take us to the first/last item.

```javascript
var InventoryItem = require('./InventoryItem');

require('readline').emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.log('Press any direction key...');

var inventory = [
    new InventoryItem("Poles", 9.99),
    new InventoryItem("Skis", 799.99),
    new InventoryItem("Boots", 799.99),
    new InventoryItem("Burgers", 5.99),
    new InventoryItem("Fries", 2.99),
    new InventoryItem("Shake", 4.99),
    new InventoryItem("Jeans", 59.99),
    new InventoryItem("Shoes", 39.99)
];

process.stdin.on('keypress', (str, key) => {

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    switch(key.name) {

        case 'right' :
            process.stdout.write('right');
            break;

        case 'left' :
            process.stdout.write('left');
            break;

        case 'down' :
            process.stdout.write('down');
            break;

        case 'up' :
            process.stdout.write('up');
            break;

        case 'c' :
            if (key.ctrl) {
                process.exit()
            }
    }

});
```

We can create an Iterator class, which takes an array as argument:

```javascript
class Iterator{
	constructor(items=[]){
		this.index = 0;
		this.items = items;
	}

	first(){
		return this.items[0]
		// javascript also allows:
		// [first] = this.items;
	}

	last(){
		const [last] = [...this.items.reverse()]
		return last;
	}

	next(){
		if(this.hasNext()){
			this.index += 1;
		}
		return this.current()
	}

	hasNext(){
		return this.index < this.items.length - 1
	}

	current(){
		return this.items[this.index]
	}

	prev(){
		if(this.index !== 0){
			this.index -= 1;
		}
		return this.current()
	}

}
```

Then pass the array in its constructor in client:

```javascript
var InventoryItem = require('./InventoryItem');
const Iterator = require("./Iterator")

require('readline').emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.log('Press any direction key...');

var inventory = new Iterator([
    new InventoryItem("Poles", 9.99),
    new InventoryItem("Skis", 799.99),
    new InventoryItem("Boots", 799.99),
    new InventoryItem("Burgers", 5.99),
    new InventoryItem("Fries", 2.99),
    new InventoryItem("Shake", 4.99),
    new InventoryItem("Jeans", 59.99),
    new InventoryItem("Shoes", 39.99)
])

process.stdin.on('keypress', (str, key) => {

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    switch(key.name) {

        case 'right' :
            inventory.next().writeLn();
            // process.stdout.write('right');
            break;

        case 'left' :
            inventory.prev().writeLn();
            // process.stdout.write('left');
            break;

        case 'down' :
            inventory.last().writeLn();
            // process.stdout.write('down');
            break;

        case 'up' :
            inventory.first().writeLn();
            // process.stdout.write('up');
            break;

        case 'c' :
            if (key.ctrl) {
                process.exit()
            }
    }

});
```