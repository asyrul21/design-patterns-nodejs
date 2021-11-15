const logger = require("./Logger")
const Shopper = require("./Shopper")
const Store = require("./Store")

// const logger = new Logger().getInstance();

logger.log("Starting app...")

const alex = new Shopper('alex', 500)
const skiShop = new Store("Steep and Deep Supplies", [
	{
		item: "Downhill Skis",
		qty: 5,
		price: 750
	},
	{
		item: "Knit Hat",
		qty: 20,
		price: 50
	}
])

logger.log("finished config...")
console.log(`${logger.count} logs total`) //  returns 4 - correct
logger.logs.map(log => console.log(`	${log.message}`))