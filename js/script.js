$(document).ready(function () {
    $("#getDistance").submit(function (e) {
        e.preventDefault();
        document.getElementById("destination_container").innerText = document.getElementById("destination").value;
    })
})

// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//     fs.readFile('JEEP.txt', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         console.log(data);
//         res.end();
//     });
// }).listen(8080);