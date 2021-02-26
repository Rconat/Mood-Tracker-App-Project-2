const zipcodeInput = document.getElementById('zip')
$(document).on('change', zipcodeInput , function() {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=60534&appid=56aea7b174cb46d06def2c0892d14ff9`

    console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET"})
    
    .then(function (response) {
        console.log(response)
        const icon = response.weather[0].icon
        const iconUrl =  "http://openweathermap.org/img/w/" + icon + ".png"
        $('#wicon').attr('src', iconUrl);
    });
    $('#wicon').removeClass('hide')
   
  });

  //need to ask about async await

  