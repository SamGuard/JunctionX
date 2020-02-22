express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	var body = req.body;

	//var body = JSON.parse('{"type":"trackNames","id": 1}');

	if(body.type == "trackNames"){
		var trackNames = dbHandler.getTrackNames();

		res.json(trackNames);
	}else if(body.type == "goal"){
		var dbData = dbHandler.getGoal(body.id)[0];
		res.json(dbData);
	}else if(body.type == "getGoalsForTrack"){
		var dbData = dbHandler.getGoalsForTrack(trackID);

		res.json(dbData);
	}else{
		res.json("{error: 'invalid body type'}");
	}


});


module.exports = router;