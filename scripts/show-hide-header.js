let header = document.querySelector("header");
let buttonOpenHeader = document.querySelector("#menu-button");
let darkScreen = document.querySelector("#dark-screen");

function showHeader(){
    header.style = "display: flex";
    buttonOpenExplanation.style = "display: none"
    darkScreen.style = "display: block"
}


function hideHeader(){
    header.style = "display: none";
    buttonOpenExplanation.style = "display: block";
    darkScreen.style = "display: none"
}


