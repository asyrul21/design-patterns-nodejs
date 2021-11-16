class Shopper {

    constructor(name) {
        this.name = name;
    }

    // implement a method that the observable can call
    notify(storeName, discount){
        console.log(`${this.name}, there is a sale at ${storeName}! ${discount}% off everything!`);
    }
}

module.exports = Shopper;
