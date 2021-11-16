# Chain of Responsibility

Avoid coupling the sender of a request to its receiver, by giving more than one object a chance to handle the request. This is done by chaining the receiving objects and pass the request along the chain.

## Example Problem

Consider conducting a Search on an Inventory databse:

```javascript
var Store = require('./Store');
var inventory = require('./inventory');

var skiShop = new Store('Steep and Deep', inventory.floor);

// var searchItem = 'ski hats';
var searchItem = 'ski poles'; 
// this line returns undefined, because Ski poles are not in the floor, it should be in the backroom

var results = skiShop.find(searchItem);

console.log( results );
```

We can use the Chain of Responsibility pattern to improve the Store's `find` method. We create a class called Storage, which takes an inventory list as an argument and has a variable called `this.next` to set the next Storage node. The class also implements the `setNext` method to set the next node, and the `find` method simply makes use of the `this.next` chain of responsibility benefits.

```javascript
class Storage{
	constructor(name, inventory=[], deliveryTime=0){
		this.name = name
		this.inventory = inventory
		this.deliveryTime = deliveryTime

		// points to next if necessary
		this.next = null;
	}

	lookInLocalInventory(itemName){
		const index = this.inventory.map(item => item.name).indexOf(itemName)
		return this.inventory[index]
	}

	// set next node which chains the responsibility to multiple nodes
	setNext(storage){
		this.next = storage;
	}

	find(itemName){
		const found = this.lookInLocalInventory(itemName)
		if(found){
			return {
				name: found.name,
				qty: found.qty,
				location: this.name,
				deliveryTime: this.deliveryTime === 0 ? "Now": `${this.deliveryTime} day(s)`
			}
		}else if(this.next){
			// find in next's storage
			return this.next.find(itemName)
		}else{
			return `we do not carry ${itemName}`
		}
	}
}
```

We then implement this in the Store class:

```javascript
const Storage = require("./Storage")

class Store {

    constructor(name, inventory) {
        this.name = name;
    
        const floor = new Storage('store floor', inventory.floor)
        const backroom = new Storage('store backroom', inventory.backroom)
        const localStore = new Storage('nearby store', inventory.localStore, 1)
        const warehouse = new Storage('warehouse', inventory.warehouse, 5)

        floor.setNext(backroom)
        backroom.setNext(localStore)
        localStore.setNext(warehouse)

        // set start position
        this.storage = floor;
    }

    find(itemName) {
        // var index = this.inventory.map(item => item.name).indexOf(itemName);
        // return this.inventory[index];

      return this.storage.find(itemName)
    }

}
```

The client:

```javascript
var Store = require('./Store');
var inventory = require('./inventory');

var skiShop = new Store('Steep and Deep', inventory); // pass entire catalogue

// var searchItem = 'ski hats';
var searchItem = 'powder skis'; 

var results = skiShop.find(searchItem);

console.log( results );

```



