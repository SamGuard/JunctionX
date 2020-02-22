var crypto = require('crypto');
var async = require("async");


const db = require("sqlite-sync");

var dir = "./routes/db/userdata.db";


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

function verify(attemptPassword, actual){
	if(attemptPassword == actual){
		return true;
	}
	return false;
}

function addUser(username, password){
	db.connect(dir);

	let user = [username, password];


	let sql = `SELECT * FROM users WHERE username = ?`

	var output = true;
	db.run(sql, [username], (res) => {
		if (res.error) {
			throw res.error;
		}

		if(res.length > 0){
			output = false;
		}
	});

	if(output == false){
		return false;
	}
	


	sql = `INSERT INTO users(username, pass) VALUES(?, ?)`;

	console.log("running");
	db.run(sql, user, function(res) {
		if (res.error) {
			return console.error(res.error);
		}
		console.log(`A user has been created with id ${res}`);
	});

	db.close();

	return output;
}

function userInDB(username, password){
	db.connect(dir);

	let sql = 'SELECT DISTINCT pass pass FROM users WHERE username = ?';

	var output = true;

	db.run(sql, [username], (res) => {
			if (res.error) {
				throw res.error;
			}
			console.log(res);
			if(res.length > 0){
				output = verify(password, res[0].pass);
			}else{
				output = false;
			}
		});
	

	db.close();
	return output;
}


function getTrack(trackID){
	db.connect(dir);

	let sql = 'SELECT * FROM tracks WHERE track_id = ?';

	var output;

	db.run(sql, [trackID], (res) => {
			if (res.error) {
				throw res.error;
			}
			output = res;
		});
	

	db.close();
	return output;
}

function getTrackNames() {
	db.connect(dir);

	let sql = `SELECT track_id, name FROM tracks
				ORDER BY name`;

	var output;

	db.run(sql, [], (res) => {
		if (res.error) {
			throw res.error;
		}
		output = res;
	});

	db.close();

	return output;
}

function getGoal(goalID) {
	db.connect(dir);

	let sql = `SELECT * FROM goals WHERE goal_id = ?`;

	var output;

	db.run(sql, [goalID], (res) => {
		if (res.error) {
			throw res.error;
		}
		output = res;
		console.log(res);
	});

	db.close();
	return output;
}

function getGoalsForTrack(trackID) {
	db.connect(dir);

	let sql = `SELECT goal_id, name FROM goals WHERE track_id = ?
				ORDER BY name`;

	var output;

	db.run(sql, [trackID], (res) => {
		if(res.error) {
			throw res.error;
		}
		output = res;
	});

	db.close();
	return output;
}


getTrackNames();

module.exports.addUser = addUser;
module.exports.userInDB = userInDB;
module.exports.getTrack = getTrack;
module.exports.getTrackNames = getTrackNames;
module.exports.getGoal = getGoal;
module.exports.getGoalsForTrack = getGoalsForTrack;
