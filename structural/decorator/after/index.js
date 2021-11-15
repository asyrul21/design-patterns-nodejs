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
