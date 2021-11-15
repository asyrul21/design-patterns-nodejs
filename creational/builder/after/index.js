// var Person = require('./Person')
const PersonBuilder = require("./personBuilder")


// Employees
var sue = new PersonBuilder('Sue').makeEmployee().makeManager(60).build();
var bill = new PersonBuilder('Bill').makeEmployee().makePartTime().build();
var phil = new PersonBuilder('Phil').makeEmployee().build();

// Shoppers
// var charles = new Person('Charles', false, false, 0, 500, ['jeans', 'sunglasses']);
var charles = new PersonBuilder('Charles')
					.withMoney(500)
					.withList(['jeans', 'sunglasses'])
					.build()

var tabbitha = new PersonBuilder('Tabbitha').withMoney(1000).build()

console.log(charles.toString());
console.log(bill.toString());
console.log(sue.toString());
