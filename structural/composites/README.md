# The Composite Pattern

Composing objects into Tree Structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

Objects are organised as leaves and branches.

A Composite, or the "group" of objects MUST implement the same interface as the individual objects/items the group contains.

## Example Problem

Consider the following example, where each CatalogItem can be "Grouped" together as a Composite.

```javascript
var CatalogItem = require('./CatalogItem');

var boots = new CatalogItem("Leather Boots", 79.99);
var sneakers = new CatalogItem("Kicks", 39.99);
var flipFlops = new CatalogItem("California work boots", 19.99);

console.log( 'boots total: ', `$${boots.total}` );

boots.print();
sneakers.print();

```

We create the Composite/Group Class. The Composite class MUST implement the SAME interfaces as the Leaf:

```javascript
class CatalogGroup{
	constructor(name, composites=[]){
		this.name = name,
		this.composites = composites
	}

	get total(){
		return this.composites.reduce( (total, nextItem) => {
			return total + nextItem.total
		}, 0)
	}

	print(){
		console.log(`\n${this.name.toUpperCase()}`);
		this.composites.forEach(item => item.print())
	}
}

module.exports = CatalogGroup
```

The Client:

```javascript
var CatalogItem = require('./CatalogItem');
const CatalogGroup = require("./CatalogGroup")

var boots = new CatalogItem("Leather Boots", 79.99);
var sneakers = new CatalogItem("Kicks", 39.99);
var flipFlops = new CatalogItem("California work boots", 19.99);

// new group
const group_shoes = new CatalogGroup("Shoes and Such", [boots, sneakers, flipFlops])

const group_food = new CatalogGroup("Food for while you try on clothes", [
	new CatalogItem("Milkshake", 5.99),
	new CatalogItem("French Fries", 3.99)
])

const keychain = new CatalogItem("Key Chain", .99)

// Composites allows us to Groups AND Single Items (the keychain)
// as we create the group, since they both share the same interface
const catalog = new CatalogGroup("Clothes and Food", [keychain, group_shoes, group_food])
console.log(`$${catalog.total}`);
catalog.print()
// the two lines above runs recursively on all groups an items in the Catalog Composite
```

Composites allows us to Groups AND Single Items (the keychain) as we create the group, since they both share the same interface. Methods invoked on the branch of tree are executed recursively throughout its leaves.