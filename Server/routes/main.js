$(document).ready(function() {
    var auth;
    var firstTime = true;

    var mainScreenOn = false;
    $("#leftMenuIcon").hide();
    $("#leftMenuID").hide();
    $("#registerInfo").hide();
    $("#loginSectionID").css("height", "400px");

    $('#password').keyup(function(e){
        if(e.keyCode == 13)
        {
            $("#loginSubmit").trigger("click");
        }
    });
    
    $('#registerRepeatPassword').keyup(function(e){
        if(e.keyCode == 13)
        {
            $("#registerSubmit").trigger("click");
        }
    });
    
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
                    auth = "Basic " + btoa(username + ":" + password);
                }
                else {
                    $("#loginIncorrect").show();
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
                        $("#registerIncorrect").text("That username is already taken.");

                        $("#registerIncorrect").show();
                        
                        // username used already
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
        else {
            // two password boxes not the same
            $("#registerIncorrect").text("Passwords do not match.");

            $("#registerIncorrect").show();
        }


    });

    $("#leftMenuIcon").click(function(){
        if (mainScreenOn) {
            $("#leftMenuID").removeClass("leftMenu");
            $("#leftMenuID").addClass("leftMenuHidden");
            $(".accordion").hide();
        }
        else {
            $("#leftMenuID").removeClass("leftMenuHidden");
            $("#leftMenuID").addClass("leftMenu");
            $(".accordion").show();
            
            if (firstTime) {
                $("#leftMenuID").show();
                setupAccordion();
                firstTime = false;
            }
        }
        mainScreenOn = !mainScreenOn;

    });

    var fishAssets = ["Asset/87848148_617952652362559_8000237377555529728_n.png", "Asset/87280708_202912071075942_8515485405552836608_n.png"];
    var fishDivs = [];

    for (var i = 0; i < fishAssets.length; i++) {
        fishDivs.push(document.createElement('img'));
        fishDivs[i].src = fishAssets[i];
        fishDivs[i].id = 'fish' + i;
        fishDivs[i].className = 'fish';
        fishDivs[i].style.height = 10 + Math.floor(Math.random() * 5) + '%';
        fishDivs[i].style.width = 'auto';
        fishDivs[i].style.right = '-300px';
        fishDivs[i].style.right = '-300px';
        fishDivs[i].style.top = Math.floor(Math.random() * 20) + 40 + '%';
        fishDivs[i].style.position = 'absolute';
        console.log("fish " + i + " done");
        document.getElementById('fish-container').appendChild(fishDivs[i]);
    };


    function runBackground() {
        for (var i = 0; i < fishDivs.length; i++) {
            fishDivs[i].style.right = parseInt(fishDivs[i].style.right) + 5 + 'px';
            if(parseInt(fishDivs[i].style.right) > $(document).width() + 200) {
                console.log("fish " + i + " left");
                fishDivs[i].style.top = Math.floor(Math.random() * 20) + 40 + '%';
                fishDivs[i].style.right = '-300px'
            }
        };

        setTimeout(runBackground, 10);
    }
    runBackground();
});

function showDiv(goToRegister)
{
    if (goToRegister) {
        $("#loginInfo").hide();
        $("#registerInfo").show();
        $("#loginSectionID").css("height", "450px");

    }
    else {
        $("#loginInfo").show();
        $("#registerInfo").hide();
        $("#loginSectionID").css("height", "400px");

    }
}
function setupAccordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
        var j;
        var acc = document.getElementsByClassName("accordion");
        for (j = 0; j < acc.length; j++) {
            if (acc[j] != this) {
                var panel = acc[j].nextElementSibling;
                if (panel.style.display == "block") {
                    panel.style.display = "none";
                    acc[j].classList.toggle("active");
                }
            }
        }
      });
    }
}