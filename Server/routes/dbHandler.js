var crypto = require('crypto');


const sqlite3 = require("sqlite3").verbose();


var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function verify(attemptPassword, salt){
	var password = "put db password here";

	if(sha512(attemptPassword, salt) == password){
		return true;
	}
	return false;
}

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