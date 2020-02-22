


const sqlite3 = require("sqlite3").verbose();


function addUser(username, password, salt){
	//Do stuff
}

function userInDB(username, password, salt){
	//Do stuff
	let db = new sqlite3.Database('./db/login.db', sqlite3.OPEN_READ, (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to login database');
	})

	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Closed the login databse connection');
	})
}


module.exports.addUser = addUser;
module.exports.userInDB = userInDB;