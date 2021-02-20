// weather api
// var currentDay= moment
var currentCity = 'Chicago'
// var recentCities = ['Chicago']
var apiKey = 'c9ef626d3d26fe5016c7a097d15877da'

// rating npm
var Rating = require('rating');
 
var container = document.querySelector('.rating');
var star = document.querySelector('.star');
star.parentNode.removeChild(star);
 
var rating = new Rating([1, 2, 3, 4, 5], {
  container: container,
  star: star
});
 

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} - current weather
var currentWeatherCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&appid=' + apiKey
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} - 5 day forecast
var fiveDayCall = 'https://www.api.openweathermap.org/data/2.5/forecast?q=' + currentCity + "&appid=" + apiKey

$.ajax({url: currentWeatherCall, success: function(result){
    console.log(result)
}});


rating.on('rate', function(weight) {
  console.log('rated: ' + weight);
});
 
rating.on('current', function(weight) {
  console.log('current: ' + weight);
});