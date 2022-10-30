//Get the data from previous page from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get('source');
const range = urlParams.get('range');
const kwh = urlParams.get('kwh');
const mpg = urlParams.get('mpg');
const gasPrice = urlParams.get('gas-price');
const electricityPrice = urlParams.get('electricity-price');

//Add the current result to the history
localStorage.setItem("recent", queryString);
localStorage.setItem("source", source);

//Get the spinner reference
var spinner = document.getElementById("spinner");

//Display the vehicle data the user entered
document.getElementById("range-display").innerText = range;
document.getElementById("kwh-display").innerText = kwh;
document.getElementById("mpg-display").innerText = mpg;


//Get the data header references
var gasTitle = document.getElementById("gas-title");
var gasData = document.getElementById("gas-data");
var electricTitle = document.getElementById("electric-title");
var electricData = document.getElementById("electric-data");

//Get the dropdown references
var comparisonDropdown = document.getElementById("comparison-dropdown");
var comparisonDropdownDiv = document.getElementById("comparison-dropdown-div");


//Get the buttons, data table, and print button references
var printComparingText = document.getElementById("print-comparing-text");
var buttonGroup = document.getElementById("button-group");
var dataTable = document.getElementById("data-table");

fillVehicleData();

function shareSite() {
   if (navigator.share) {
      navigator.share({
        title: 'Plug-In Hybrid Calculator',
        url: 'https://phev-calculator.web.app'
      }).then(() => {
      })
      .catch(console.error);
    } else {
      // fallback
    }
  
}



function fillVehicleData() {
   if (comparisonDropdown.value == "cost") {

      gasTitle.innerHTML = "Cost to drive <b>" + mpg + "</b> miles on gas:";
      electricTitle.innerHTML = "Cost to drive <b>" + mpg + "</b> miles on electricity:";
      gasData.innerText = "$" + gasPrice;

      var mileageChange = range / mpg;
      var totalKwh = kwh / mileageChange;
      var totalElectricityCost = totalKwh * electricityPrice
      var totalElectricityCostRounded = totalElectricityCost.toFixed(2);


      electricData.innerText = "$" + totalElectricityCostRounded;

      printComparingText.innerText = "cost";

      showData();

   } else if (comparisonDropdown.value == "distance") {

      gasTitle.innerHTML = "Distance you can drive on <b>$" + gasPrice + "</b> worth of gas:";
      electricTitle.innerHTML = "Distance you can drive on <b>$" + gasPrice + "</b> worth of electricity:";
      gasData.innerText = mpg + " miles";

      printComparingText.innerText = "distance";

      var priceChange = gasPrice / electricityPrice;
      var kwhChange = priceChange / kwh;
      var finalMileage = kwhChange * range;
      var roundedMileage = finalMileage.toFixed(1);



      electricData.innerText = roundedMileage + " miles";

      vehicleImage.onload = function () {
         showData();
      }
   }

}

function showData() {
   spinner.style.display = "none";
   comparisonDropdownDiv.style.display = "block";
   buttonGroup.classList.remove("myhidden");
   dataTable.classList.remove("myhidden");
}




// if(vehicle == null || vehicle == ""){
//     window.location.replace("/index.html");
// }

if ("serviceWorker" in navigator) {
   window.addEventListener("load", function() {
     navigator.serviceWorker
       .register("/service-worker.js")
       .then(res => console.log("service worker registered"))
       .catch(err => console.log("service worker not registered", err))
   })
 }