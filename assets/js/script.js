document.querySelector(".searchBtn").addEventListener("click", function () {
  console.log("hi");
});
var searchLocation = document.getElementById("search-input").value;
apiUrl = "";

var currentDay = moment().format("MMM Do YY");

console.log(currentDay);

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //for loop to populate 5-day cards
    //moment for formatting dates from api
  });
