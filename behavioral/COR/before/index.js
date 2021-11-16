var Store = require('./Store');
var inventory = require('./inventory');

var skiShop = new Store('Steep and Deep', inventory.floor);

// var searchItem = 'ski hats';
var searchItem = 'ski poles'; 
// this line returns undefined, because Ski poles are not in the floor, it should be in the backroom

var results = skiShop.find(searchItem);

console.log( results );
