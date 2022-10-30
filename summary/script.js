//Get the data from previous page from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get('source');
const vehicle = urlParams.get('vehicle')
const gasPrice = urlParams.get('gas-price');
const electricityPrice = urlParams.get('electricity-price');

//Add the current result to the history
localStorage.setItem("recent", queryString);
localStorage.setItem("source", source);

//Get the spinner reference
var spinner = document.getElementById("spinner");

//Get the data header references
var gasTitle = document.getElementById("gas-title");
var gasData = document.getElementById("gas-data");
var electricTitle = document.getElementById("electric-title");
var electricData = document.getElementById("electric-data");

//Get the dropdown references
var comparisonDropdown = document.getElementById("comparison-dropdown");
var comparisonDropdownDiv = document.getElementById("comparison-dropdown-div");

//Get the vehicle image/title references
var vehicleTitle = document.getElementById("vehicle-title");
var vehicleImage = document.getElementById("vehicle-image");

//Get the buttons, data table, and print button references
var printComparingText = document.getElementById("print-comparing-text");
var buttonGroup = document.getElementById("button-group");
var dataTable = document.getElementById("data-table");


var xhr = getVehicleData()

function getVehicleData() {
   var url = "https://firebasestorage.googleapis.com/v0/b/phev-calculator.appspot.com/o/vehicle-data%2Fvehicle-data.json?alt=media&token=471b21fe-3d11-4cc1-b1ac-a73a4296717d";

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         console.log(xhr.status);
         fillVehicleData(xhr);
      }
   };
   xhr.send();
   return xhr;
}

function shareSite() {
   if (navigator.share) {
      navigator.share({
        title: 'Plug-In Hybrid Calculator',
        text: 'I just compared the cost of driving my plug-in hybrid on gas and electricity! Check it out using this link!',
        url: 'https://phev-calculator.web.app'
      }).then(() => {
      })
      .catch(console.error);
    } else {
      // fallback
    }
  
}



function fillVehicleData(xhr) {
   if (comparisonDropdown.value == "cost") {
      var vehicleDataRaw = JSON.parse(xhr.responseText);
      console.log(vehicleDataRaw);
      console.log(vehicleDataRaw[vehicle]);
      vehicleImage.src = "/img/vehicles/" + vehicleDataRaw[vehicle]["id"] + ".png";

      gasTitle.innerHTML = "Cost to drive <b>" + vehicleDataRaw[vehicle]["mpg-gas"] + "</b> miles on gas:";
      electricTitle.innerHTML = "Cost to drive <b>" + vehicleDataRaw[vehicle]["mpg-gas"] + "</b> miles on electricity:";
      gasData.innerText = "$" + gasPrice;

      var mileageChange = vehicleDataRaw[vehicle]["range"] / vehicleDataRaw[vehicle]["mpg-gas"];
      var totalKwh = vehicleDataRaw[vehicle]['kwh'] / mileageChange;
      var totalElectricityCost = totalKwh * electricityPrice
      var totalElectricityCostRounded = totalElectricityCost.toFixed(2);


      electricData.innerText = "$" + totalElectricityCostRounded;

      printComparingText.innerText = "cost";

      vehicleImage.onload = function () {
         showData();
      }
   } else if (comparisonDropdown.value == "distance") {
      var vehicleDataRaw = JSON.parse(xhr.responseText);
      console.log(vehicleDataRaw);
      console.log(vehicleDataRaw[vehicle]);
      vehicleImage.src = "/img/vehicles/" + vehicleDataRaw[vehicle]["id"] + ".png";


      gasTitle.innerHTML = "Distance you can drive on <b>$" + gasPrice + "</b> worth of gas:";
      electricTitle.innerHTML = "Distance you can drive on <b>$" + gasPrice + "</b> worth of electricity:";
      gasData.innerText = vehicleDataRaw[vehicle]["mpg-gas"] + " miles";

      printComparingText.innerText = "distance";

      var priceChange = gasPrice / electricityPrice;
      var kwhChange = priceChange / vehicleDataRaw[vehicle]["kwh"];
      var finalMileage = kwhChange * vehicleDataRaw[vehicle]["range"];
      var roundedMileage = finalMileage.toFixed(1);



      electricData.innerText = roundedMileage + " miles";

      vehicleImage.onload = function () {
         showData();
      }
   }

}

function showData() {
   spinner.style.display = "none";
   vehicleImage.style.display = "block";
   vehicleTitle.style.display = "block";
   comparisonDropdownDiv.style.display = "block";
   buttonGroup.classList.remove("myhidden");
   dataTable.classList.remove("myhidden");
}




// if(vehicle == null || vehicle == ""){
//     window.location.replace("/index.html");
// }

var selectedVehicleText = document.getElementById("vehicle-title");
selectedVehicleText.innerText = vehicle;



if ("serviceWorker" in navigator) {
   window.addEventListener("load", function() {
     navigator.serviceWorker
       .register("/service-worker.js")
       .then(res => console.log("service worker registered"))
       .catch(err => console.log("service worker not registered", err))
   })
 }