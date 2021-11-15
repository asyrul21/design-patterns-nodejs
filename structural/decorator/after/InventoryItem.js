class InventoryItem {

    constructor(name, price) {
        this.name = name
        this.price = price
    }

    print() {
        console.log(`${item.name} costs ${item.price}`)
    }

}

class GoldenInventoryItem{
    constructor(baseItem){
        // alter the baseItem's name
        this.name = `Golden ${baseItem.name}`
        // alter its price
        this.price = 1000 + baseItem.price
    }
}

class DiamondInventoryItem{
    constructor(baseItem){
        // alter the baseItem's name
        this.name = `Diamond ${baseItem.name}`
        // alter its price
        this.price = 2000 + baseItem.price
        // add more functionality
        this.cutClass = true;
    }

    print(){
        console.log(`${this.name} costs a lot of money...`);
    }
}

module.exports = {InventoryItem, GoldenInventoryItem, DiamondInventoryItem};
