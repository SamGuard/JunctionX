express = require("express");
fs = require("fs");

router = express.Router();



router.get("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	
	console.log("connection of testing sqlite");
	
	//put code here
	const sqlite3 = require("sqlite3").verbose();

	let db = new sqlite3.Database('./db/killingNemo.db', sqlite3.OPEN_READWRITE, (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to the killingNemo database.');
	});


	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Close the database connection.');
	})
});


module.exports = router;