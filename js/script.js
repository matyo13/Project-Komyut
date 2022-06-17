$(window).on("load", function() {
    $('#loading').fadeOut(1000);
    $('#main-container').addClass("d-flex").fadeIn(1000);
});

jQuery(function ($) {
    const routes = populateRoutes();
    const button = $("#submit");
    let possible_routes = [];

    button.attr("disabled", "disabled")
    button.on("click", function () {
        possible_routes = [];
        let location = $('#location').find(":selected").val();
        let destination = $('#destination').find(":selected").val();
        possible_routes = getRoutes(routes, location, destination);
        displayRoutes(possible_routes);
    });

    $("#location, #destination").on("change", function () {
        if(($('#location').find(":selected").val() !== "0") && ($('#destination').find(":selected").val() !== "0")) {
            button.removeAttr("disabled");
        }
    });
});

function displayRoutes(possible_routes) {
    let smallest = 0;
    let smallestIndex = 0;
    let noRouteFound = true;
    const card_group = $("#card-group");
    card_group.text("");
    possible_routes.forEach(function(route, index) {
        console.log("Smallest Index is " + smallestIndex);
        if(smallest && route[1]) {
            if(smallest > route[1]) {
                $("#" + smallestIndex).removeClass("bg-success text-white").addClass("border-danger text-danger");
                card_group.append("" +
                    "<div id=\"" + index + "\" class=\"card text-white bg-success mb-3\" style=\"max-width: 18rem;\">\n" +
                    "            <div class=\"jumbotron card-header\" id=\"jeep-code\"><h1 class='display-4'>" + route[0]+ "</h1></div>\n" +
                    "            <div class=\"card-body\">\n" +
                    "                <h5 class=\"card-title\"> Ride from " + route[2] + " to " + route[3] + "</h5>\n" +
                    "                <p class=\"card-text\"> Around " + route[1] + " meters of ride.</p>\n" +
                    "            </div>\n" +
                    "        </div>");
                smallest = route[1];
                smallestIndex = index;
                noRouteFound = false;
            } else {
                card_group.append("" +
                    "<div id=\"" + index + "\" class=\"card border-danger mb-3\" style=\"max-width: 18rem;\">\n" +
                    "            <div class=\"jumbotron card-header\" id=\"jeep-code\"><h1 class='display-4'>" + route[0]+ "</h1></div>\n" +
                    "            <div class=\"card-body text-danger\">\n" +
                    "                <h5 class=\"card-title\"> Ride from " + route[2] + " to " + route[3] + "</h5>\n" +
                    "                <p class=\"card-text\"> Around " + route[1] + " meters of ride.</p>\n" +
                    "            </div>\n" +
                    "        </div>");
                noRouteFound = false;
            }
        } else {
            if(route[1] > 0) {
                $("#card-group").append("" +
                    "<div id=\"" + index + "\" class=\"card text-white bg-success mb-3\" style=\"max-width: 18rem;\">\n" +
                    "            <div class=\"jumbotron card-header\" id=\"jeep-code\"><h1 class='display-4'>" + route[0]+ "</h1></div>\n" +
                    "            <div class=\"card-body\">\n" +
                    "                <h5 class=\"card-title\"> Ride from " + route[2] + " to " + route[3] + "</h5>\n" +
                    "                <p class=\"card-text\"> Around " + route[1] + " meters of ride.</p>\n" +
                    "            </div>\n" +
                    "        </div>");
                smallest = route[1];
                smallestIndex = index;
                noRouteFound = false;
            }
        }
    });
    if(noRouteFound) {
        $("#card-group").append("" +
            "<div id=\"noroute\" class=\"card text-danger border-light mb-3\" style=\"max-width: 18rem;\">\n" +
            "            <div class=\"jumbotron card-header\" id=\"jeep-code\"><h1 class='display-4'>Sorry</h1></div>\n" +
            "            <div class=\"card-body\">\n" +
            "                <h5 class=\"card-title\">We couldn't find any route for you.</h5>\n" +
            "                <p class=\"card-text\">Please choose another locations.</p>\n" +
            "            </div>\n" +
            "        </div>");
    }
}

function getRoutes(routes, location, destination) {
    let distance = 0;
    let new_route = [];
    routes.forEach(function(route) {
        let temp = [];
        distance = 0;
        let startCounting = false;
        let current = route[1].head;
        temp.push(route[0]);
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
        if(distance) {
            temp.push(distance, location, destination);
            new_route.push(temp);
        }
    });
    return new_route;
}

function populateRoutes() {
    const routes = getFileData("../jeep-codes.txt").split("\n");
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