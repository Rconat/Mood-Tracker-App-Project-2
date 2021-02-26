/* eslint-disable */

$(document).ready(() => {

    // This file just does a GET request to find the past week's data and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        console.log(data)

        MoodByDate(data);
        MoodWith(data);
    });
<<<<<<< HEAD
  });

  // populate graph with latest entries

  // modal to pop up on node click
    // close modal on 'x' click

  // graphs associating yes//no answers
=======

    let labelArray = [];
    let dataArray = [];
    let labelGroupArray = [];
    let dataWithOthers = [];
    let dataNotWithOthers = [];
    let dataEatenToday = [];
    let dataNotEatenToday = [];
    let dataTakenMeds = [];
    let dataNotTakenMeds = [];

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
            }
            else {
                dataNotWithOthers.push(element.mood_rating);
            }

            if (element.eaten_today) {
                dataEatenToday.push(element.mood_rating);
            }
            else {
                dataNotEatenToday.push(element.mood_rating);
            }

            if (element.medications_today) {
                dataTakenMeds.push(element.medications_today);
            }
            else {
                dataNotTakenMeds.push(element.medications_today);
            }

            labelArray.push(element.createdAt.slice(0, 10));

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
                // labels: ['Red'],
                labels: labels,
                datasets: [{
                    label: 'Last 10 Days Mood Rating',
                    fill: false,
                    data: data,
                    backgroundColor: "#88d8b0",
                    borderColor: "#88d8b0"                   
                }]
            },
            options: {
                responsive: false
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
                        label: "Not With Others",
                        backgroundColor: "#ffcc5c",
                        data: dataNotWithOthers
                    }
                    // {
                    //     label: "Eaten Today",
                    //     backgroundColor: "#88d8b0",
                    //     data: dataEatenToday
                    // },
                    // {
                    //     label: "Not Eaten Today",
                    //     backgroundColor: "#ffcc5c",
                    //     data: dataNotEatenToday
                    // }
                ]
            },
            options: {
                responsive: false
            }
        });
    }

});

>>>>>>> kim-merge-6
