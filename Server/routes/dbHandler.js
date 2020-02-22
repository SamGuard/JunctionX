var crypto = require('crypto');


const sqlite3 = require("sqlite3").verbose();

console.log("openning sb");
let db = new sqlite3.Database('./routes/db/login.db', sqlite3.OPEN_WRITE, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to login database');

	
});

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL, pass TEXT NOT NULL UNIQUE, salt TEXT NOT NULL UNIQUE)');

db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Login database created');
});




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
	var password = "CCSS4F4";

	if(sha512(attemptPassword, salt) == password){
		return true;
	}
	return false;
}

function addUser(username, password){
	//Do stuff
	let db = new sqlite3.Database('./routes/db/login.db', sqlite3.OPEN_WRITE, (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to login database');
	});

	let salt = genRandomString(32);
	let user = [username, "password123", "salttest"];

	let sql = `INSERT INTO users(username, pass, salt) VALUES(?, ?, ?)`;


	console.log("running");
	db.run(sql, user, function(err) {
		if (err) {
			return console.error(err.message);
		}
		console.log(`A user has been created with id ${this.lastID}`);
	});

	db.close();
}

function userInDB(username, password){
	//Do stuff
	let db = new sqlite3.Database('./routes/db/login.db', sqlite3.OPEN_READ, (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to login database');
	});

	let sql = 'SELECT DISTINCT pass pass FROM users WHERE username = ?';

	db.get(sql, [username], (err, row) => {
		if (err) {
			throw err;
		}
		return row
		  ? console.log(row.id, row.name)
		  : console.log(`No user found with the username ${username}`);
	});

	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Closed the login databse connection');
	});
}


module.exports.addUser = addUser;
module.exports.userInDB = userInDB;