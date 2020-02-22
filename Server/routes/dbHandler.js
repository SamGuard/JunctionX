var crypto = require('crypto');
var async = require("async");


const db = require("sqlite-sync");

var dir = "./routes/db/userdata.db";

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


function getTracks(){
	db.connect(dir);

	let sql = 'SELECT * FROM tracks';

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

	let sql = `SELECT track_id, name, desc FROM tracks
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
	});

	db.close();
	return output;
}

function getGoalsForTrack(trackID) {
	db.connect(dir);

	let sql = `SELECT goal_id, name, desc, max_num_per_week FROM goals 
				WHERE track_id = ?
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

function getWeeklyScore(username, dateStart) {
	db.connect(dir);

	let sql = `SELECT * FROM weeklyScore
				WHERE username = ?
				AND date_start = ?`;

	var output;

	db.run(sql, [username, dateStart], (res) => {
		if(res.error) {
			throw res.error;
		}
		output = res;
	});

	db.close();
	return output;
}

function getTrackScore(username, dateStart, trackID) {
	db.connect(dir);

	let sql = `SELECT * FROM trackScore 
				WHERE trackID = ?
				AND week_id = (SELECT week_id FROM weeklyScore
								WHERE username = ?
								AND dateStart = ?)`;

	var output;

	db.run(sql, [trackID, username, dateStart], (res) => {
		if(res.error) {
			throw res.error;
		}
		output = res;
	});

	db.close();
	return output;
}

function getGoalScore(username, dateStart, trackID, goalID) {
	db.connect(dir);

	let sql = `SELECT * FROM goalScore 
				WHERE goal_id = ?
				AND track_score_id = (SELECT track_score_id FROM trackScore
										WHERE track_id = ?
										AND week_id = (SELECT week_id FROM weeklyScore
														WHERE username = ?
														AND dateStart = ?))`;

	var output;

	db.run(sql, [goalID, trackID, username, dateStart], (res) => {
		if(res.error) {
			throw res.errir;
		}
		output = res;
	});

	db.close();
	return output;
}

function getNextID(table) {
	db.connect(dir);

	let sql = `SELECT * FROM ?`;

	var output;

	db.run(sql, [table], (res) => {
		if(res.error) {
			throw res.error;
		}
		output = res.length;
	});

	db.close;
	return output;
}

function setWeeklyScore(username, date) {
	var nextID = getNextID('weeklyScore');

	db.connect(dir);

	let sql = `INSERT INTO weeklyScore(week_id, username, date_start, total_score)
				VALUES(?, ?, ?, ?)`;

	let newWeek = [nextID, username, date, 0];

	db.run(sql, newWeek, (res) => {
		if(res.error) {
			throw res.error;
		}
		console.log(`A new week has been started for ${username} starting at ${date}`);
	});

	db.close();
}

module.exports.addUser = addUser;
module.exports.userInDB = userInDB;
module.exports.getTrack = getTrack;
module.exports.getTrackNames = getTrackNames;
module.exports.getGoal = getGoal;
module.exports.getGoalsForTrack = getGoalsForTrack;
module.exports.getWeeklyScore = getWeeklyScore;
module.exports.getTrackScore = getTrackScore;
module.exports.getGoalScore = getGoalScore;