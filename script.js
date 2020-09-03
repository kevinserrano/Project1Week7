$(document).ready(function () {
    
    getProjects();
    
    var ctx = $("#myChart");

    var complete = 0;
    var incomplete = 1;
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


        } else if (this.classList.contains("inprogress")) {
            console.log("incomplete clicked")
            inProgress++
        } else if (this.classList.contains("nothing")) {

            return;
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

        //var compBtnEl = document.createElement("button");
        //compBtnEl.setAttribute("class", "waves-effect waves-light btn complete");
        //var incompBtnEl = document.createElement("button");
        //incompBtnEl.setAttribute("class", "waves-effect waves-light btn incomplete");
        //var inprogressBtnEl = document.createElement("button");
        //inprogressBtnEl.setAttribute("class", "waves-effect waves-light btn inprogress");

        addToList.append(addListEl);
        // addListEl.append(compBtnEl);
        //addListEl.append(incompBtnEl);
        //addListEl.append(inprogressBtnEl);
        addListEl.append(addToDo);
        //compBtnEl.innerHTML = "Complete";
        //incompBtnEl.innerHTML = "Incomplete";
        // inprogressBtnEl.innerHTML = "In Progress";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=" + address,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                "x-rapidapi-key": "bac4682d6fmsh029578abb1cefd5p1e11bbjsn558f94329cba"

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
    
            var compBtnEl = document.createElement("button");
            compBtnEl.setAttribute("class", "waves-effect waves-light btn complete");
    
            var inprogressBtnEl = document.createElement("button");
            inprogressBtnEl.setAttribute("class", "waves-effect waves-light btn inprogress");
    
            var modalBtnEl = document.createElement("button");
            modalBtnEl.setAttribute("class", "waves-effect waves-light btn");
            
            addToList.append(addListEl);
            addListEl.append(compBtnEl);
            addListEl.append(inprogressBtnEl);
            addListEl.append(modalBtnEl);
            addListEl.append(projectName);
            
            compBtnEl.innerHTML = "Complete";
            inprogressBtnEl.innerHTML = "In Progress";
            modalBtnEl.innerHTML = "Map";
    
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
        
    function getProjects (){
        if (localStorage.getItem ("project") === null && localStorage.getItem("address") === null){
            console.log("No stored items")
        } else {
            var storedProjects = localStorage.getItem ("project");
            var storedAddresses = localStorage.getItem ("address");
            var commaReplace = storedAddresses.replace(/%252C/g, ",");
            var fixedAddress = commaReplace.replace(/%20/g, " ");
            
            var addToList = document.getElementById("to-do-list");
            var addListEl = document.createElement("li");

            var compBtnEl = document.createElement("button");
            compBtnEl.setAttribute("class", "waves-effect waves-light btn complete");
    
            var inprogressBtnEl = document.createElement("button");
            inprogressBtnEl.setAttribute("class", "waves-effect waves-light btn inprogress");
    
            var modalBtnEl = document.createElement("button");
            modalBtnEl.setAttribute("class", "waves-effect waves-light btn");
            
            addToList.append(addListEl);
            addListEl.append(compBtnEl);
            addListEl.append(inprogressBtnEl);
            addListEl.append(modalBtnEl);
            addListEl.append(storedProjects);
            
            compBtnEl.innerHTML = "Complete";
            inprogressBtnEl.innerHTML = "In Progress";
            modalBtnEl.innerHTML = "Map";
        }
    }
});
