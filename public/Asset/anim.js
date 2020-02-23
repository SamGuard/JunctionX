
$(document).ready(function() {

    var index = 0;

    var delayTime = 1500;

    var goodTimer;
    var neutralTimer;
    var badTimer;

    startNeutral();

    function startNeutral() {
        neutralTimer = setInterval(neutral, delayTime);
        endGood();
        endBad();

        $(".background").each(function () {
            $(this).fadeIn(delayTime);
        })
        $(".backgroundGood").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood1").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood2").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood3").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad1").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad2").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad3").each(function () {
            $(this).fadeOut(delayTime);
        })
    }

    function startGood() {
        goodTimer = setInterval(good, delayTime);

        endNeutral();
        endBad();
        $(".backgroundGood").each(function () {
            $(this).fadeIn(delayTime);
        })
        $(".background").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".background1").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".background2").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".background3").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad1").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad2").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundBad3").each(function () {
            $(this).fadeOut(delayTime);
        })
    }

    function startBad() {
        badTimer = setInterval(bad, delayTime);

        endNeutral();
        endGood();

        $(".backgroundBad").each(function () {
            $(this).fadeIn(delayTime);
        })
        $(".background").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".background1").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".background2").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".background3").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood1").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood2").each(function () {
            $(this).fadeOut(delayTime);
        })
        $(".backgroundGood3").each(function () {
            $(this).fadeOut(delayTime);
        })
    }

    function endGood() {
        clearInterval(goodTimer);
    }

    function endNeutral() {
        clearInterval(neutralTimer);
    }

    function endBad() {
        clearInterval(badTimer);
    }

    function neutral() {
        if(index == 0) {
            $(".background3").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".background1").each(function () {
                $(this).fadeIn(delayTime);
            })
            index++;
        } else if(index == 1)  {
            $(".background1").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".background2").each(function () {
                $(this).fadeIn(delayTime);
            })
            index++;
        } else {
            $(".background2").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".background3").each(function () {
                $(this).fadeIn(delayTime);
            })

            index = 0
        }

        /*
        $("#" + flowDivs[flowIndex]).fadeOut(delayTime);
        $("#" + gritDivs[gritIndex]).fadeOut(delayTime);
        $("#" + kelpDivs[kelpIndex]).fadeOut(delayTime);

        increaseIndexes();

        $("#" + flowDivs[flowIndex]).fadeIn(delayTime);
        $("#" + gritDivs[gritIndex]).fadeIn(delayTime);
        $("#" + kelpDivs[kelpIndex]).fadeIn(delayTime);
        */
    }


    function good() {
        if(index == 0) {
            $(".backgroundGood3").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".backgroundGood1").each(function () {
                $(this).fadeIn(delayTime);
            })
            index++;
        } else if(index == 1)  {
            $(".backgroundGood1").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".backgroundGood2").each(function () {
                $(this).fadeIn(delayTime);
            })
            index++;
        } else {
            $(".backgroundGood2").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".backgroundGood3").each(function () {
                $(this).fadeIn(delayTime);
            })

            index = 0
        }
    }

    function bad() {
        if(index == 0) {
            $(".backgroundBad3").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".backgroundBad1").each(function () {
                $(this).fadeIn(delayTime);
            })
            index++;
        } else if(index == 1)  {
            $(".backgroundBad1").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".backgroundBad2").each(function () {
                $(this).fadeIn(delayTime);
            })
            index++;
        } else {
            $(".backgroundBad2").each(function () {
                $(this).fadeOut(delayTime);
            })
            $(".backgroundBad3").each(function () {
                $(this).fadeIn(delayTime);
            })

            index = 0
        }
    }
});
