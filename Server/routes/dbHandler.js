


const sqlite3 = require("sqlite3").verbose();


var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};


function addUser(username, password){
	//Do stuff
}

function userInDB(username, password){
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