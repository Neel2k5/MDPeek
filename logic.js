const  clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");
const inputTextArea = document.getElementById("i-ta");
const previewDiv = document.getElementById("o-pr");

function resizeInput(){
    inputTextArea.style.height="auto";
    inputTextArea.style.height=`${inputTextArea.scrollHeight}px`;
}

function parseMD(){
    const result = marked.parse(inputTextArea.value);
    previewDiv.innerHTML=result;
    resizeInput();
}

function downloadMD(){
    const data = inputTextArea.value;
    if(data == "")return;
    const dataBlob = new Blob([data],{type:"text/markdown"});
    const dataURL =URL.createObjectURL(dataBlob);
    const installationURL = document.createElement("a");
    installationURL.href = dataURL;
    installationURL.download="file.md";
    document.body.appendChild(installationURL);
    installationURL.click();
    document.body.removeChild(installationURL); 
    URL.revokeObjectURL(dataURL); 
}

//Initial default text
parseMD();
resizeInput();




// events
inputTextArea.addEventListener(
    "input",
    parseMD
);

clearButton.addEventListener(
    "click",
    ()=>{
        const userConfirmed = confirm("Are you sure you want to clear the markdown?");
        if(userConfirmed)
        inputTextArea.value="";
        previewDiv.innerHTML = "";
        resizeInput();
    }
);
saveButton.addEventListener(
    "click",
    downloadMD
);