# The Factory

Define an Interface for creating an object, then let subclasses decide which class to instantiate.

Factory Method lets a class DEFER INSTANTIAION to subclasses.

## Example Problem

Let's say we have a few types of users - Shoppers and Employees, both of which share some variables and/or instances.

Rather explicitly instantiating these users in Client:

```javascript
var alex = new Shopper('Alex Banks', 100);
var eve = new Employee('Eve Porcello', 100, 'This and That');
```

We can use a Factory Method to let the subclass decides which class to instantiate.

```javascript
const userFactory = require("./userFactory")

var alex = userFactory('Alex Banks', 100);
var eve = userFactory('Eve Porcello', 100, 'This and That');
```

The factory method:

```javascript
const Employee = require("./Employee")
const Shopper = require("./Shopper")

const userFactory = (name, money=0, type, employer) => {
	if(type==="employee"){
		return new Employee(name, money, employer)
	}else {
		return new Shopper(name, money)
	}
}

```