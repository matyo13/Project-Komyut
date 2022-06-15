$(document).ready(function () {
    $("#getDistance").submit(function (e) {
        e.preventDefault();
        document.getElementById("destination_container").append(document.getElementById("destination").value);
    });

    const routes = getFileData("../jeep.txt").split("\n");
    const places = getFileData("../places.txt").split("\n");

    populateOptions(places);

});

function populateOptions(places) {
    places.forEach(function(place) {
        const option = document.createElement("option");
        option.text = place;
        option.value = place;
        document.getElementById("location").add(option);
        document.getElementById("destination").add(option);
    });
}


function getFileData(address) {
    const rawFile = new XMLHttpRequest();
    let allText;
    rawFile.open("GET", address, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0) {
                allText = rawFile.responseText;
            }
            console.log(allText);
        }
    }
    rawFile.send(null);
    return allText;
}