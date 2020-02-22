$(document).ready(function() {
    $("#submit").click(function(){
    	console.log("aaa");
        var username = $("#username").val();
        var password = $("#password").val();

        $.post("login", {username: username, password: password}, function(result){
            console.log(result);
        });
    });
});