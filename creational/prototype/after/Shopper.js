class Shopper {

    constructor(name='unnamed person') { // constructor should have default value
        this._name = name;
        this._shoppingList = [];
    }

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get shoppingList() {
        return this._shoppingList.join(', ');
    }

    addItemToList(item) {
        this._shoppingList.push(item);
    }

    // the clone method
    clone() {
        // 1. Clone class methods
        //
        // 1. create prototype
        const proto = Object.getPrototypeOf(this);
        // 2. Create instance
        const cloned = Object.create(proto)

        // 2. clone instance's variables
        cloned._name = this._name
        cloned._shoppingList = [...this._shoppingList]

        return cloned;
    }

}

module.exports = Shopper;
