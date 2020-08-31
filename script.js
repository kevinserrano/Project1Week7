var ctx = $("#myChart");

var complete = 0;
var incomplete = 0;
var inProgress = 0;




$(document).ready(function () {

    $("button").on("click", function () {

        if (this.classList.contains("complete")) {
            console.log("complete clicked");
            complete++;
        } else if (this.classList.contains("incomplete")) {
            incomplete++;
        } else if (this.classList.contains("inprogress")) {
            inProgress++
        }

        var myChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Complete", "In Progress", "In Complete"],
                datasets: [{
                    label: "Tasks Completion Status",
                    data: [complete, inProgress, incomplete],
                    backgroundColor: [
                        "hsl(186, 100%, 50%)",
                        "hsl(60, 100%, 85%)",
                        "hsl(1, 100%, 70%)",
                    ],
                    borderColor: [
                        "hsl(240, 100%, 50%)",
                        "hsl(60, 100%, 50%)",
                        "hsl(0, 100%, 50%)",
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });

});

var toDoBtn = document.getElementById("addtodo");
toDoBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var addToDo = document.getElementById("add-to-do").value;
    console.log(addToDo);
    var commaReplace = addToDo.replace(/,/g, "%252C");
    var fixedAddress = commaReplace.replace(/ /g, "%20");
    console.log(fixedAddress)
    var address = fixedAddress;
    var addToList = document.getElementById("to-do-list");
    var addListEl = document.createElement("li");
    var btnEl = document.createElement("button");
    addToList.append(addListEl);
    addListEl.append(btnEl);
    btnEl.innerHTML = "Map";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=" + address,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "bac4682d6fmsh029578abb1cefd5p1e11bbjsn558f94329cba"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        var latitude = response.results[0].geometry.location.lat
        console.log(latitude);
        var longitude = response.results[0].geometry.location.lng
        console.log(longitude);
        var location = {
            lat: latitude,
            lng: longitude
        };

        function initMap() {
            var map = new google.maps.Map(document.getElementById("map"), {
                center: location,
                zoom: 10,
            });
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
        };
        initMap();
    });
});