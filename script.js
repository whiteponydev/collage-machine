// Create variables to target elements on the page
const userInput = document.querySelector("#userInput");
const container = document.querySelector(".container");
const infoText = document.getElementById("info-text");

// Do something when the user uploads images

userInput.addEventListener("change", () => {
    // Once the user uploads images we will iterate through them and create a new file reader
    // It's important that every image gets a new reader or code won't work
    for(let i = 0; i < userInput.files.length; i++) {

        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            localStorage.setItem(i, reader.result);
            userInput.remove();
            infoText.remove();
        });
        
        // The reader has to read the file as a data url and then once the item has loaded it will be added
        reader.readAsDataURL(userInput.files[i]);
    }

    // Then when all the images are set in localstorage the user can click on the page to insert images randomly

    container.addEventListener("click", (e) => {
        const randomNumber = Math.floor(Math.random() * userInput.files.length);
        const newImage = document.createElement("img");
        newImage.src = localStorage.getItem(randomNumber);
        container.appendChild(newImage);
        const x = e.clientX;
        const y = e.clientY;
        newImage.style.position = "absolute";
        newImage.style.left = x - newImage.offsetWidth / 2 + "px";
        newImage.style.top = y - newImage.offsetHeight / 2 + "px"; 
    });
});

// This part of the code clears localstorage when the user closes the window    

window.onunload = function(){
    localStorage.clear();
};
