const express = require("express");
const router = express.Router();
const dbHandler = require("./dbHandler");
const auth = require("./auth");


router.get("/", function(req,res,next){
	var body = req.body;

	if(auth.checkAuth(req.headers["authorization"]) == false){
		res.send("GTFO");
		return;
	}

	//var body = JSON.parse('{"type":"trackNames","id": 1}');
	if(body.type == "load"){
		var out = JSON.parse('{}');
		var tracks = dbHandler.getTracks();

		out.tracks = tracks;

		for(var i = 0; i < out.tracks.length; i++){
			out.tracks[i].goals = dbHandler.getGoalsForTrack(out.tracks[i].track_id);
		}

		res.json(out);


	}else if(body.type == "stats-weekly"){

	}


});


module.exports = router;