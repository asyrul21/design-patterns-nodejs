# The Prototype

Specify the kind objects (like a template) to be created using Prototypical Instance, and create new objects and copying this prototype.

The `scout_prototype` represents the Prototypical Class that we can use to create other somewhat similar objects. They should have the `clone()` method.

## Example Problem

Sometimes object creation follows a common flow:

```javascript
var Shopper = require('./Shopper');

var alex = new Shopper('Alex Banks');
alex.addItemToList('camping knife');
alex.addItemToList('tent');
alex.addItemToList('backpack');
alex.addItemToList('map');
alex.addItemToList('slingshot');

var eve = new Shopper('Eve Porcello');
eve.addItemToList('camping knife');
eve.addItemToList('tent');
eve.addItemToList('backpack');
eve.addItemToList('map');
eve.addItemToList('reading light');
```

Hence we can define a prototype:

```javascript
const Shopper = require("./Shopper")

const scout = new Shopper();
scout.addItemToList('camping knife');
scout.addItemToList('tent');
scout.addItemToList('backpack');
scout.addItemToList('map');

module.exports = scout;
```

Then clone this prototype when creating an instace:

```javascript
class Shopper {

    constructor(name='unnamed person') { // constructor should have default value
        this._name = name;
        this._shoppingList = [];
    }

	// ...

    addItemToList(item) {
        this._shoppingList.push(item);
    }

    // the clone method
    clone() {
        // 1. Clone class methods
        //
        // 1. create prototype
        const proto = Object.getPrototypeOf(this);
        // 2. Create instance
        const cloned = Object.create(proto)

        // 2. clone instance's variables
        cloned._name = this._name
        cloned._shoppingList = [...this._shoppingList]

        return cloned;
    }

}

module.exports = Shopper;

```

client:

```javascript
var scout_prototype = require('./scout_prototype');

var alex = scout_prototype.clone();
alex.name = "Alex Banks"
alex.addItemToList('slingshot');

var eve = scout_prototype.clone();
eve.name = "Eve Porcello"
eve.addItemToList('reading light');
```