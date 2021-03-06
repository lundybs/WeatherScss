﻿const weatherAPIURL = "https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather";
const london = "?lat=51.5074&lon=-0.1278";
const seattle = "?lat=47.6762&lon=-122.3182";
const apiKey = "&APPID=df630ddcd4d316d08e414796f044e775&units=imperial";


function LondonWeather() {
    let londonWeatherRequest = new XMLHttpRequest();
    console.log(weatherAPIURL + london + apiKey);
    let displayWeather = document.getElementById("weather-container");
    londonWeatherRequest.open("GET", weatherAPIURL + london + apiKey, true)

    londonWeatherRequest.onload = function () {
        let response = JSON.parse(this.response);
        // console.log(response.weather.main);
        displayWeather.innerHTML = `<p>Current Temp: ${response.body.main.temp} degrees Fahrenheit </br>
                                    Wind Speeed: ${response.body.wind.speed} mph </br>
                                    Current Humidity: ${response.body.main.humidity}%</p>`;
    }

    londonWeatherRequest.onerror = function () {
        let displayWeather = document.getElementById("weather-container");
        displayWeather.innerHTML = "The server could not be reached for info";
        console.log("Error in accessing weather data");
    }

    londonWeatherRequest.send();
}

function SeattleWeather() {
    let seattleWeatherRequest = new XMLHttpRequest();
    //console.log(weatherAPIURL + seattle + apiKey);
    let displayWeather = document.getElementById("weather-container");
    seattleWeatherRequest.open("GET", weatherAPIURL + seattle + apiKey, true)

    seattleWeatherRequest.onload = function () {

        let response = JSON.parse(this.response);
        //console.log(response.weather.description);
        displayWeather.innerHTML = `<p>Current Temp: ${response.body.main.temp} degrees Fahrenheit </br>
                                    Wind Speeed: ${response.body.wind.speed} mph </br>
                                    Current Humidity: ${response.body.main.humidity}%</p>`;
    }

    seattleWeatherRequest.onerror = function () {
        let displayWeather = document.getElementById("weather-container");
        displayWeather.innerHTML = `The server could not be reached for info`;
        console.log("Error in accessing weather data");
    }

    seattleWeatherRequest.send();
}

function MyLocalWeather() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myPosition);
    } else {
        displayWeather.innerHTML = "Your location was not found!";
    }
}

function myPosition(position) {
    let myWeatherRequest = new XMLHttpRequest();
    let displayWeather = document.getElementById("weather-container");
    //console.log(weatherAPIURL + "weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + apiKey);
    myWeatherRequest.open("GET", weatherAPIURL + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + apiKey, true)

    myWeatherRequest.onload = function () {
        let response = JSON.parse(this.response);
        // console.log(response.body.weather.main);
        displayWeather.innerHTML = `<p> Your location is: ${response.body.name}</br>
                                    Current Temp: ${response.body.main.temp} degrees Fahrenheit </br>
                                    Wind Speeed: ${response.body.wind.speed} mph </br>
                                    Current Humidity: ${response.body.main.humidity}%</p>`;
    }

    myWeatherRequest.onerror = function () {
        let displayWeather = document.getElementById("weather-container");
        displayWeather.innerHTML = `The server could not be reached for info`;
        console.log("Error in accessing weather data");
    }

    myWeatherRequest.send();
}

var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                                                 'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}