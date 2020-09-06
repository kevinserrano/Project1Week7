$(document).ready(function () {

    getProjects();

    var ctx = $("#myChart");

    var complete = 0;
    var incomplete = 0;
    var inProgress = 0;



    var myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Complete", "In Progress", "Incomplete"],
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


    var projects = [];
    var addresses = [];

    $(document).on("click", "input", function () {

        if (this.classList.contains("complete")) {
            console.log("complete clicked");
            complete++;

            inProgress = 0;
            incomplete = 0;
        } else if (this.classList.contains("inprogress")) {
            inProgress++;
            complete = 0;
            incomplete = 0;
        } else {

            return;

        }

        var myChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Complete", "In Progress", "Incomplete"],
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
    //function for drop-down but not working. it is set to browser default now.
    //document.addEventListener('DOMContentLoaded', function() {
          //var elems = document.querySelectorAll('select');
          //var instances = M.FormSelect.init(elems, options);
        //});

    var toDoBtn = document.getElementById("addtodo");
    toDoBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var addToDo = document.getElementById("address").value;
        var commaReplace = addToDo.replace(/,/g, "%252C");
        var fixedAddress = commaReplace.replace(/ /g, "%20");
        console.log(fixedAddress)
        var address = fixedAddress;
        addresses.push(address);
        localStorage.setItem("address", addresses);
        console.log(addresses);

        var projectName = document.getElementById("project-name").value;
        projects.push(projectName);
        localStorage.setItem("project", projects);
        console.log(projects);

        var addToList = document.getElementById("to-do-list");
        var addListEl = document.createElement("li");

        var formEl = document.createElement("form");
        var labelEl = document.createElement("label");
        var spanEl = document.createElement("span");

        var compEl = document.createElement("input");
        compEl.setAttribute("class", "complete");
        compEl.setAttribute("type", "radio");
        compEl.setAttribute("name", "group1")
        var incompEl = document.createElement("input");
        incompEl.setAttribute("class", "inprogress");
        incompEl.setAttribute("type", "radio");
        incompEl.setAttribute("name", "group1")
        addToList.append(addListEl);
        addListEl.append(formEl);
        formEl.append(labelEl);
        labelEl.append(compEl);
        labelEl.append(spanEl);
        spanEl.innerHTML = "Complete";
        labelEl.append(incompEl);
        labelEl.append(spanEl);
        spanEl.innerHTML = "In progress";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=" + address,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                "x-rapidapi-key": "bac4682d6fmsh029578abb1cefd5p1e11bbjsn558f94329cba",
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
                    zoom: 12,
                });
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            };
            initMap();
        });
    });

    function getProjects() {
        if (localStorage.getItem("project") === null && localStorage.getItem("address") === null) {

            console.log("No stored items")
        } else {
            var storedProjects = localStorage.getItem("project");
            var storedAddresses = localStorage.getItem("address");
            var commaReplace = storedAddresses.replace(/%252C/g, ",");
            var fixedAddress = commaReplace.replace(/%20/g, " ");

            var addToList = document.getElementById("to-do-list");
            var addListEl = document.createElement("li");

            var formEl = document.createElement("form");
            var labelEl = document.createElement("label");
            var spanEl = document.createElement("span");

            var compEl = document.createElement("input");
            compEl.setAttribute("class", "complete");
            compEl.setAttribute("type", "radio");
            compEl.setAttribute("name", "group1")

            var incompEl = document.createElement("input");
            incompEl.setAttribute("type", "radio");
            incompEl.setAttribute("name", "group1")

            addToList.append(addListEl);
            addListEl.append(formEl);
            formEl.append(labelEl);
            labelEl.append(compEl);
            labelEl.append(spanEl);

            spanEl.innerHTML = "Complete";

            addToList.append(addListEl);

            addListEl.append(storedProjects);


        }
    }

  //dropdown box for project type
    //$("select").formselect();
});