/* eslint-disable */

$(document).ready(() => {

    //
    // data arrays

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

    //
    // datasets for our graphs

    let datasetWithOthers = {};
    let datasetAlone = {};
    let datasetEatenToday = {};
    let datasetNotEaten = {};
    let datasetTakenMeds = {};
    let datasetNoMeds = {};

    //
    // btn constants and click events

    const btnWithOthers = $("#with-others");
    const btnEatenToday = $("#eaten-today");
    const btnTakenMeds = $("#taken-meds");
    const btnAll = $("#all");

    $(btnWithOthers).on("click", handleWithOthers_Click);
    $(btnEatenToday).on("click", handleEatenToday_Click);
    $(btnTakenMeds).on("click", handleMeds_Click);
    $(btnAll).on("click", handleAll_Click);

    //
    // get our data from the database and instantiate the graphs with default info

    $.get("/api/user_data").then(data => {
        //
        // default graphs to display

        MoodByDate(data);

        MoodWith(data);

        //
        // build graph datasets for customize display

        BuildDataSet();
    });

    // 
    // button handlers for custom graph  displays

    function handleWithOthers_Click() {
        AddDataSet(datasetWithOthers, datasetAlone, "Mood Ratings: With Others (pets included)");
    }
    function handleEatenToday_Click() {
        AddDataSet(datasetEatenToday, datasetNotEaten, "Mood Ratings: When Eaten Today (not just coffee)");
    }
    function handleMeds_Click() {
        AddDataSet(datasetTakenMeds, datasetNoMeds, "Mood Ratings: Taken Medications");
    }
    function handleAll_Click() {
        AddDataSetAll("Mood Ratings: All Parameters");
    }

    // 
    // dynamic adding datasets to our custom graph

    function AddDataSet(ds1, ds2, title) {

        moodChart2.data.datasets.splice(0, moodChart2.data.datasets.length);

        moodChart2.data.datasets.push(ds1);
        moodChart2.data.datasets.push(ds2);

        moodChart2.options.title.text = title;

        moodChart2.update();
        moodChart2.render();
    }

    //
    // default graph show all datasets

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

    //
    // dataset for standard graph showing mood over time

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
    // default graph with all datasets - can be customize with button click

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

    //
    // pre-build graph datasets for later use

    function BuildDataSet() {
        datasetWithOthers = {
            label: "With Others",
            backgroundColor: "#ff6f69",
            data: dataWithOthers
        };

        datasetAlone = {
            label: "Alone",
            backgroundColor: "#ffb7b4", 
            data: dataNotWithOthers
        };

        datasetEatenToday = {
            label: "Eaten Today",
            backgroundColor: "#88d8b0",
            data: dataEatenToday
        };

        datasetNotEaten = {
            label: "Not Eaten Today",
            backgroundColor: "#cfefdf", 
            data: dataNotEatenToday
        };

        datasetTakenMeds = {
            label: "Had Meds",
            backgroundColor: "#ffcc5c",
            data: dataTakenMeds
        }

        datasetNoMeds = {
            label: "No Meds",
            backgroundColor: "#ffe5ad",
            data: dataNotTakenMeds
        }
    }

    //
    // graph plotting

    function PlotGraph(labels, data) {

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mood Rating for the Latest 10 Entries',
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
                            return "Star rating : " + Number(tooltipItem.yLabel) + " out of 10";
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
                            beginAtZero: true,
                            suggestedMax: 10
                        }
                    }]
                },
                changeScale: true
            }
        });
    }

    function PlotGroupGraph() {       

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
                        backgroundColor: "#ffb7b4", 
                        data: dataNotWithOthers
                    },
                    {
                        label: "Eaten Today",
                        backgroundColor: "#88d8b0",
                        data: dataEatenToday
                    },
                    {
                        label: "Not Eaten Today",
                        backgroundColor: "#cfefdf", 
                        data: dataNotEatenToday
                    },
                    {
                        label: "Had Meds",
                        backgroundColor: "#ffcc5c",
                        data: dataTakenMeds
                    },
                    {
                        label: "No Meds",
                        backgroundColor: "#ffe5ad", 
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
                            beginAtZero: true,
                            suggestedMax: 10
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
