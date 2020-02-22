$(document).ready(function() {

    var coolAuth = "";
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
        coolAuth = "Basic " + btoa(username + ":" + password);
        console.log(coolAuth);
        $.ajax({
            url: "auth",
            method: "POST",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", coolAuth);
                xhr.setRequestHeader("X-Mobile", "false");
            },
            success: function (data) {
                if (data.status == true) {
                    $("#leftMenuIcon").show();
                    $("#loginSectionID").removeClass("loginSection");
                    $("#loginSectionID").addClass("loginSectionHidden");
                    console.log(coolAuth);
                    loadTracks();
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

    var fishAssets = {
        "Fish_1": ['/Asset/Fish_1/Neutral_Sea-1.png', '/Asset/Fish_1/Neutral_Sea-2.png', 'Asset/Fish_1/Neutral_Sea-3.png'],
        "Fish_2": ['/Asset/Fish_2/Neutral_Sea-1.png', '/Asset/Fish_2/Neutral_Sea-2.png', 'Asset/Fish_2/Neutral_Sea-3.png']
    }

    var fishDivs = {};

    var fishCurrentIndex = {
        "Fish_1": 0,
        "Fish_2": 0
    }

    var fishCurrentSpeeds = {
    }

    for (const key in fishAssets) {
        console.log("Spawned fish: " + key + ", Array: " + fishAssets[key]);
        spawnFish(key);
    }

    function spawnFish(name) {
        fishDivs[name] = (document.createElement('img'));
        fishDivs[name].src = fishAssets[name][fishCurrentIndex[name]];
        fishDivs[name].id = name;
        fishCurrentSpeeds[name] = 3 + Math.floor(Math.random() * 10);
        fishDivs[name].className = 'fish';
        fishDivs[name].style.height = 10 + Math.floor(Math.random() * 5) + '%';
        fishDivs[name].style.width = 'auto';
        fishDivs[name].style.right = '-300px';
        fishDivs[name].style.right = '-300px';
        fishDivs[name].style.top = Math.floor(Math.random() * 20) + 40 + '%';
        fishDivs[name].style.position = 'absolute';
        console.log("fish " + name + " done");
        document.getElementById('fish-container').appendChild(fishDivs[name]);
    }

    function nextImages() {
        for (var img in fishAssets) {
            fishCurrentIndex[img]++;

            if(fishCurrentIndex[img] >= fishAssets[img].length) {
                fishCurrentIndex[img] = 0;
            }

            //console.log("fishCurrentIndex[img]: " + fishCurrentIndex[img]);
            fishDivs[img].src = fishAssets[img][fishCurrentIndex[img]];
            //console.log("Changed");
        };
    }

    function runAnimation() {
        for (const imgKey in fishDivs) {
            var img = fishDivs[imgKey];
            img.style.right = parseInt(img.style.right) + fishCurrentSpeeds[imgKey] + 'px';
            if(parseInt(img.style.right) > $(document).width() + 200) {
                console.log("fish: " + imgKey + " left");
                img.style.top = Math.floor(Math.random() * 20) + 40 + '%';
                img.style.right = -Math.floor(Math.random() * 600) + 'px'
                fishCurrentSpeeds[imgKey] = 3 + Math.floor(Math.random() * 10);
            }
        };

        setTimeout(runAnimation, 20);
    }

    function runImageToggler() {
        nextImages()
        setTimeout(runImageToggler, 200);
    }

    runAnimation();
    runImageToggler();
    
    
    function loadTracks(){
        console.log("sending");
        $.ajax({
            url: "data",
            body: JSON.stringify({type: "load"}),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", coolAuth);
            },
            type: 'POST',
            success: function(res) {
                console.log(res);
                alert(res);
            }
        });
    }

});

function showDiv(goToRegister) {
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

function change(current, history){
	if (current > history) {
		document.getElementById("top1").style = "width:"+(current - history)+"%";
		document.getElementById("top1").className = "progress-bar bg-info progress-bar-striped progress-bar-animated";
		document.getElementById("bottom1").style = "width:"+history+"%";
		document.getElementById("bottom1").className = "progress-bar progress-bar-striped progress-bar-animated";
	} else if (current < history) {
		document.getElementById("top1").style = "width:"+(history - current)+"%";
		document.getElementById("top1").className = "progress-bar progress-bar-striped progress-bar-animated";
		document.getElementById("bottom1").style = "width:"+current+"%";
		document.getElementById("bottom1").className = "progress-bar bg-info progress-bar-striped progress-bar-animated";
	} else {
		//switch, honky honk
	}
}