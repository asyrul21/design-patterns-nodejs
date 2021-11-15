# The Builder

Seperate the CONSTRUCTION of a complex object from its REPRESENTATION. This is so that the same construction process can create different representations.

## Example Problem

Consider creating the following instances, the constructor has a long list of arguments, and based on those arguments, determine whether the user is an Employee or a Shopper. What does those arguments mean? 

This is an Anti Pattern called the Telescoping Constructor.

```javascript
// Employees
var sue = new Person('Sue', true, true, 60);
var bill = new Person('Bill', true, false, 20);
var phil = new Person('Phil', true, false);

// Shoppers
var charles = new Person('Charles', false, false, 0, 500, ['jeans', 'sunglasses']);
var tabbitha = new Person('Tabbitha', false, false, 0, 1000);
```

We can create a `Person Builder` class to solve this problem. The key to Chaining method calls is to `return this`

```javascript
const Person = require("./Person")

class PersonBuilder{
	constructor(name){
		this.name = name
	}

	makeEmployee(){
		this.isEmployee =  true;
		// return the instance
		// this is how the chaining is done
		return this;
	}

	makeManager(hours=40){
		this.isManager = true;
		this.hours = hours;
		return this;
	}

	makePartTime(hours=20){
		this.hours = hours;
		return this;
	}

	withMoney(money){
		this.money = money
		return this
	}

	withList(list=[]){
		this.shoppingList = list;
		return this;
	}

	// the build method
	build(){
		return new Person(this)
	}
}

module.exports = PersonBuilder
```

Now, we need to modify the Person class, to take only ONE argument in constructor- the builder.

```javascript
class Person {
    constructor(builder) {
        this.name = builder.name
        this.isEmployee = builder.isEmployee;
        this.isManager = builder.isManager;
        this.hours = builder.hours || 0;
        this.money = builder.money || 0;
        this.shoppingList = builder.shoppingList || [];
    }

    toString() {
        return JSON.stringify(this);
    }

}

module.exports = Person;
```

Client:

```javascript
const PersonBuilder = require("./personBuilder")


// Employees
var sue = new PersonBuilder('Sue').makeEmployee().makeManager(60).build();
var bill = new PersonBuilder('Bill').makeEmployee().makePartTime().build();
var phil = new PersonBuilder('Phil').makeEmployee().build();

// Shoppers
var charles = new PersonBuilder('Charles')
					.withMoney(500)
					.withList(['jeans', 'sunglasses'])
					.build()

var tabbitha = new Person('Tabbitha').withMoney(1000).build()

```