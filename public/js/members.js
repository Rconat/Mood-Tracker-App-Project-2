$(document).ready(() => {
  const tenEntriesArr = [];

  // request to pull the member name from the database and populate the dom element
  $.get("/api/user").then(data => {
    $(".member-name").text(data.email);
  });

  // request to pull the latest diary entry from the database and populate the diary card with the info
  $.get("/api/user_data").then(data => {
    const latestDiary = $("#latestDiary");
    const latestDate = $("#latestDate");
    const latestEaten = $("#latestEaten");
    const latestWithOthers = $("#latestWithOthers");
    const latestMedication = $("#latestMedication");
    const latestMoodRate = $("#latestMoodRate");

    latestDiary.text("Diary entry: " + data[0].user_diary);
    latestDate.text("Date of entry: " + data[0].createdAt.slice(0, 10));
    latestMoodRate.text(
      "You rated you mood : " + data[0].mood_rating + " out of 10"
    );

    if (data[0].eaten_today === true) {
      latestEaten.text("Had you eaten? : Yes");
    } else {
      latestEaten.text("Had you eaten? : No");
    }

    if (data[0].with_others === true) {
      latestWithOthers.text("Were you with others? : Yes");
    } else {
      latestWithOthers.text("Were you with others? : No");
    }

    if (data[0].medications_today === true) {
      latestMedication.text("Did you take medication? : Yes");
    } else {
      latestMedication.text("Did you take medication? : No");
    }

    MoodByDate(data);
  });

  // function to grab the latest 10 entries and pushing those values into arrays to be used by the graph
  const labelArray = [];
  const dataArray = [];

  function MoodByDate(data) {
    let i = 0;

    data.every(element => {
      dataArray.push(element.mood_rating);
      labelArray.push(element.createdAt.slice(0, 10));

      ++i;
      if (i >= 10) {
        return false;
      }
      return true;
    });

    PlotGraph(labelArray, dataArray);
  }

  // function to plot the graph taking in the latest 10 entries
  function PlotGraph(labels, data) {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Mood Rating for the Latest " + data.length + " Entries",
            fill: false,
            data: data,
            backgroundColor: "#88d8b0",
            borderColor: "#88d8b0",
            lineTension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Mood Ratings"
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return (
                "Star rating : " + Number(tooltipItem.yLabel) + " out of 10"
              );
            }
          }
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Mood Rating"
              },
              ticks: {
                beginAtZero: true,
                suggestedMax: 10
              }
            }
          ]
        }
      }
    });

    // Clicking a point on the Graph will load the details of that entry below
    document.getElementById("myChart").onclick = function(evt) {
      const activePoints = myChart.getElementsAtEvent(evt);

      $.get("/api/user_data").then(data => {
        const pointDiary = $("#pointDiary");
        const pointDate = $("#pointDate");
        const pointEaten = $("#pointEaten");
        const pointWithOthers = $("#pointWithOthers");
        const pointMedication = $("#pointMedication");
        const pointMoodRate = $("#pointMoodRate");

        pointDiary.text(
          "Diary entry: " + data[activePoints[0]._index].user_diary
        );
        pointDate.text(
          "Date of entry: " +
            data[activePoints[0]._index].createdAt.slice(0, 10)
        );
        pointMoodRate.text(
          "You rated you mood : " +
            data[activePoints[0]._index].mood_rating +
            " out of 10"
        );

        if (data[activePoints[0]._index].eaten_today === true) {
          pointEaten.text("Had you eaten? : Yes");
        } else {
          pointEaten.text("Had you eaten? : No");
        }

        if (data[activePoints[0]._index].with_others === true) {
          pointWithOthers.text("Were you with others? : Yes");
        } else {
          pointWithOthers.text("Were you with others? : No");
        }

        if (data[activePoints[0]._index].medications_today === true) {
          pointMedication.text("Did you take medication? : Yes");
        } else {
          pointMedication.text("Did you take medication? : No");
        }

        pointEntry();
      });
    };
  }

  // hiding the latest entry and showing the point clicked entry
  function pointEntry() {
    $("#latestEntryTag").hide();
    $("#pastEntryTag").show();
    $("#pastTenEntryTag").hide();
    $(".pointEntry").show();
    $(".pastEntry").hide();
    $(".pastEntries").hide();
  }

  // function to pull the data from the last 10 entries
  function pastTenEntries() {
    $.get("/api/user_data").then(data => {
      let i = 0;

      data.every(element => {
        const obj = {};
        obj.diary = element.user_diary;
        obj.dateCr = element.createdAt.slice(0, 10);
        obj.eaten = element.eaten_today;
        obj.withOthers = element.with_others;
        obj.medication = element.medications_today;
        obj.mood = element.mood_rating;

        tenEntriesArr.push(obj);

        ++i;
        if (i > 10) {
          return false;
        }
        return true;
      });

      plotEntries(tenEntriesArr);
    });
  }

  // function taking in the past 10 diary entries and appending them to the dom
  function plotEntries(tenEntriesArr) {
    for (let i = 0; i < tenEntriesArr.length; i++) {
      if (i >= 10) {
        break;
      }

      $(".pastEntries").append(`
        <div class="pastTenEntryBody">
          <h3 id="pastTenDate">Date of entry: ${tenEntriesArr[i].dateCr}</h3>
          <p id="pastTenDiary">Diary entry: ${tenEntriesArr[i].diary}</p>
          <p id="pastTenEaten">Had you eaten? : ${tenEntriesArr[i].eaten}</p>
          <p id="pastTenWithOthers">Were you with others? : ${tenEntriesArr[i].withOthers}</p>
          <p id="pastTenMedication">Did you take medication? : ${tenEntriesArr[i].medication}</p>
          <p id="pastTenMoodRate">You rated you mood : ${tenEntriesArr[i].mood} out of 10</p>
        </div>
      `);
    }

    $("#pastTenEntryTag").show();
    $("#latestEntryTag").hide();
    $("#pastEntryTag").hide();
    $(".pointEntry").hide();
    $(".pastEntry").hide();
    $(".pastEntries").show();
  }

  $("#pastTenButton").on("click", pastTenEntries);
});
