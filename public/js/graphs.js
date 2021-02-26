/* eslint-disable */

$(document).ready(() => {

    // This file just does a GET request to find the past week's data and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        console.log(data)

        MoodByDate(data);

    });

    let labelArray = [];
    let dataArray = [];

    function MoodByDate(data) {

        var i=0;

        data.every(element => {
            dataArray.push(element.mood_rating);
            labelArray.push(element.createdAt.slice(0,10) );

            ++i;
            if (i>9)
                return false;

            return true;
        });

        PlotGraph(labelArray, dataArray);
    }

    function PlotGraph(labels, data) {

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                // labels: ['Red'],
                labels: labels,
                datasets: [{
                    label: 'Past Week Moods',
                    // data: [5, 8, 2, 7, 6, 8, 10],
                    data: data,
                }]
            },
            options: {
                responsive: false
            }
        });
    }

});

