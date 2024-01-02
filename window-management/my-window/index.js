const buttons = {
    resize: undefined,
    move: undefined,
    setTitle: undefined,
    place: undefined,
    zoomIn: undefined,
    zoomOut: undefined,
    resetZoom: undefined,
    tabHeader: undefined,
    getTabIDs: undefined,
    attachTab: undefined,
    detachTab: undefined,
};

const inputs = {
    resize: {
        width: undefined,
        height: undefined,
    },
    move: {
        top: undefined,
        left: undefined
    },
    title: undefined,
    place: {
        vertical: undefined,
        horizontal: undefined
    },
    tabID: undefined
};

// Button event handlers.
const handlers = {
    resizeWindow,
    moveWindow,
    setWindowTitle,
    placeWindow,
    zoomIn,
    zoomOut,
    resetZoom,
    setTabHeaderVisibility,
    getTabIDs,
    attachTabToWindow,
    detachTabFromWindow
};

let tabIDsContainer;
let invalidInputAlert;
let alertText;
let dismissBtn;

// Reference to the current window.
let myWindow;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    // Reference to this window.
    myWindow = io.windows.my();

    attachEventHandlers();
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

/** EVENT HANDLERS **/
function resizeWindow() {
    const width = Number(inputs.resize.width.value);
    const height = Number(inputs.resize.height.value);
    const isValidWidth = !Number.isNaN(width) && width > 0;
    const isValidHeight = !Number.isNaN(height) && height > 0;

    if (!isValidWidth || !isValidHeight) {
        const message = "You must enter a valid number!";

        showAlert(message);
    } else {
        // Resizing the current window.
        myWindow.resizeTo(width, height);

        inputs.resize.width.value = "";
        inputs.resize.height.value = "";
    };
};

function moveWindow() {
    if (inputs.move.top.value === "" || inputs.move.left.value === "") {
        const message = "You must enter a valid number!";

        showAlert(message);
        return;
    };

    const top = Number(inputs.move.top.value);
    const left = Number(inputs.move.left.value);
    const isValidTop = !Number.isNaN(top);
    const isValidLeft = !Number.isNaN(left);

    if (!isValidTop || !isValidLeft) {
        const message = "You must enter a valid number!";

        showAlert(message);
    } else {
        // Moving the current window.
        myWindow.moveTo(top, left);

        inputs.move.top.value = "";
        inputs.move.left.value = "";
    };
};

function setWindowTitle() {
    const title = inputs.title.value;

    if (title !== "") {
        // Changing the title of the current window.
        myWindow.setTitle(title);

        inputs.title.value = "";
    } else {
        const message = "You must enter a title first!";

        showAlert(message);
    };
};

async function placeWindow() {
    const verticalAlignment = inputs.place.vertical.value;
    const horizontalAlignment = inputs.place.horizontal.value;
    // The `snapped` property is required.
    const placementSetings = { snapped: true, verticalAlignment, horizontalAlignment };

    // Place the window at the specified location.
    await myWindow.place(placementSetings).catch(() => {
        const message = `The combination of vertical alignment "${verticalAlignment}" and horizontal alignment "${horizontalAlignment}" currently isn't supported!`;

        showAlert(message);
    });
};

function zoomIn() {
    // Zoom in the current window.
    myWindow.zoomIn();
};

function zoomOut() {
    // Zoom out the current window.
    myWindow.zoomOut();
};

function resetZoom() {
    // Change the zoom factor of the current window to a specific value.
    myWindow.setZoomFactor(100);
};

function setTabHeaderVisibility() {
    // Check whether the tab header is visible.
    if (myWindow.isTabHeaderVisible) {
        // Toggle the tab header visibility of the current window.
        myWindow.setTabHeaderVisible(false);
    } else {
        myWindow.setTabHeaderVisible(true);
    };
};

function getTabIDs() {
    // Get all io.Connect Windows.
    const tabIDs = io.windows.list()
        .reduce(extractTabIDs, []);

    if (tabIDs.length > 0) {
        const formattedOutput = tabIDs.join(", ");
        tabIDsContainer.innerText = formattedOutput;
    } else {
        const message = "No tab windows have been opened yet!";

        showAlert(message);
    };
};

function extractTabIDs(tabIDs, window) {
    const windowID = window.id;
    // Filter all tab windows excluding the current window.
    const isTargetedID = window.mode === "tab" && windowID !== myWindow.id;

    if (isTargetedID) {
        tabIDs.push(windowID);
    };

    return tabIDs;
};

function attachTabToWindow() {
    const tabID = inputs.tabID.value;

    if (tabID !== "") {
        // Find a io.Connect Window by ID.
        const tab = io.windows.findById(tabID);

        if (!tab) {
            const message = `A tab with ID "${tabID}" doesn't exist!`;

            showAlert(message);
            return;
        };

        // Check whether this tab is already in the tab group of the current window.
        const isTabAttached = myWindow.tabs.includes(tab);

        if (isTabAttached) {
            const message = `The tab with ID "${tabID}" is already attached to this window!`;

            showAlert(message);
            return;
        };

        // Attach a tab to the current window.
        myWindow.attachTab(tab)
            .catch(() => {
                const message = `Error attaching tab with ID "${tabID}"!`;
                showAlert(message);
            });

    } else {
        const message = "You must enter a tab ID first!";

        showAlert(message);
    };
};

function detachTabFromWindow() {
    const tabID = inputs.tabID.value;

    if (tabID !== "") {
        // Find a window by ID.
        const tab = io.windows.findById(tabID);

        if (!tab) {
            const message = `A tab with ID "${tabID}" doesn't exist!`;
            showAlert(message);
            return;
        };

        // Check whether this tab is in the tab group of the current window.
        const isTabAttached = myWindow.tabs.includes(tab);

        if (!isTabAttached) {
            const message = "The tab isn't in the tab group of this window!";

            showAlert(message);
            return;
        };

        // Optional settings for the detached tab.
        const detachOptions = {
            bounds: {
                width: 400,
                height: 400,
                top: 300,
                left: 300
            }
        };

        // Detach the tab from the tab group.
        tab.detachTab(detachOptions)
            .catch(() => {
                const message = `Error detaching tab with ID "${tabID}"!`;

                showAlert(message);
            });
    } else {
        const message = "You must enter a tab ID first!";

        showAlert(message);
    };
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    // Buttons.
    buttons.resize = document.getElementById("resize-button");
    buttons.move = document.getElementById("move-button");
    buttons.setTitle = document.getElementById("set-title-button");
    buttons.place = document.getElementById("place-window-button");
    buttons.zoomIn = document.getElementById("zoom-in-button");
    buttons.zoomOut = document.getElementById("zoom-out-button");
    buttons.resetZoom = document.getElementById("reset-zoom-button");
    buttons.tabHeader = document.getElementById("tab-header-button");
    buttons.getTabIDs = document.getElementById("get-ids-button");
    buttons.attachTab = document.getElementById("attach-button");
    buttons.detachTab = document.getElementById("detach-button");

    // Inputs.
    inputs.resize.width = document.getElementById("resize-width");
    inputs.resize.height = document.getElementById("resize-height");
    inputs.move.top = document.getElementById("move-top");
    inputs.move.left = document.getElementById("move-left");
    inputs.title = document.getElementById("set-title");
    inputs.place.vertical = document.getElementById("place-vertical");
    inputs.place.horizontal = document.getElementById("place-horizontal");
    inputs.tabID = document.getElementById("tab-id");

    // Other.
    tabIDsContainer = document.getElementById("tab-ids");
    invalidInputAlert = document.getElementById("alert");
    alertText = document.getElementById("alert-text");
    dismissBtn = document.getElementById("dismiss-button");
};

function attachEventHandlers() {
    buttons.resize.addEventListener("click", handlers.resizeWindow);
    buttons.move.addEventListener("click", handlers.moveWindow);
    buttons.setTitle.addEventListener("click", handlers.setWindowTitle);
    buttons.place.addEventListener("click", handlers.placeWindow);
    buttons.zoomIn.addEventListener("click", handlers.zoomIn);
    buttons.zoomOut.addEventListener("click", handlers.zoomOut);
    buttons.resetZoom.addEventListener("click", handlers.resetZoom);
    buttons.tabHeader.addEventListener("click", handlers.setTabHeaderVisibility);
    buttons.getTabIDs.addEventListener("click", handlers.getTabIDs);
    buttons.attachTab.addEventListener("click", handlers.attachTabToWindow);
    buttons.detachTab.addEventListener("click", handlers.detachTabFromWindow);

    dismissBtn.addEventListener("click", hideAlert);
};

function showAlert(message) {
    alertText.innerText = message;
    invalidInputAlert.classList.remove("d-none");
};

function hideAlert() {
    invalidInputAlert.classList.add("d-none");
};