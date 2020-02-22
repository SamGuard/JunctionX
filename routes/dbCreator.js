express = require("express");
fs = require("fs");
db = require("sqlite-sync");

router = express.Router();


router.get("/", function(req, res, next){
	//create the db's in here
	res.send("db created");

	console.log("opening sb");

	db.connect('./routes/db/userdata.db');

	db.run(`CREATE TABLE IF NOT EXISTS users (
					username TEXT PRIMARY KEY, 
					pass TEXT NOT NULL,
					avg_score INTEGER)`, 
		function(res) {
			if(res.error){
				throw res.error;
			}
			console.log("created users table");
		});

	db.run(`CREATE TABLE IF NOT EXISTS tracks (
					track_id INTEGER PRIMARY KEY,
					name TEXT,
					weight INTEGER,
					threshold INTEGER,
					desc TEXT)`,
		function(res) {
			if(res.error) {
				throw res.error;
			}
			console.log("created tracks table");
		});

	db.run(`CREATE TABLE IF NOT EXISTS goals (
					goal_id INTEGER PRIMARY KEY,
					track_id INTEGER,
					name TEXT,
					weight INTEGER,
					desc TEXT,
					max_num_per_week INTEGER,
					FOREIGN KEY (track_id)
					  REFERENCES tracks (track_id)
					  	ON DELETE CASCADE
					  	ON UPDATE NO ACTION)`,
		function(res) {
			if(res.error) {
				throw res.error;
			}
			console.log("created goals table");
		});

	db.run(`CREATE TABLE IF NOT EXISTS weeklyScore (
					week_id INTEGER PRIMARY KEY, 
					username TEXT, 
					date_start DATE, 
					total_score INTEGER, 
					FOREIGN KEY (username) 
					  REFERENCES users (username) 
					    ON DELETE CASCADE 
					    ON UPDATE NO ACTION)`,
		function(res) {
			if(res.error) {
				throw res.error;
			}
			console.log("created weeklyScore table");
		});

	db.run(`CREATE TABLE IF NOT EXISTS trackScores (
					track_score_id INTEGER PRIMARY KEY,
					week_id INTEGER,
					track_id INTEGER,
					track_score INTEGER,
					FOREIGN KEY (week_id)
					  REFERENCES weeklyScore (week_id)
					    ON DELETE CASCADE
					    ON UPDATE NO ACTION,
					FOREIGN KEY (track_id)
					  REFERENCES tracks (track_id)
					    ON DELETE CASCADE
					    ON UPDATE NO ACTION)`, 
		function(res) {
			if(res.error) {
				throw res.error;
			}
			console.log("created trackScore table");
		});

	db.run(`CREATE TABLE IF NOT EXISTS goalScores (
					goal_score_id INTEGER PRIMARY KEY,
					track_score_id INTEGER,
					goal_id INTEGER,
					goal_score INTEGER,
					num_this_week INTEGER,
					FOREIGN KEY (track_score_id)
					  REFERENCES trackScores (track_score_id)
					    ON DELETE CASCADE
					    ON UPDATE NO ACTION,
					FOREIGN KEY (goal_id)
					  REFERENCES goals (goal_id)
					  	ON DELETE CASCADE
					  	ON UPDATE NO ACTION)`,
		function(res) {
			if(res.error) {
				throw res.error;
			}
			console.log("created goalScores table");
		});

	db.close();
});

module.exports = router;