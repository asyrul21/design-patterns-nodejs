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

module.exports = Store;
