/* eslint-disable */

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);

    console.log(data);

    data.forEach(element => {
      console.log(element.mood_rating);
      
    });
  });
});

// populate and display week at a glance

// populate latest diary entry

// populate past 10 diary entries if we want
