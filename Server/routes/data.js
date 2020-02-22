express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	var body = req.body;

	if(body.type == "track"){
		dbHandler.getTrack(body.trackNum);
		
	}
});


module.exports = router;