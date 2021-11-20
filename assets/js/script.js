//"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,alerts&appid=e21bef52f4595a9117145774881d361c"
https: var searchCity = "";
var apiCity = "";
var apiKey = "e21bef52f4595a9117145774881d361c";
var futureUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  lat +
  "&lon=" +
  lon +
  "&exclude=minutely,hourly,alerts&appid=" +
  apiKey;

var currentDay = moment().format("MMM Do YY");

console.log(currentDay);

document.querySelector(".searchBtn").addEventListener("click", function () {
  searchCity = document.getElementById("search-input").value;
  apiCity = searchCity.trim();
  var currentUrl =
    "api.openweathermap.org/data/2.5/weather?q=" +
    apiCity +
    "&units=imperial&appid=" +
    apiKey;

  console.log("hi");
  console.log(searchCity);
  console.log(futureUrl);
  console.log(apiCity);
  fetch(cfutureUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //for loop to populate 5-day cards
      //moment for formatting dates from api
    });
});
