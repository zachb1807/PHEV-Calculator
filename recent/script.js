var body = document.getElementById("body");

if(localStorage.getItem("recent") == null || localStorage.getItem("recent") == "") {
    body.classList.remove("hidden");
}   

else {
    location.replace("/summary/" + localStorage.getItem("recent"));
}