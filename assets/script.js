var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var searchButton = document.querySelector("#search-button");

var apiKey = "277f0fb7aae3b4c0ac697e387ae15bf4";

var cityFormHandler = function(event) {

    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please try again");
    }

    console.log(event);
};

var getCityWeather = function (city) {
    var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey;
    
    fetch(cityUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

var getUvI = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUvI();
getCityWeather('philadelphia');

cityFormEl.addEventListener("submit", cityFormHandler);