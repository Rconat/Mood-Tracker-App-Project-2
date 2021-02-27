/* eslint-disable */

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var tenEntriesArr = []
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);

    const latestDiary = $('.pastEntryBody')
    latestDiary.text(data[0].user_diary)
    
    MoodByDate(data);
    // pastTenEntries(data);

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
    console.log("hello")
    $.get("/api/user_data").then(data => {
      var i = 0;
      console.log("pastTenEntries", data)
        data.every(element => {
          var obj = {}
          obj['diary'] = element.user_diary
          obj['dateCr'] = element.createdAt.slice(0, 10)
          tenEntriesArr.push(obj)
          
          ++i;
          if (i > 10)
          return false;
          
          return true;
        });
      console.log("second log", tenEntriesArr)
      plotEntries(tenEntriesArr)
    });
  }

  function plotEntries(tenEntriesArr) {
    console.log(tenEntriesArr)
    for(var i=0; i<tenEntriesArr.length; i++) {
      console.log("loop")
      console.log
      if (i>=10) {
        break
      }
      console.log(tenEntriesArr[i])
      $(".pastEntries").append(`
      <div class="pastTenEntriesCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${tenEntriesArr[i].dateCr}</h5>
            <p class="card-text">${tenEntriesArr[i].diary}</p>
        </div>
      </div>
      `)
    }
  }

  $("#pastTenButton").on("click", pastTenEntries) 

});