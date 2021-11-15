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