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

	let user = [username, password, 50];


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
	


	sql = `INSERT INTO users(username, pass, avg_score) VALUES(?, ?, ?)`;

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

function getAllUsers(){
	db.connect(dir);

	let sql = 'SELECT username FROM users';

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

function getTracks(){
	db.connect(dir);

	let sql = 'SELECT * FROM tracks';

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

function getNumGoals(trackID) {
	db.connect(dir);

	let sql = `SELECT goal_id FROM goals
				WHERE track_id = ?`;

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

function setGoalScores(trackID, trackScoreID, numGoals, nextGoalID) {
	for(var i=1; i<=numGoals; i++) {
		var nextID = getNextID('goalScore');

		db.connect(dir);

		let sql = `INSERT INTO goalScore(goal_score_id, track_score_id, goal_id, goal_score, num_this_week)
					VALUES(?, ?, ?, ?, ?)`;

		let newGoal = [nextID, trackScoreID, nextGoalID+i, 0, 0];

		db.run(sql, newTrack, (res) => {
			if(res.error) {
				throw res.error;
			}
		});

		db.close();
	}
}

function setTrackScores(weekID) {
	var nextGoalID = 0;
	for (var i=1; i<8; i++){
		var nextID = getNextID('trackScore');

		db.connect(dir);

		let sql = `INSERT INTO trackScore(track_score_id, week_id, track_id, track_score)
					VALUES(?, ?, ?, ?)`;

		let newTrack = [nextID, week_id, i, 0];

		db.run(sql, newTrack, (res) => {
			if(res.error) {
				throw res.error;
			}
		});

		db.close();

		var numGoals = getNumGoals(trackID);
		setGoalScores(i, nextID, numGoals, nextGoalID);
		nextGoalID += numGoals;
	}
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
	});

	db.close();

	setTrackScores(nextID);
	console.log(`A new week has been started for ${username} starting at ${date}`);
}

function updateWeeklyScore(weekID, increment) {
	db.connect(dir);

	let sql = `SELECT total_score FROM weeklyScore
				WHERE week_id = ?`;

	var newScore;

	db.run(sql, [weekID], (res) => {
		if (res.error) {
			throw res.error;
		}
		newScore = res[0] + increment;
	})

	let sql = `UPDATE weeklyScore
				SET total_score = ?
				WHERE week_id = ?`;

	db.run(sql, [newScore, weekID], (res) => {
		if (res.error) {
			throw res.error;
		}
	});

	db.close();
}

function updateTrackScore(trackScoreID, increment) {
	db.connect(dir);

	let sql = `SELECT tracks.threshold, tracks.weight, trackScore.track_score, trackScore.week_id
				FROM tracks, trackScore
				WHERE trackScore.track_score_id = ?
				AND tracks.track_id = (SELECT trackScore.track_id FROM trackScore
										WHERE trackScore.track_score_id = ?)`;

	var threshold;
	var weight;
	var newScore;
	var weekID;

	db.run(sql, [trackScoreID, trackScoreID], (res) => {
		if(res.error) {
			throw res.error;
		}
		threshold = res[0];
		weight = res[1];
		newScore = res[2] + increment;
		weekID = res[3];
		if (newScore > threshold) {
			newScore = threshold;
		}
	});

	let sql = `UPDATE trackScore
				SET track_score = ?
				WHERE track_score_id = ?`;

	db.run(sql, [newScore, trackScoreID], (res) => {
		if(res.error) {
			throw res.error;
		}
	});

	db.close();

	var scoreForward = ((newScore/threshold)*weight)/100;

	updateWeeklyScore(weekID, scoreForward);
}

function updateGoalScore(goalScoreID) {
	db.connect(dir);

	let sql = `SELECT goals.max_num_per_week, goalScore.num_this_week
				FROM goals, goalScore
				WHERE goalScore.goal_score_id = ?
				AND goals.goal_id = (SELECT goalScore.goal_id FROM goalScore 
										WHERE goalScore.goal_score_id = ?)`;

	var output = true;
	var currentNum;

	db.run(sql, [goalScoreID, goalScoreID], (res) => {
		if(res.error) {
			throw res.error;
		}
		
		currentNum = res[1];
		if (res[1] >= res[0]) {
			output = false;
		}
	});

	if (output) {
		let sql = `SELECT weight FROM goals
					WHERE goal_id = (SELECT goal_id FROM goalScore
										WHERE goal_score_id = ?)`;

		var weight;

		db.run(sql, [goalScoreID], (res) => {
			if(res.error) {
				throw res.error;
			}
			weight = res[0];
		});

		let sql = `SELECT goal_score FROM goalScore
					WHERE goal_score_id = ?`;

		var currentScore;

		db.run(sql, [goalScoreID], (res) => {
			if(res.error) {
				throw res.error;
			}
			currentScore = res[0];
		});

		let sql = `UPDATE goalScore
					SET goal_score = ?,
						num_this_week = ?
					WHERE
						goal_score_id = ?`;

		db.run(sql, [currentScore+weight, currentNum+1, goalScoreID], (res) => {
			if(res.error) {
				throw res.error;
			}
		});

		let sql = `SELECT track_score_id FROM goalScore
					WHERE goal_score_id = ?`;

		var trackScoreID;

		db.run(sql, [goalScoreID], (res) => {
			if(res.error) {
				throw res.error;
			}
			trackScoreID = res[0];
		});

		db.close();
		updateTrackScore(trackScoreID, weight);
	} else {
		db.close();
	}

}

module.exports.addUser = addUser;
module.exports.userInDB = userInDB;
module.exports.getAllUsers = getAllUsers;
module.exports.getTracks = getTracks;
module.exports.getTrackNames = getTrackNames;
module.exports.getGoal = getGoal;
module.exports.getGoalsForTrack = getGoalsForTrack;
module.exports.getWeeklyScore = getWeeklyScore;
module.exports.getTrackScore = getTrackScore;
module.exports.getGoalScore = getGoalScore;
module.exports.setWeeklyScore = setWeeklyScore;
module.exports.updateGoalScore = updateGoalScore;