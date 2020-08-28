
var ctx = $("#myChart");

var complete = 0;
var incomplete = 0;
var inProgress = 0;

var myChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Complete", "In Progress", "In Complete"],
        datasets: [{
            label: "Tasks Completion Status",
            data: [complete++, incomplete++, inProgress++],
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

var address = "1%20UTSA%20Circle%252C%20San%20Antonio%252C%20TX"

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
  var latitute = response.results[0].geometry.location.lat
  console.log(latitute);
  var longitude = response.results[0].geometry.location.lng
  console.log(longitude);

  var location = {lat: latitute, lng: longitude};
  function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 8
    });
    var marker = new google.maps.Marker({
      position: location, 
      map: map
    });
  };
  initMap();

});