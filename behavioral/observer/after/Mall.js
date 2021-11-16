class Mall {

    constructor() {
        this.sales = [];
    }

    // implement a method that the observable can call
    notify(storeName, discount){
        this.sales.push({ storeName, discount})
    }

}

module.exports = Mall;
