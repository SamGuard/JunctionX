

function smooth(data, width){
	var newData = JSON.parse('{}');
	newData.x = [];
	newData.y = [];

	var movAv;
	var amount;
	for(var x = 0; x < data.x[data.x.length-1]; x=x+0.1){
		newData.x.push(x);
		amount = 0;
		movAv = 0;
		for(var i = 0; i < data.x.length; i++){
			if(Math.abs(data.x[i]-x) < width){
				movAv += data.y[i];
				amount++;
			}
		}
		newData.y.push(movAv/amount);
	}

	for(var i = 0; i < newData.x.length; i++){
		console.log("x: " + newData.x[i].toString() + " y: " + newData.y[i].toString());
	}

}

module.exports.smooth = smooth;