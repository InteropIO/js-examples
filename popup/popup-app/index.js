/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);

    // Reference to the window which will be used as a popup.
    const popup = glue.windows.find("popup-window");

    // Reference to the button which will trigger the popup when clicked.
    const button = document.getElementById("button");

    // Reference to this window.
    const myWindow = glue.windows.my();

    // Bounds of the area around which the popup will appear.
    const buttonBounds = {
        left: Math.round(button.getBoundingClientRect().left),
        top: Math.round(button.getBoundingClientRect().top),
        width: Math.round(button.getBoundingClientRect().width),
        height: Math.round(button.getBoundingClientRect().height)
    };

    button.addEventListener("click", () => { 
        activatePopup(popup, myWindow, buttonBounds);
    });
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

/** SHOWING THE POPUP WINDOW **/
async function activatePopup(popup, myWindow, buttonBounds) {
    // Popup options.
    const popupOptions = {
        windowId: popup.id,
        targetBounds: buttonBounds,
        size: {
            width: 250,
            height: 50
        },
        targetLocation: "top",
        verticalOffset: 150
    };

    // Activate the popup.
    await myWindow.showPopup(popupOptions);
    console.log(`Popup activated at ${new Date().toLocaleTimeString()}.`);
};