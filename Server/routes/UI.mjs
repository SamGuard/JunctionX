export UIStart function() {

    var fishAssets = {
        "Fish_1": ["Asset/Fish_1/Neutral_Sea-1.png", "Asset/Fish_1/Neutral_Sea-2.png", "Asset/Fish_1/Neutral_Sea-3.png"],
        "Fish_2": ["Asset/Fish_2/Neutral_Sea-1.png", "Asset/Fish_2/Neutral_Sea-2.png", "Asset/Fish_2/Neutral_Sea-3.png"]
    }
    var fishDivs = {};

    var fishCurrentIndex = {
        "Fish_1": 0;
        "Fish_2": 0;
    }

    for (var key in Object.keys(fishAssets)) {
        spawnFish(fishAssets[key], key);
        console.log("Spawned fish: " + key);
    }

    function spawnFish(name) {
        fishDivs[name] = document.createElement('img');
        fishDivs[name].src = fishAssets[name][fishCurrentIndex[name]];
        fishDivs[name].id = name;
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
        for (var img in fishDivs) {
            fishCurrentIndex[img]++;
            fishDivs[img].src = fishAssets[img][fishCurrentIndex[name]];
            console.log("Set src to: " + fishAssets[img[fishCurrentIndex[name]]);
        };
    }

    function runAnimation() {
        for (var imgKey in fishDivs) {
            var img = fishDivs[img];
            img.style.right = parseInt(img.style.right) + 5 + 'px';
            if(parseInt(img.style.right) > $(document).width() + 200) {
                console.log("fish " + i + " left");
                img.style.top = Math.floor(Math.random() * 20) + 40 + '%';
                img.style.right = '-300px'
            }
        };

        setTimeout(runAnimation, 10);
    }

    function runImageToggler() {
        console.log("Image toggler");
        nextImages()

        setTimeout(runImageToggler, 100);
    }

    runImageToggler();
    runAnimation();
}
