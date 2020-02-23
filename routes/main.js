$(document).ready(function() {

    var coolAuth = "";
    var firstTime = true;
	var firstTime2 = true;
    
    var mainScreenOn = false;
	var mainScreenOn2 = false;
    $("#leftMenuIcon").hide();
    $("#leftMenuID").hide();
	$("#leftMenuIcon2").hide();
    $("#leftMenuID2").hide();
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
					$("#leftMenuIcon2").show();
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
        if (username == "") {
            $("#registerIncorrect").text("You may not leave the username field empty.");
            $("#registerIncorrect").show();

        }
        else if (password == "") {
            $("#registerIncorrect").text("You may not leave the password field empty.");
            $("#registerIncorrect").show();
        }
        else {
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
	
	$("#leftMenuIcon2").click(function(){
        if (mainScreenOn2) {
            $("#leftMenuID2").removeClass("leftMenu2");
            $("#leftMenuID2").addClass("leftMenuHidden2");
            $(".accordion").hide();
        }
        else {
            $("#leftMenuID2").removeClass("leftMenuHidden2");
            $("#leftMenuID2").addClass("leftMenu2");
            $(".accordion").show();

            if (firstTime2) {
                $("#leftMenuID2").show();
                setupAccordion();
                firstTime2 = false;
            }
        }
        mainScreenOn2 = !mainScreenOn2;

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

    var seaBedGritAssets = ['/Asset/Sea_bed_grit/Neutral_Sea-1.png', '/Asset/Sea_bed_grit/Neutral_Sea-2.png', '/Asset/Sea_bed_grit/Neutral_Sea-3.png'];
    var seaBedGritIndex = 0;

    var seaBedGrit = document.getElementById("seaBedGrit")
    seaBedGrit.src = seaBedGritAssets[seaBedGritIndex];

    var seaAnimationAssets = ['/Asset/Sea_animation/Neutral_Sea-1.png', '/Asset/Sea_animation/Neutral_Sea-2.png', '/Asset/Sea_animation/Neutral_Sea-3.png'];
    var seaAnimationIndex = 0;

    var seaAnimation = document.getElementById("seaAnimation");
    seaAnimation.src = seaAnimationAssets[seaAnimationIndex];

    var kelpAssets = ['/Asset/Kelp/Neutral_Sea-1.png', '/Asset/Kelp/Neutral_Sea-2.png', '/Asset/Kelp/Neutral_Sea-3.png', '/Asset/Kelp/Neutral_Sea-4.png'];
    var kelpIndex = 0;

    var kelp = document.getElementById("seaKelp");
    kelp.src = kelpAssets[kelpIndex];

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

        seaBedGritIndex++;
        if(seaBedGritIndex >= seaBedGritAssets.length) {
            seaBedGritIndex = 0;
        }
        console.log(seaBedGritIndex);
        seaBedGrit.src = seaBedGritAssets[seaBedGritIndex];

        seaAnimationIndex++;
        if(seaAnimationIndex >= seaAnimationAssets.length) {
            seaAnimationIndex = 0;
        }
        console.log(seaAnimationIndex);
        seaAnimation.src = seaAnimationAssets[seaAnimationIndex];

        kelpIndex++;
        if(kelpIndex >= kelpAssets.length) {
            kelpIndex = 0;
        }
        console.log(kelpIndex);
        kelp.src = kelpAssets[kelpIndex];
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
    
    function change(current, history, num){
        if (current > history) {
            document.getElementById("top" + num).style = "width:"+(current - history)+"%";
            document.getElementById("top" + num).className = "progress-bar bg-info progress-bar-striped progress-bar-animated";
            document.getElementById("bottom" + num).style = "width:"+history+"%";
            document.getElementById("bottom" + num).className = "progress-bar progress-bar-striped progress-bar-animated";
        } else if (current < history) {
            document.getElementById("top" + num).style = "width:"+(history - current)+"%";
            document.getElementById("top" + num).className = "progress-bar progress-bar-striped progress-bar-animated";
            document.getElementById("bottom" + num).style = "width:"+current+"%";
            document.getElementById("bottom" + num).className = "progress-bar bg-info progress-bar-striped progress-bar-animated";
        } else {
            //switch, honky honk
            // what????
        }
    }
    
    function loadTracks(){
        console.log("sending");
        $.ajax({
            url: "data",
            dataType: "json",
            data: {"type": "load"},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", coolAuth);
            },
            type: 'POST',
            success: function(res) {
                console.log(res.tracks);
                for (var i = 0; i < res.tracks.length; i++) {
                    console.log(res.tracks[i]);
                    addTrack(res.tracks[i].name, res.tracks[i].desc, res.tracks[i].goals, i, res.tracks[i].track_id);
                    change(7, 93, i);
                }
            }
        });
    }
    
    


});


function addTrack(name, description, goals, num, trackID) {
    var output = "<div class='accordion'><h2>" + name + "</h2><div class='progress'><div class='progress-bar progress-bar-warning progress-bar-striped progress-bar-animated' style='width:50%' id='bottom" + num + "'></div><div class='progress-bar progress-bar-warning progress-bar-striped progress-bar-animated' style='width:10%' id='top" + num + "'></div></div></div><div class='parent'>";
    
    for (var i = 0; i < goals.length; i++) {
        console.log(goals[i].name); // panelDiv + i is the one that needs to be toggled with goal + goalID
        output += "<div id='parentDiv'" + i + "'><div class='panel' id='panelDiv" + i + "'><h3>" + goals[i].name + "</h3><br><p>" + goals[i].desc + "</p><br><p>You have completed this goal " +goals[i].getGoalInfo + " out of a possible " + goals[i]. max_num_per_week + " time(s) this week.</p><br><button onClick = 'runGoalCallback("+ i  + ", false)' >View Historical Data</button></div></div>";
        output += addGoal(goals[i], i);
    
    }
    
    
    $("#leftMenuID").append(output + "</div>");
}

function addGoal(goal, goalID) {
    var output = "<div class='panel' id='goalDiv" +goalID + "'><h3>" + goal.name + "</h3><br>x dddddd<button onClick = 'runGoalCallback("+ goalID  + ", true)'>Return</button></div>";
    
    return output;
}

function runGoalCallback(goalID, toggle) {
    console.log("nyahaha");
    if (toggle) {
        $("#panelDiv" + goalID).show();
        $("#goalDiv" + goalID).hide();
    }
    else {
        $("#panelDiv" + goalID).hide();
        $("#goalDiv" + goalID).show();
    }
}

function showDiv(goToRegister) {
    if (goToRegister) {
        $("#loginInfo").hide();
        $("#registerInfo").show();
        $("#loginSectionID").css("height", "500px");

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
        var parent = this.nextElementSibling;
        if (parent.style.display === "block") {
          parent.style.display = "none";
        } else {
          parent.style.display = "block";
        }
        var j;
        var acc = document.getElementsByClassName("accordion");

          for (j = 0; j < acc.length; j++) {
            if (acc[j] != this) {
                var parent = acc[j].nextElementSibling;
                if (parent.style.display == "block") {
                    parent.style.display = "none";
                    acc[j].classList.toggle("active");
                }
            }
        }
      });
    }
}