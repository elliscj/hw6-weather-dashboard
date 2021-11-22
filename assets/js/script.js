//"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,alerts&appid=e21bef52f4595a9117145774881d361c"

//"http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}""

// weather icons = <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>

// var icon = "http://openweathermap.org/img/wn/" + todayIcon + ".png";

var searchCity = "";
var apiCity = "";

var apiKey = "e21bef52f4595a9117145774881d361c";

var geoUrl =
  "https://api.openweathermap.org/geo/1.0/direct?q=" +
  apiCity +
  "&limit=1&appid=" +
  apiKey;
var currentDay = moment.unix(1637690400).format("MMM Do");

console.log(currentDay);

function getGeo() {
  searchCity = document.getElementById("search-input").value;
  apiCity = searchCity.trim();
  geoUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    apiCity +
    "&limit=1&appid=" +
    apiKey;

  // console.log(searchCity);
  // console.log(futureUrl);
  // console.log(apiCity);
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //for loop to populate 5-day cards
      //moment for formatting dates from api
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon);
      getWeather(lat, lon);

      //localStorage//
      var allSearches = JSON.parse(localStorage.getItem("searches")) || [];
      var searchName = data[0].name;
      document.getElementById("city").textContent = searchName;

      var searchStorage = searchName;
      allSearches.push(searchStorage);
      localStorage.setItem("searches", JSON.stringify(allSearches));
      console.log(searchStorage);
      console.log(allSearches);
      //search history .show
      var template = "";
      for (let i = 0; i > searchStorage.length; i++) {
        template += `<li> ${allSearches[i]} <li>`;
      }

      document.getElementById("search-history").append(template);

      console.log("hi");
    });
}

function getWeather(lat, lon) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&exclude=minutely,hourly,alerts&appid=" +
    apiKey;
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderDisplay(data);
      console.log(data.current.weather[0].icon);
    });
}

function renderDisplay(data) {
  var todayIcon = data.current.weather[0].icon;
  var iconSrc = "https://openweathermap.org/img/wn/" + todayIcon + ".png";
  var todayTemp = data.current.temp;
  var todayWind = data.current.wind_speed;
  var todayHumid = data.current.humidity;
  var todayUv = data.current.uvi;

  var todayIconEl = document.querySelector(".icon-1");
  todayIconEl.src = iconSrc;
  var todayTempEl = document.querySelector(".temp-1");
  todayTempEl.textContent = "Temp: " + todayTemp + " \u2109";
  var todayWindEl = document.querySelector(".wind-1");
  todayWindEl.textContent = "Wind: " + todayWind + " mph";
  var todayHumidEl = document.querySelector(".humid-1");
  todayHumidEl.textContent = "Humidity: " + todayHumid + "%";
  var todayUvEl = document.querySelector(".uv-1");
  todayUvEl.textContent = "UV Index: " + todayUv;
  if (todayUv < 3) {
    todayUvEl.classList.add("favorable");
  } else if (todayUv < 6) {
    todayUvEl.classList.add("moderate");
  } else if (todayUv < 8) {
    todayUvEl.classList.add("high");
  } else todayUvEl.classList.add("severe");

  var tempsH = document.querySelectorAll(".temp-h");
  var tempsL = document.querySelectorAll(".temp-l");
  var winds = document.querySelectorAll(".wind");
  var humids = document.querySelectorAll(".humid");
  var icons = document.querySelectorAll(".icon");
  var dates = document.querySelectorAll(".date");

  for (let i = 0; i < 5; i++) {
    tempsH[i].textContent = "High: " + data.daily[i + 1].temp.max + " \u2109";
    tempsL[i].textContent = "Low: " + data.daily[i + 1].temp.min + " \u2109";
    winds[i].textContent = "Wind: " + data.daily[i + 1].wind_speed + " mph";
    humids[i].textContent = "Humidity: " + data.daily[i + 1].humidity + "%";
    icons[i].src =
      "https://openweathermap.org/img/wn/" +
      data.daily[i + 1].weather[0].icon +
      ".png";
    dates[i].textContent = moment.unix(data.daily[i + 1].dt).format("MMM Do");
  }
}

//document.getElementById("day-" + i) for loop i>5 append all^^

document.querySelector(".searchBtn").addEventListener("click", getGeo);

document
  .getElementById("search-input")
  .addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      event.preventDefault();
      getGeo();
    }
  });
// console.log(lat, lon);
