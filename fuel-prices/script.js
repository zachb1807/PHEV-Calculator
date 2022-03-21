const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vehicle = urlParams.get('vehicle')
console.log(vehicle);

// if(vehicle == null || vehicle == ""){
//     window.location.replace("/index.html");
// }

var selectedVehicleText = document.getElementById("selected-vehicle");
var vehicleHiddenInput = document.getElementById("vehicle");
vehicleHiddenInput.value = vehicle;
selectedVehicleText.innerText = vehicle;
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


function decimal() {
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
}
