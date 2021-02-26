/* eslint-disable */

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data)
  });
});

// populate and display week at a glance

// populate latest diary entry

// populate past 10 diary entries if we want
