const zipcodeInput = document.getElementById("zip");
// function to bring in api weather call and populate DOM with weather icon for current weather
$(document).on("change", zipcodeInput, () => {
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=60534&appid=56aea7b174cb46d06def2c0892d14ff9";

  $.ajax({ url: queryURL, method: "GET" }).then(response => {
    const icon = response.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    $("#wicon").attr("src", iconUrl);
  });
  $("#wicon").removeClass("hide");
});
