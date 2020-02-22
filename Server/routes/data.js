express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	//var body = req.body;

	var body = JSON.parse('{"type":"goal", "id": 1}');

	if(body.type == "track"){
		var trackNames = dbHandler.getTrackNames();

		jsonOut = JSON.stringify(trackNames);

		res.json(jsonOut);
	}else if(body.type == "goal"){
		var dbData = dbHandler.getGoal(body.id);
		var out = JSON.parse('{}');
		out.goalID

	}else{
		res.json("{error: 'invalid body type'}");
	}
});


module.exports = router;