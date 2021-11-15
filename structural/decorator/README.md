# The Decorator

Attach additional responsibilities/features to an object dynamically. This provides a flexible alternative to Subclassing for extending functionality.

Lets say we have an InventoryItem that we sell:

```javascript
var Shopper = require('./Shopper');
var InventoryItem = require('./InventoryItem');

var alex = new Shopper('Alex', 100);

var walkman = new InventoryItem("Walkman", 29.99);
var necklace = new InventoryItem("Necklace", 9.99);

alex.purchase(necklace);
alex.purchase(walkman);

alex.printStatus();
```

How would we dynamically add features to those items? Let's say, transform the neckalce into a Golden Necklace, the walkman into a Golden Walkman, etc. We can use a Decorator:

```javascript
class GoldenInventoryItem{
    constructor(baseItem){
        // alter the baseItem's name
        this.name = `Golden ${baseItem.name}`
        // alter its price
        this.price = 1000 + baseItem.price
    }
}

class DiamondInventoryItem{
    constructor(baseItem){
        // alter the baseItem's name
        this.name = `Diamond ${baseItem.name}`
        // alter its price
        this.price = 2000 + baseItem.price
        // add more functionality
        this.cutClass = true;
    }

    print(){
        console.log(`${this.name} costs a lot of money...`);
    }
}
```

The Client:

```javascript
var Shopper = require('./Shopper');
// var InventoryItem = require('./InventoryItem');

// lets say we want to provde a different variation of inventory item
var {
	InventoryItem, 
	GoldenInventoryItem, 
	DiamondInventoryItem } = require('./InventoryItem');

var alex = new Shopper('Alex', 6000);

var walkman = new InventoryItem("Walkman", 29.99);
var necklace = new InventoryItem("Necklace", 9.99);

var goldNecklace = new GoldenInventoryItem(necklace)
const diamond_gold_necklace = new DiamondInventoryItem(goldNecklace)

const diamondWalkman = new DiamondInventoryItem(walkman)

alex.purchase(diamond_gold_necklace);
alex.purchase(diamondWalkman);

alex.printStatus();

```