$(document).ready(function () {
    $("#getDistance").submit(function (e) {
        e.preventDefault();
        document.getElementById("destination_container").append(document.getElementById("destination").value);
    })

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../jeep.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
            }
            var data = allText.split("\n");
            for(var i = 0; i < data.length; i++) {
                var subdata = data[i].split(":");
                for(var j = 0; j < subdata.length; j++ ) {
                    document.getElementById("data_here").append(subdata[j]);
                }
            }
        }
    }
    rawFile.send(null);
})