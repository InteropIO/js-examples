/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    // Reference to the window which will be used as a popup.
    const popup = io.windows.find("popup-window");
    if (!popup) {
        console.error("Popup window wasn't found. Make sure the popup-window app is registered and running.");
        return;
    }

    // Reference to the button which will trigger the popup when clicked.
    const button = document.getElementById("button");

    // Reference to this window.
    const myWindow = io.windows.my();

    button.addEventListener("click", () => {
        activatePopup(popup, myWindow, button);
    });
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

function getButtonBounds(button) {
    // Bounds of the area around which the popup will appear.
    const buttonBounds = {
        left: Math.round(button.getBoundingClientRect().left),
        top: Math.round(button.getBoundingClientRect().top),
        width: Math.round(button.getBoundingClientRect().width),
        height: Math.round(button.getBoundingClientRect().height)
    };

    return buttonBounds;
};

/** SHOWING THE POPUP WINDOW **/
async function activatePopup(popup, myWindow, button) {
    // Popup options.
    const popupOptions = {
        windowId: popup.id,
        targetBounds: getButtonBounds(button),
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