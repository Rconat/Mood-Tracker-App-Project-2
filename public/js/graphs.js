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

    let moodChart2;

    let datasetWithOthers = {};
    let datasetAlone = {};
    let datasetEatenToday = {};
    let datasetNotEaten = {};
    let datasetTakenMeds = {};
    let datasetNoMeds = {};

    const btnWithOthers = $("#with-others");
    const btnEatenToday = $("#eaten-today");
    const btnTakenMeds = $("#taken-meds");
    const btnAll = $("#all");

    $(btnWithOthers).on("click", handleWithOthers_Click);
    $(btnEatenToday).on("click", handleEatenToday_Click);
    $(btnTakenMeds).on("click", handleMeds_Click);
    $(btnAll).on("click", handleAll_Click);



    $.get("/api/user_data").then(data => {
        console.log(data)

        //
        // default graphs

        MoodByDate(data);

        MoodWith(data);

        //
        // build graph datasets for customization

        BuildDataSet();
    });

    function handleWithOthers_Click() {
        AddDataSet(datasetWithOthers, datasetAlone, "Mood Ratings: With Others (pets included)");
    }
    function handleEatenToday_Click() {
        AddDataSet(datasetEatenToday, datasetNotEaten, "Mood Ratings: When Eaten Today (not just coffe)");
    }
    function handleMeds_Click() {
        AddDataSet(datasetTakenMeds, datasetNoMeds, "Mood Ratings: Taken Medications (you deceide)");
    }
    function handleAll_Click() {
        AddDataSetAll("Mood Ratings: All Parameters");
    }

    function AddDataSet(ds1, ds2, title) {

        moodChart2.data.datasets.splice(0, moodChart2.data.datasets.length);

        moodChart2.data.datasets.push(ds1);
        moodChart2.data.datasets.push(ds2);

        moodChart2.options.title.text = title;

        moodChart2.update();
        moodChart2.render();
    }

    function AddDataSetAll(title) {

        moodChart2.data.datasets.splice(0, moodChart2.data.datasets.length);

        moodChart2.data.datasets.push(datasetNoMeds);
        moodChart2.data.datasets.push(datasetTakenMeds);

        moodChart2.data.datasets.push(datasetNotEaten);
        moodChart2.data.datasets.push(datasetEatenToday);

        moodChart2.data.datasets.push(datasetAlone);
        moodChart2.data.datasets.push(datasetWithOthers);

        moodChart2.options.title.text = title;

        moodChart2.update();
        moodChart2.render();
    }

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

    //
    // build datasets for the graphs to dynamically add or remove

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

    function BuildDataSet() {
        datasetWithOthers = {
            label: "With Others",
            backgroundColor: "#ff6f69",
            data: dataWithOthers
        };

        datasetAlone = {
            label: "Alone",
            backgroundColor: "#ffb7b4", //"#ffcc5c",
            data: dataNotWithOthers
        };

        datasetEatenToday = {
            label: "Eaten Today",
            backgroundColor: "#88d8b0",
            data: dataEatenToday
        };

        datasetNotEaten = {
            label: "Not Eaten Today",
            backgroundColor: "#cfefdf", //"#ffcc5c",
            data: dataNotEatenToday
        };

        datasetTakenMeds = {
            label: "Had Meds",
            backgroundColor: "#ffcc5c",
            data: dataTakenMeds
        }

        datasetNoMeds = {
            label: "No Meds",
            backgroundColor: "#ffe5ad", //"#ffcc5c",
            data: dataNotTakenMeds
        }
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
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function PlotGroupGraph() {

        console.log(dataEatenToday);

        var ctx = document.getElementById('myChart2').getContext('2d');
        moodChart2 = new Chart(ctx, {
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
                    text: "Mood Ratings All Parameters"
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
