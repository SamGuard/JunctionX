$(document).ready(function() {
    
    var mainScreenOn = false;
    $("#leftMenuIcon").hide();
    $("#leftMenuID").hide();

    $("#submit").click(function(){
        $("#leftMenuIcon").show();

        $("#loginSectionID").removeClass("loginSection");
        $("#loginSectionID").addClass("loginSectionHidden");
        
        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            url: "register",
            method: "POST",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                xhr.setRequestHeader("X-Mobile", "false");
            },
            success: function (data) {
                console.log(data);
                console.log(data.status);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });


    });

    $("#leftMenuIcon").click(function(){
        if (mainScreenOn) {
            $("#leftMenuID").removeClass("leftMenu");
            $("#leftMenuID").addClass("leftMenuHidden");
        }
        else {
            $("#leftMenuID").removeClass("leftMenuHidden");
            $("#leftMenuID").addClass("leftMenu");
            $("#leftMenuID").show();
        }
        mainScreenOn = !mainScreenOn;

    });
});
