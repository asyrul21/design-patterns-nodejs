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


// some logging
//
// console.log( 'boots total: ', `$${boots.total}` );

// boots.print();
// sneakers.print();

// // group/composite methods
// console.log(`Shoes total: $${group_shoes.total}`);
// group_shoes.print()
