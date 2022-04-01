var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var searchButton = document.querySelector("#search-button");
var currentWeather = document.querySelector("#today-weather");
var futureWeather = document.querySelector("#future-weather");

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

            var searchedCity = data.name;
            var cityIcon = data.weather[0].icon;
            var cityTemp = "Temperature: " + data.main.temp + "°F";
            var cityHumid = "Humidity: " + data.main.humidity + "%";
            var cityWind = "Wind Speed: " + data.wind.speed + "mph";

            //city name
            var cityName = document.createElement("p");
            cityName.textContent = searchedCity;
            cityName.classList = "list-group-item fs-4 fw-bold";
            console.log(cityName);
            currentWeather.append(cityName);
           
            //city icon
            var icon = document.createElement("img")
            icon.setAttribute("src", "https://openweathermap.org/img/w/" + cityIcon + ".png");
            cityName.append(icon);
            
            //temp
            var temp = document.createElement("p");
            temp.textContent = cityTemp;
            temp.classList = "fw-light fs-6 inline-block";
            cityName.append(temp);

            //humidity
            var humidity = document.createElement("p");
            humidity.textContent = cityHumid;
            humidity.classList = "fw-light fs-6 inline-block";
            cityName.append(humidity);

            //wind speed
            var wind = document.createElement("p");
            wind.textContent = cityWind;
            wind.classList = "fw-light fs-6 inline-block";
            cityName.append(wind);

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;

            fetch(apiUrl).then(function(response) {
                response.json().then(function(data) {
                    console.log(data);

                    var cityUv = "UV Index: " + data.current.uvi;

                    //UV Index
                    var uvIndex = document.createElement("p");
                    uvIndex.textContent = cityUv;
                    uvIndex.classList = "fw-light fs-6 inline-block";
                    cityName.append(uvIndex);
                });
            });

            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            
            fetch(forecastUrl).then(function(response) {
                response.json().then(function(data) {
                    console.log(data);

                    for (var i = 5; i < data.list.length; i+=8) { 
                    
                    var forecastDate = moment(data.list[i].dt_txt).format("L");
                    var forecastIcon = data.list[i].weather[0].icon;
                    var forecastTemp = "Temperature: " + data.list[i].main.temp + "°F";
                    var forecastHumid = "Humidity: " + data.list[i].main.humidity + "%";
                    var forecastWind = "Wind Speed: " + data.list[i].wind.speed + "mph";

                    console.log(forecastDate);
                    console.log(forecastIcon);
                    console.log(forecastTemp);
                    console.log(forecastWind);
                    console.log(forecastHumid);
                    };

                });
            });

        });
    });
};

// var getUvI = function() {
    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + "&lon=" + "&exclude=hourly,daily&appid=" + apiKey;

    // fetch(apiUrl).then(function(response) {
    //     response.json().then(function(data) {
    //         console.log(data);
    //     });
    // });
// };

// getUvI();

cityFormEl.addEventListener("submit", cityFormHandler);