// rating npm
var Rating = require('rating');

var container = document.querySelector('.rating');
var star = document.querySelector('.star');
star.parentNode.removeChild(star);
 
var rating = new Rating([1, 2, 3, 4, 5], {
  container: container,
  star: star
});

rating.on('rate', function(weight) {
    console.log('rated: ' + weight);
  });
   
  rating.on('current', function(weight) {
    console.log('current: ' + weight);
  });