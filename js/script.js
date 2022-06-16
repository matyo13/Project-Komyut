jQuery(function ($) {
    const routes = populateRoutes();
    const button = $("#submit");
    let possible_routes = [];

    button.attr("disabled", "disabled")
    button.on("click", function () {
        let location = $('#location').find(":selected").val();
        let destination = $('#destination').find(":selected").val();
        possible_routes.push(getRoutes(routes, location, destination));
        console.log(possible_routes);
    });

    $("#location, #destination").on("change", function () {
        if(($('#location').find(":selected").val() !== "0") && ($('#destination').find(":selected").val() !== "0")) {
            button.removeAttr("disabled");
        }
    });
});

function getRoutes(routes, location, destination) {
    let distance = 0;
    let new_route = [];
    routes.forEach(function(route) {
        new_route = [];
        distance = 0;
        let startCounting = false;
        let current = route[1].head;
        new_route.push(route[0]);
        while(current.next != null) {
            if(location === current.location) {
                startCounting = true;
            }

            if(startCounting) {
                if(destination === current.location)
                    break;
                distance += current.distance;
            }
            current = current.next;
        }

        if(current.next == null) {
            distance = 0;
            current = route[1].head;
            startCounting = false;
            while(current.next != null) {
                if(destination === current.location) {
                    startCounting = true;
                }

                if(startCounting) {
                    if(location === current.location)
                        break;
                    distance += current.distance;
                }
                current = current.next;
            }
        }
        new_route.push(distance, location, destination);
        console.log(new_route);
    });
    return new_route;
}

function populateRoutes() {
    const routes = getFileData("../jeep.txt").split("\n");
    const places = getFileData("../places.txt").split("\n");

    populateOptions(places);

    let linked_routes = []
    routes.forEach(function(route) {
        let new_route = new Node();
        let temp = new_route;
        let current_route = [];
        current_route.push(route.split(":")[0]);
        route.split(":")[1].split("-").forEach(function(place) {
            temp.location = place.split("?")[0]
            temp.distance = parseInt(place.split("?")[1]);
            temp.next = new Node();
            temp = temp.next;
        });
        let new_list = new linkedList(new_route);
        current_route.push(new_list);
        linked_routes.push(current_route);
    });

    return linked_routes;
}

function populateOptions(places) {
    for(let i = 0; i < places.length; i++) {
        let location = document.createElement("option");
        let destination = document.createElement("option");
        location.text = places[i];
        location.value = location.text
        destination.text = places[i];
        destination.value = destination.text
        $("#destination").append(destination);
        $("#location").append(location);
    }
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
        }
    }
    rawFile.send(null);
    return allText;
}