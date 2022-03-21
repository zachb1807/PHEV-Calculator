const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vehicle = urlParams.get('vehicle')
const gasPrice = urlParams.get('gas-price');
const electricityPrice = urlParams.get('electricity-price');

localStorage.setItem("recent", queryString);

var spinner = document.getElementById("spinner");

var gasTitle = document.getElementById("gas-title");
var gasData = document.getElementById("gas-data");
var electricTitle = document.getElementById("electric-title");
var electricData = document.getElementById("electric-data");

var comparisonDropdown = document.getElementById("comparison-dropdown");
var comparisonDropdownDiv = document.getElementById("comparison-dropdown-div");

var vehicleTitle = document.getElementById("vehicle-title");
var vehicleImage = document.getElementById("vehicle-image");

var printComparingText = document.getElementById("print-comparing-text");
var buttonGroup = document.getElementById("button-group");
var dataTable = document.getElementById("data-table");


console.log(vehicle);

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



function fillVehicleData(xhr) {
   if (comparisonDropdown.value == "cost") {
      var vehicleDataRaw = JSON.parse(xhr.responseText);
      console.log(vehicleDataRaw);
      console.log(vehicleDataRaw[vehicle]);
      vehicleImage.src = "/img/vehicles/" + vehicleDataRaw[vehicle]["id"] + ".jpg";

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
      vehicleImage.src = "/img/vehicles/" + vehicleDataRaw[vehicle]["id"] + ".jpg";


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