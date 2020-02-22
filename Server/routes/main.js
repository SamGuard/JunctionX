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
