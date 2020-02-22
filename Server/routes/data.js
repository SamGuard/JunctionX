express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	//var body = req.body;
	var body = {};
	body.type = "load";

	//var body = JSON.parse('{"type":"trackNames","id": 1}');
	if(body.type == "load"){
		var out = JSON.parse('{}');
		var tracks = dbHandler.getTracks();

		out.tracks = tracks;

		for(var i = 0; i < out.tracks.length; i++){
			out.tracks[i].goals = dbHandler.getGoalForTrack(out.tracks[i].track_id);
		}

		res.json(out);


	}


});


module.exports = router;