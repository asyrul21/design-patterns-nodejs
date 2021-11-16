class Storage{
	constructor(name, inventory=[], deliveryTime=0){
		this.name = name
		this.inventory = inventory
		this.deliveryTime = deliveryTime

		// points to next if necessary
		this.next = null;
	}

	lookInLocalInventory(itemName){
		const index = this.inventory.map(item => item.name).indexOf(itemName)
		return this.inventory[index]
	}

	// set next node which chains the responsibility to multiple nodes
	setNext(storage){
		this.next = storage;
	}

	find(itemName){
		const found = this.lookInLocalInventory(itemName)
		if(found){
			return {
				name: found.name,
				qty: found.qty,
				location: this.name,
				deliveryTime: this.deliveryTime === 0 ? "Now": `${this.deliveryTime} day(s)`
			}
		}else if(this.next){
			// find in next's storage
			return this.next.find(itemName)
		}else{
			return `we do not carry ${itemName}`
		}
	}
}

module.exports = Storage