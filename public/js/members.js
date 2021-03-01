/* eslint-disable */

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var tenEntriesArr = []
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);


    const latestDiary = $('#latestDiary')
    const latestDate = $('#latestDate')
    // const latestWeather = $('#latestWeather')
    const latestEaten = $('#latestEaten')
    const latestWithOthers = $('#latestWithOthers')
    const latestMedication = $('#latestMedication')
    const latestMoodRate = $('#latestMoodRate')
    
    latestDiary.text("Diary entry: " + data[0].user_diary)
    latestDate.text("Date of entry: " + data[0].createdAt.slice(0, 10))
    // latestWeather.text("Weather on day of entry: " + data.weather_abbrev)
    latestEaten.text("Had you eaten? : " + data[0].eaten_today)
    latestWithOthers.text("Were you with others? : " + data[0].with_others)
    latestMedication.text("Did you take medication? : " + data[0].medications_today)
    latestMoodRate.text("You rated you mood : " + data[0].mood_rating)

    
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
                lineTension: 0.3                   
            }]
        },
        options: {
          responsive: true,
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
          }
        }
    });

    // Clicking a point on the Graph will load the details of that entry below
    document.getElementById("myChart").onclick = function(evt){
      var activePoints = myChart.getElementsAtEvent(evt);

      $.get("/api/user_data").then(data => {
        const pointDiary = $('#pointDiary')
        const pointDate = $('#pointDate')
        const pointWeather = $('#pointWeather')
        const pointEaten = $('#pointEaten')
        const pointWithOthers = $('#pointWithOthers')
        const pointMedication = $('#pointMedication')
        const pointMoodRate = $('#pointMoodRate')

        pointDiary.text("Diary entry: " + data[activePoints[0]._index].user_diary)
        pointDate.text("Date of entry: " + data[activePoints[0]._index].createdAt.slice(0, 10))
        // pointWeather.text("Weather on day of entry: " + data[activePoints[0]._index].weather_abbrev)
        pointEaten.text("Had you eaten? : " + data[activePoints[0]._index].eaten_today)
        pointWithOthers.text("Were you with others? : " + data[activePoints[0]._index].with_others)
        pointMedication.text("Did you take medication? : " + data[activePoints[0]._index].medications_today)
        pointMoodRate.text("You rated you mood : " + data[activePoints[0]._index].mood_rating)
        
        pointEntry();
      });
    };
  }

  // hiding the latest entry and showing the point clicked entry
  function pointEntry() {
    $('#latestEntryTag').hide()
    $('#pastEntryTag').show()
    $('.pointEntry').show()
    $('.pastEntry').hide()
  }

  function pastTenEntries(data) {
    $.get("/api/user_data").then(data => {
      var i = 0;

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

      plotEntries(tenEntriesArr)

    });
  }

  function plotEntries(tenEntriesArr) {

    for(var i=0; i<tenEntriesArr.length; i++) {

      if (i>=10) {
        break
      }
 
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