$(document).ready(function() {
    $("#submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        
        $.ajax({
            url: "auth",
            method: "POST",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({aa: "fuck you sam"}),
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                xhr.setRequestHeader("X-Mobile", "false");
            },
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
        

    });
    
    $("#leftMenuIcon").click(function(){
        $("#leftMenuID").removeClass("leftMenu");
        $("#leftMenuID").addClass("leftMenuHidden");
        $("#loginSectionID").removeClass("loginSection");
        $("#loginSectionID").addClass("loginSectionHidden");
    });
    
    
});