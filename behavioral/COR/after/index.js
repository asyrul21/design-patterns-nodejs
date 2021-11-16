var Store = require('./Store');
var inventory = require('./inventory');

var skiShop = new Store('Steep and Deep', inventory); // pass entire catalogue

// var searchItem = 'ski hats';
var searchItem = 'powder skis'; 

var results = skiShop.find(searchItem);

console.log( results );
