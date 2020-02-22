express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	//var body = req.body;

	var body = JSON.parse('{"type":"trackNames","id": 1}');

	if(body.type == "tracksNames"){
		var trackNames = dbHandler.getTrackNames();

		res.json(trackNames);
	}else if(body.type == "goal"){
		var dbData = dbHandler.getGoal(body.id)[0];
		res.json(dbData);
	}else{
		res.json("{error: 'invalid body type'}");
	}
});


module.exports = router;