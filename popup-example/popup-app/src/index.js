// initializing the Glue42 library
Glue().then(glue => {     
    window.glue = glue;

    // reference to the window which will be used as a popup
    const popup = glue.windows.find("popup");
    
    //reference to the button which will trigger the popup when clicked
    const button = document.getElementsByClassName("button")[0];

    // reference to this window
    const myWindow = glue.windows.my();

    // bounds of the area around which the popup will appear (top, bottom, left or right)
    const buttonBounds = { 
        left: Math.round(button.getBoundingClientRect().left),
        top: Math.round(button.getBoundingClientRect().top),
        width: Math.round(button.getBoundingClientRect().width),
        height: Math.round(button.getBoundingClientRect().height) 
    };

    button.addEventListener("click", activatePopup);

    // function that will activate the popup when the button is clicked
    function activatePopup() {
        myWindow.showPopup(
            {
                windowId: popup.id, // ID of the popup window
                targetBounds: buttonBounds, // bounds of the area which will trigger the popup when the user clicks inside it
                size: {      // popup window size
                    width: 250,
                    height: 50
                },
                targetLocation: "top", // where (relative to targetBounds) the popup will appear
                verticalOffset: 150 // offset from the popup area
            }
        );

        console.log(`Popup activated at ${new Date().toLocaleTimeString()}.`);
    }  
});