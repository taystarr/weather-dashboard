var cityInputEl = document.querySelector("#city");

var apiKey = "277f0fb7aae3b4c0ac697e387ae15bf4";

var cityWeather = function () {
    var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&APPID=" + apiKey;
    
    fetch(cityUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getWeather();
cityWeather();