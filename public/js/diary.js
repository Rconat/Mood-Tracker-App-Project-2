
const weatherBtn = document.getElementById("findWeatherButon");
const zipcodeInput = document.getElementById('zipCodeInput')




$(weatherBtn).on('click', ()=>{
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcodeInput.value}&appid=56aea7b174cb46d06def2c0892d14ff9`



   
    $.ajax({ url: queryURL, method: "GET"}).then(function (response) {

        console.log('clicked')


        const icon = response.weather[0].icon
        const iconUrl =  "http://openweathermap.org/img/w/" + icon + ".png"
        

        $('#wicon').attr('src', iconUrl);
        
        
    });
    $('#wicon').removeClass('hide')

})



