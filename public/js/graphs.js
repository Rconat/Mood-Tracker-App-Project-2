/* eslint-disable */

$(document).ready(() => {
    // This file just does a GET request to find the past week's data and updates the HTML on the page
    $.get("/api/graphs").then(data => {
        console.log(data)
    //   $(".member-name").text(data.email);
    });
  });