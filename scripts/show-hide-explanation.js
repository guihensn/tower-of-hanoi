let explanation = document.querySelector(".explanation");
let buttonOpenExplanation = document.querySelector("#explanation-button");

function showExplanation(){
    explanation.style = "display: flex";
    buttonOpenExplanation.style = "display: none"
}


function hideExplanation(){
    explanation.style = "display: none";
    buttonOpenExplanation.style = "display: block"
}

