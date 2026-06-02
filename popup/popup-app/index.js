/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

// Reference to the button which will trigger the popup when clicked.
const button = document.getElementById("button");

async function initializeApp() {
    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    // Reference to the window which will be used as a popup.
    const popup = io.windows.find("popup-window");

    // Reference to this window.
    const myWindow = io.windows.my();

    button.addEventListener("click", () => {
        activatePopup(popup, myWindow);
    });
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

function getButtonBounds() {
    // Bounds of the area around which the popup will appear.
    const buttonBounds = {
        left: Math.round(button.getBoundingClientRect().left),
        top: Math.round(button.getBoundingClientRect().top),
        width: Math.round(button.getBoundingClientRect().width),
        height: Math.round(button.getBoundingClientRect().height)
    };

    console.log("Button bounds:", buttonBounds);

    return buttonBounds;
};

/** SHOWING THE POPUP WINDOW **/
async function activatePopup(popup, myWindow) {
    // Popup options.
    const popupOptions = {
        windowId: popup.id,
        targetBounds: getButtonBounds(),
        size: {
            width: 250,
            height: 50
        },
        targetLocation: "top",
        verticalOffset: 200
    };

    // Activate the popup.
    await myWindow.showPopup(popupOptions);
    console.log(`Popup activated at ${new Date().toLocaleTimeString()}.`);
};