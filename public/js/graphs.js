/* eslint-disable */

$(document).ready(() => {
    var targetDates =
    // This file just does a GET request to find the past week's data and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        console.log(data)
    });
  });

  // populate graph with latest entries

  // modal to pop up on node click
    // close modal on 'x' click

  // graphs associating yes//no answers