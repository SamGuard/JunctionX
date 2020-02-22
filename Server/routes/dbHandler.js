




var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};


function addUser(username, password, salt){
	//Do stuff
}

function userInDB(username, password, salt){
	//Do stuff
}


module.exports.addUser = addUser;
module.exports.userInDB = userInDB;