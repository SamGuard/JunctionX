const express = require("express");
const router = express.Router();
const dbHandler = require("./dbHandler");
const auth = require("./auth");

router.post("/", function(req,res,next){
	var body = req.body;

	if(auth.checkAuth(req.headers["authorization"]) == false){
		res.send("false");
		return;
	}


	if(body.type == "load"){
		var out = JSON.parse('{}');
		var tracks = dbHandler.getTracks();

		out.tracks = tracks;


		var goalInfo;
		for(var i = 0; i < out.tracks.length; i++){
			out.tracks[i].goals = dbHandler.getGoalsForTrack(out.tracks[i].track_id);
			for(var j = 0; j < out.tracks[i].goals.length; j++){
				goalInfo = dbHandler.getGoalScore(body.username, Date.now(), body.trackID, body.goalID);
				console.log(goalInfo);
				out.track[i].goal.goal_score = goalInfo.goal_score;
			}
		}


		res.json(out);

	}else if(body.type == "compGoal"){
		dbHandler.updateGoalScore(getUsername(req.headers["authorization"],new Date(),body.trackID,body.goalID))
		res.send("done");
	}else if(body.type == "addGoal"){

	}else if(body.type == "getGoalInfo"){
		res.json(dbHandler.getGoalScore(body.username, Date.now(), body.trackID, body.goalID));
	}else{
		res.send("FAIL");
	}


});


module.exports = router;