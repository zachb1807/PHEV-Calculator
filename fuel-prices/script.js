//Get the input data from previous page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vehicle = urlParams.get('vehicle')
console.log(vehicle);

// if(vehicle == null || vehicle == ""){
//     window.location.replace("/index.html");
// }

//Display chosen vehicle and pass it to the next page
document.getElementById("selected-vehicle").innerHTML = vehicle;
document.getElementById("vehicle").value = vehicle;

//Set source to preset
document.getElementById("source").value = "preset";

//Initialize the input fields
var gasPrice = document.getElementById("gas-price");
var electricPrice = document.getElementById("electric-price");

function validate() {
    if (gasPrice.value == "" || gasPrice.value == null) {
        gasPrice.classList.add("is-danger");
        gasPrice.classList.remove("is-link");
    }
    if (electricPrice.value == "" || electricPrice.value == null) {
        electricPrice.classList.add("is-danger");
        electricPrice.classList.remove("is-link");
    }
}

function normalGas() {
    gasPrice.classList.add("is-link");
    gasPrice.classList.remove("is-danger");
}


function normalElectric() {
    electricPrice.classList.add("is-link");
    electricPrice.classList.remove("is-danger");
}


function decimalGas() {
    if (gasPrice.value == "") {
        gasPrice.value = null
    }
    else if ((gasPrice.value.indexOf(".") !== -1)) {
        var decimalLocation = gasPrice.value.indexOf(".");
        var decimalLength = gasPrice.value.length - decimalLocation;
        if (decimalLocation == 0) {
            gasPrice.value = "0" + gasPrice.value;
        }
        if (decimalLength > 3) {
            gasPrice.value = gasPrice.value.substr(0, decimalLocation + 3);
        }
        if (decimalLength < 3) {
            gasPrice.value = gasPrice.value + "0";
        }
    } else {
        if (gasPrice.value.length > 2) {
            var onesPlace = gasPrice.value.slice(0, gasPrice.value.length - 2);
            var decimalPlace = gasPrice.value.slice(gasPrice.value.length - 2, gasPrice.value.length);
            gasPrice.value = onesPlace + "." + decimalPlace;
        }
        if (gasPrice.value.length < 3) {
            gasPrice.value = gasPrice.value + `.00`;
        }
    }
    while (gasPrice.value.charAt(0) == "0" && gasPrice.value.charAt(1) != ".") {
        gasPrice.value = gasPrice.value.substring(1, gasPrice.value.length);
    }
}

function decimalElectric() {
    if (electricPrice.value == "") {
        electricPrice.value = null
    }
    else if (!electricPrice.value.includes(".")) {
        electricPrice.value = electricPrice.value.substring(0, electricPrice.value.length - 2) + "." + electricPrice.value.substring(electricPrice.value.length - 2, electricPrice.value.length);
        if(electricPrice.value.indexOf(".") == 0){
            electricPrice.value = "0" + electricPrice.value;
        }
        if(electricPrice.value.indexOf(".") == electricPrice.value.length - 2){
            electricPrice.value = electricPrice.value.substring(0, electricPrice.value.indexOf(".") + 1) + "0" + electricPrice.value.substring(electricPrice.value.indexOf(".") + 1, electricPrice.value.length);
        }
    }
    else if (electricPrice.value.includes(".")) {
        var decimalLocation = electricPrice.value.indexOf(".");
        var decimalLength = electricPrice.value.length - decimalLocation;
        if (decimalLocation == 0) {
            electricPrice.value = "0" + electricPrice.value;
        }
        if (decimalLength > 3) {
            electricPrice.value = electricPrice.value.substr(0, decimalLocation + 3);
        }
        if (decimalLength < 3) {
            electricPrice.value = electricPrice.value + "0";
        }
    }

    while (electricPrice.value.charAt(0) == "0" && electricPrice.value.charAt(1) != ".") {
        electricPrice.value = electricPrice.value.substring(1, electricPrice.value.length);
    }
}


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }