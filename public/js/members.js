/* eslint-disable */

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var tenEntriesArr = []
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);

    // console.log(data);
    // console.log(data[0].user_diary)
    const latestDiary = $('.pastEntryBody')
    latestDiary.text(data[0].user_diary)
    
    pastTenEntries(data);
    MoodByDate(data);

  });

  $.get("/api/user").then(data => {
    $(".member-name").text(data.email);
  });

  let labelArray = [];
  let dataArray = [];

  function MoodByDate(data) {
    var i = 0;

    data.every(element => {
        dataArray.push(element.mood_rating);
        labelArray.push(element.createdAt.slice(0, 10));

        ++i;
        if (i > 10)
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
            labels: labels,
            datasets: [{
                label: 'Mood Ratings for Latest 10 Entries',
                fill: false,
                data: data,
                backgroundColor: "#88d8b0",
                borderColor: "#88d8b0",
                lineTension: 0.0                   
            }]
        },
        options: {
            responsive: false
        }
    });
  }

  function pastTenEntries(data) {
    var i = 0;
    console.log("pastTenEntries", data)
    data.every(element => {
        tenEntriesArr.push([element.user_diary, element.createdAt.slice(0, 10)])

        ++i;
        if (i > 10)
            return false;

        return true;
    });
    console.log(tenEntriesArr)
    plotEntries(tenEntriesArr)
  }

  function plotEntries(tenEntriesArr) {
    for(var i=0; i<10; i++) {
      $(".pastEntries").append(`
      <div class="pastTenEntriesCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${tenEntriesArr[i][1]}</h5>
            <p class="card-text">${tenEntriesArr[i][0]}</p>
        </div>
      </div>
      `)
    }

    // $(".pastTenEntries").append(`<li>${}</li>`)
  }

  // $(".pastTenButton").on("click", pastTenEntries())
  
});

// populate and display week at a glance

// populate latest diary entry

// populate past 10 diary entries if we want
