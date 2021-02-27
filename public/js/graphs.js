/* eslint-disable */

$(document).ready(() => {

    // This file just does a GET request to find the past week's data and updates the HTML on the page

    let labelArray = [];
    let dataArray = [];
    let labelGroupArray = [];
    let dataWithOthers = [];
    let dataNotWithOthers = [];
    let dataEatenToday = [];
    let dataNotEatenToday = [];
    let dataTakenMeds = [];
    let dataNotTakenMeds = [];

    const btnWithOthers = $("#with-others");
    const btnEatenToday = $("#eaten-today");
    const btnTakenMeds = $("#taken-meds");

    //$(btnEatenToday).on("click", handleEatenToday_Click);

    $.get("/api/user_data").then(data => {
        console.log(data)

        MoodByDate(data);
        MoodWith(data);
    });

    function MoodByDate(data) {
        var i = 0;

        data.every(element => {
            dataArray.push(element.mood_rating);
            labelArray.push(element.createdAt.slice(0, 10));

            ++i;
            if (i > 15)
                return false;

            return true;
        });

        PlotGraph(labelArray, dataArray);
    }

    function MoodWith(data) {
        var i = 0;

        data.every(element => {
            labelGroupArray.push(element.createdAt.slice(0, 10));

            if (element.with_others) {
                dataWithOthers.push(element.mood_rating);
                dataNotWithOthers.push(0);
            }
            else {
                dataNotWithOthers.push(element.mood_rating);
                dataWithOthers.push(0);
            }

            if (element.eaten_today) {
                dataEatenToday.push(element.mood_rating);
                dataNotEatenToday.push(0);
            }
            else {
                dataNotEatenToday.push(element.mood_rating);
                dataEatenToday.push(0);
            }

            if (element.medications_today) {
                dataTakenMeds.push(element.mood_rating);
                dataNotTakenMeds.push(0);
            }
            else {
                dataNotTakenMeds.push(element.mood_rating);
                dataTakenMeds.push(0);
            }            

            ++i;
            if (i > 9)
                return false;

            return true;
        });


        PlotGroupGraph();
    }


    function PlotGraph(labels, data) {

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Last 15 Entries Mood Rating',
                    fill: false,
                    data: data,
                    backgroundColor: "#88d8b0",
                    borderColor: "#88d8b0",
                    lineTension: 0.3
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Mood Ratings"
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return "Star rating *" + Number(tooltipItem.yLabel) + " out 10";
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Mood Rating'
                        }
                    }]
                }
            }
        });
    }

    function PlotGroupGraph() {

        console.log(dataEatenToday);

        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelGroupArray,
                datasets: [
                    {
                        label: "With Others",
                        backgroundColor: "#ff6f69",
                        data: dataWithOthers
                    },
                    {
                        label: "Alone",
                        backgroundColor: "#ffb7b4", //"#ffcc5c",
                        data: dataNotWithOthers
                    },
                    {
                        label: "Eaten Today",
                        backgroundColor: "#88d8b0",
                        data: dataEatenToday
                    },
                    {
                        label: "Not Eaten Today",
                        backgroundColor: "#cfefdf", //"#ffcc5c",
                        data: dataNotEatenToday
                    },
                    {
                        label: "Had Meds",
                        backgroundColor: "#ffcc5c",
                        data: dataTakenMeds
                    },
                    {
                        label: "No Meds",
                        backgroundColor: "#ffe5ad", //"#ffcc5c",
                        data: dataNotTakenMeds
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Mood Ratings When With Others"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Mood Rating"
                        }
                    }]
                }
            }
        });
    }

});
