express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	//var body = req.body;
	var body = JSON.parse('{ "type":"goals", "id": 0}'); 

	if(body.type == "track"){
		var trackNames = dbHandler.getTrackNames();

		jsonOut = JSON.stringify(trackNames);

		res.json(jsonOut);
	}else if(body.type == "goals"){
		console.log("goals");
		res.json(JSON.stringify(dbHandler.getGoal(body.id)));
	}else{
		res.json("{error: 'invalid body type'}");
	}
});


module.exports = router;