/* eslint-disable */

$(document).ready(() => {
    var targetDates =
    // This file just does a GET request to find the past week's data and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        console.log(data)
    });
  });