$(document).ready(function() {
    var flowDivs = ["bg1", "bg2", "bg3"];
    var gritDivs = ["grit1", "grit2", "grit3"];
    var kelpDivs = ["kelp1", "kelp2", "kelp3"];
    var seaweedDivs = ["seaweed1", "seaweed2", "seaweed3", "seaweed4", "seaweed5"];

    var flowIndex = 0;
    var gritIndex = 0;
    var kelpIndex = 0;
    var seaweedIndex = 0;

    var delayTime = 1500;
    
    var goodTimer;
        
    for (var i = 0; i < 3; i++) {
        $("#" + flowDivs[i]).hide();
        $("#" + gritDivs[i]).hide();
        $("#" + kelpDivs[i]).hide();
    }
    for (var i = 0; i < 5; i++) {
        $("#" + seaweedDivs[i]).hide();
    }
    function startNeutral() {
    var neutralTimer = setInterval(neutral, delayTime);
    }
    startNeutral();

    function endNeutral() {
        clearInterval(neutralTimer);
    } 
    
    function startGood() {
        goodTimer = setInterval(good, delayTime);
    }
    function endGood() {
        clearInterval(goodTimer);
    } 
    
    function neutral() {
        $("#" + flowDivs[flowIndex]).fadeOut(delayTime);
        $("#" + gritDivs[gritIndex]).fadeOut(delayTime);
        $("#" + kelpDivs[kelpIndex]).fadeOut(delayTime);

        increaseIndexes();
        
        $("#" + flowDivs[flowIndex]).fadeIn(delayTime);
        $("#" + gritDivs[gritIndex]).fadeIn(delayTime);
        $("#" + kelpDivs[kelpIndex]).fadeIn(delayTime);
    }
    
    
    function good() {
        $("#" + flowDivs[flowIndex]).fadeOut(delayTime);
        $("#" + seaweedDivs[seaweedIndex]).fadeOut(delayTime);

        increaseIndexes();
        
        $("#" + flowDivs[flowIndex]).fadeIn(delayTime);
        $("#" + seaweedDivs[seaweedIndex]).fadeIn(delayTime);

    }
   
    
    function increaseIndexes() {
        flowIndex++;
        if (flowIndex >= flowDivs.length) {
            flowIndex = 0;
        }
        gritIndex++;
        if (gritIndex >= gritDivs.length) {
            gritIndex = 0;
        }        
        kelpIndex++;
        if (kelpIndex >= kelpDivs.length) {
            kelpIndex = 0;
        }
        seaweedIndex++;
        if (seaweedIndex >= seaweedDivs.length) {
            seaweedIndex = 0;
        }
    }
});