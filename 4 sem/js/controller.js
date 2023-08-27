"use strict"

function printForm(e){
  
    let question = document.getElementById("textBox").value;

    clearPrintBlock();

    let block = document.getElementById("pic");

    let textElement = document.createElement("p");

    dismissButton.style.display = "block";

    const regexp = /[?]/g;
    if (question.match(regexp)){
        getResponse(block, textElement)
        .then(block.appendChild(dismissButton));
    }else{
        getResponse(block, textElement, "maybe")
        .then(block.appendChild(dismissButton));
    }

}

function clearPrintBlock(e){
     
    let pb = document.getElementById("pic");

    while (pb.firstChild){
        pb.removeChild(pb.firstChild);
    }

    dismissButton.style.display = "none";

}

function clearTextBox(e){

    let tb = document.getElementById("textBox");

    tb.value = "";
}

async function getResponse(block ,textElement, forced = false){
    let url = "https://yesno.wtf/api?";
    
    if (forced){
        url += new URLSearchParams({ force: forced}).toString();
    }

    console.log(url);

    let x = 640, y = 480;

    return fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        textElement.textContent = translate(json.answer);
        const pic = new Image(x, y);
        pic.src = json.image;
        block.appendChild(textElement);
        block.appendChild(pic);
    })
}

function translate(answer){
    if (answer == "yes") return "да"
    if (answer == "no") return "нет"
    return "?"
}

let printButton = document.getElementById("answer");
printButton.addEventListener("click", printForm);

let clearTextBoxButton = document.getElementById("clear");
clearTextBoxButton.addEventListener("click", clearTextBox);

let dismissButton = document.getElementById("dismiss");
dismissButton.addEventListener("click", clearPrintBlock);
dismissButton.style.display = "none";