const express = require("express");
const router = express.Router();
const dbHandler = require("./dbHandler");
const auth = require("./auth");

router.post("/", function(req,res,next){


	var body = req.body;

	console.log(body);

	if(auth.checkAuth(req.headers["authorization"]) == false){
		res.send("false");
		return;
	}

	var username = auth.getUsername(req.headers["authorization"]);
	var password = auth.getPassword(req.headers["authorization"]);
	if(body.type == "load"){
		var out = JSON.parse('{}');
		var tracks = dbHandler.getTracks();

		out.tracks = tracks;

		var goalInfo;
		out.curr_score = dbHandler.getUser(username)[0].avg_score;
		for(var i = 0; i < out.tracks.length; i++){
			out.tracks[i].goals = dbHandler.getGoalsForTrack(out.tracks[i].track_id);
			for(var j = 0; j < out.tracks[i].goals.length; j++){
				goalInfo = dbHandler.getGoalScore(username, Date.now(), out.tracks[i].track_id, out.tracks[i].goals[j].goal_id);
				if(goalInfo.length > 0){
					out.tracks[i].goals[j].num_this_week = goalInfo[0].num_this_week;
				}
			}
			out.tracks[i].track_score = dbHandler.getTrackScore(username, Date.now(), out.tracks[i].track_id)[0].track_score;
			out.tracks[i].avgTrackScore = dbHandler.avgTrackScore(username, out.tracks[i].track_id);
		}

		res.json(out);

	}else if(body.type == "compGoal"){
		dbHandler.updateGoalScore(auth.getUsername(req.headers["authorization"]), new Date(), dbHandler.getTrackFromGoal(body.goalId), body.goalId);
		res.json({"status": "success"});
	}else if(body.type == "addGoal"){
		dbHandler.newGoal(body.goalId, body.track_Id, body.name, body.desc, body.maxNum);

		res.json({"status": "success"});
	}else if(body.type == "getGoalInfo"){
		res.json(dbHandler.getGoalScore(body.username, Date.now(), body.trackID, body.goalID));

	}else if(body.type == "getHistData"){
		res.json(dbHandler.getGoalHist(auth.getUsername(req.headers["authorization"]), body.goalId));
	}else{
		res.json({"status": "failuire"});
	}


});


module.exports = router;