$(document).ready(function() {
    
    
    var mainScreenOn = false;
    $("#leftMenuIcon").hide();
    $("#leftMenuID").hide();
    $("#registerInfo").hide();

    $("#loginSubmit").click(function(){
        
        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            url: "auth",
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
                if (data.status == true) {
                    $("#leftMenuIcon").show();
                    $("#loginSectionID").removeClass("loginSection");
                    $("#loginSectionID").addClass("loginSectionHidden");
                }
                else {
                    // incorrect password
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });


    });
    
    $("#registerSubmit").click(function(){
        
        var username = $("#registerUsername").val();
        var password = $("#registerPassword").val();
        var repeatPassword = $("#registerRepeatPassword").val();
        
        if (password == repeatPassword) {
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
                    if (data.status == true) {
                        $("#leftMenuIcon").show();
                        $("#loginSectionID").removeClass("loginSection");
                        $("#loginSectionID").addClass("loginSectionHidden");
                    }
                    else {
                        // username used already
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
        else {
            // two password boxes not the same
        }


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

function showDiv(goToRegister)
{
    if (goToRegister) {
        $("#loginInfo").hide();
        $("#registerInfo").show();
    }
    else {
        $("#loginInfo").show();
        $("#registerInfo").hide();
    }
}
