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
});