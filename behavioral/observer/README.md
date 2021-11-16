# The Observer

Define one to many dependency between object so that when one object changes state, all its dependents are notified and updated automatically.

## Example Problem

Let's we we have Shoppers and a Mall which needs to listen to two Stores for new Sales:

```javascript
var Store = require('./Store');
var Shopper = require('./Shopper');
var Mall = require('./Mall');

var catsAndThings = new Store("Cats & Things");
var insAndOuts = new Store("Ins and Outs");

// consumers need to listen to Store's new sales
var alex = new Shopper("Alex");
var eve = new Shopper("Eve");
var sharon = new Shopper("Sharon");
var mike = new Shopper("Mike");

var valleyMall = new Mall();
```

Add an interface method which the Obervable can call:

```javascript
class Shopper {

    constructor(name) {
        this.name = name;
    }

    // implement a method that the observable can call
    notify(storeName, discount){
        console.log(`${this.name}, there is a sale at ${storeName}! ${discount}% off everything!`);
    }
}
```

Add the `subscribers` variable and modify the `sale` method of the observable:

```javascript
class Store {

    constructor(name) {
        this.name = name;
        // add subscribers array
        this.subscribers = []
    }

    // subscribe method
    subscribe(observer){
        this.subscribers.push(observer)
    }

    sale(discount) {
        // console.log(`Announce sale at ${this.name}, ${discount}% off everything!`);
        this.subscribers.forEach((observer) => observer.notify(this.name, discount))
    }
}
```