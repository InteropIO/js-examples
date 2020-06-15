const buttons = {
    open: undefined,
    getWindowIDs: undefined,
    select: undefined,
    resize: undefined,
    move: undefined,
    setTitle: undefined,
    setFrameColor: undefined,
    maximize: undefined,
    minimize: undefined,
    restore: undefined,
    tabHeader: undefined,
    clear: undefined
};

const inputs = {
    window: {
        name: undefined,
        URL: undefined,
        top: undefined,
        left: undefined,
        width: undefined,
        height: undefined,
        mode: undefined
    },
    windowID: undefined,
    resize: {
        width: undefined,
        height: undefined,
    },
    move: {
        top: undefined,
        left: undefined
    },
    title: undefined,
    frameColor: undefined
};

let radioButtons;
let selectedWindowMode;
let windowIDsContainer;
let logContainer;
let invalidInputAlert;

let selectedWindow;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    // Button handlers.
    const handlers = {
        openWindow: openWindow,
        getWindowIDs: getWindowIDs,
        selectWindow: selectWindow,
        resizeWindow: resizeWindow,
        moveWindow: moveWindow,
        setWindowTitle: setWindowTitle,
        setWindowFrameColor: setWindowFrameColor,
        maximizeWindow: maximizeWindow,
        minimizeWindow: minimizeWindow,
        restoreWindow: restoreWindow,
        setTabHeaderVisibility: setTabHeaderVisibility,
        clearLogs: clearLogs,
        selectWindowMode: selectWindowMode
    };

    attachEventHandlers(handlers);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

/** EVENT HANDLERS **/
function openWindow() {

};

function getWindowIDs() {
    // Get all Glue42 windows.
    const windowIDs = glue.windows.list()
        .reduce(extractWindowIDs, []);

    const formattedOutput = windowIDs.join(", ");
    windowIDsContainer.innerText = formattedOutput;
};

function extractWindowIDs(windowIDs, window) {
    // Filter all tab windows excluding the current window.
    if (window.isVisible && window.id !== selectedWindow.id) {
        windowIDs.push(window.id);
    };
    return windowIDs;
};

function selectWindow() {

};

function resizeWindow() {
    const width = inputs.resize.width.value;
    const height = inputs.resize.height.value;

    // Resizing the current window.
    selectedWindow.resizeTo(width, height);

    inputs.resize.width.value = "";
    inputs.resize.height.value = "";
};

function moveWindow() {
    const top = inputs.move.top.value;
    const left = inputs.move.left.value;

    // Moving the current window.
    selectedWindow.moveTo(top, left);

    inputs.move.top.value = "";
    inputs.move.left.value = "";
};

function setWindowTitle() {
    const title = inputs.title.value;

    if (title !== "") {

        // Changing the title of the current window.
        selectedWindow.setTitle(title);

        inputs.title.value = "";
    } else {
        const message = "You must enter a title first!";
        showAlert(message);
    };
};

function setWindowFrameColor() {
    const frameColor = inputs.frameColor.value;

    if(frameColor !== "") {

        // Changing the frame color of the current window.
        selectedWindow.setFrameColor(frameColor)
            .catch(() => {
                const message = `The value "${frameColor}" is not a valid color!`;
                showAlert(message);
                return;
            });

        inputs.frameColor.value = "";
    } else {
        const message = "You must enter a color name or color code first!"
        showAlert(message);
    }
};

function maximizeWindow() {

};

function minimizeWindow() {

};

function restoreWindow() {

};

function setTabHeaderVisibility() {
    // Check whether the tab header is visible.
    if (selectedWindow.isTabHeaderVisible) {
        // Toggle the tab header visibility of the current window.
        selectedWindow.setTabHeaderVisible(false);
    } else {
        selectedWindow.setTabHeaderVisible(true);
    };
};

function clearLogs() {
    logContainer.innerText = "";
};

function selectWindowMode(event) {
    const selectedButton = event.target.previousElementSibling;
    selectedWindowMode = selectedButton.value;

    radioButtons.forEach((element) => {
        const button = element.previousElementSibling;
        button.checked = false;
    });

    selectedButton.checked = true;
};

/** DOM Element Manipulations **/
function getDOMElements() {
    // Buttons.
    buttons.open = document.getElementById("open-button");
    buttons.getWindowIDs = document.getElementById("get-ids-button");
    buttons.select = document.getElementById("select-button");
    buttons.resize = document.getElementById("resize-button");
    buttons.move = document.getElementById("move-button");
    buttons.setTitle = document.getElementById("set-title-button");
    buttons.setFrameColor = document.getElementById("set-frame-color-button");
    buttons.maximize = document.getElementById("maximize-button");
    buttons.minimize = document.getElementById("minimize-button");
    buttons.restore = document.getElementById("restore-button");
    buttons.tabHeader = document.getElementById("tab-header-button");
    buttons.clear = document.getElementById("clear-button");

    // Inputs.
    inputs.window.name = document.getElementById("window-name");
    inputs.window.URL = document.getElementById("window-url");
    inputs.window.top = document.getElementById("window-top");
    inputs.window.left = document.getElementById("window-left");
    inputs.window.width = document.getElementById("window-width");
    inputs.window.height = document.getElementById("window-height");
    inputs.window.mode = document.getElementById("window-mode");
    inputs.windowID = document.getElementById("window-id");
    inputs.resize.width = document.getElementById("resize-width");
    inputs.resize.height = document.getElementById("resize-height");
    inputs.move.top = document.getElementById("move-top");
    inputs.move.left = document.getElementById("move-left");
    inputs.title = document.getElementById("set-title");
    inputs.frameColor = document.getElementById("set-frame-color");

    radioButtons = document.querySelectorAll("label[name='window-mode']");
    windowIDsContainer = document.getElementById("window-ids");
    logContainer = document.getElementById("event-log");
    invalidInputAlert = document.getElementById("alert");
};

function attachEventHandlers(handlers) {
    buttons.open.addEventListener("click", handlers.openWindow);
    buttons.getWindowIDs.addEventListener("click", handlers.getWindowIDs);
    buttons.select.addEventListener("click", handlers.selectWindow);
    buttons.resize.addEventListener("click", handlers.resizeWindow);
    buttons.move.addEventListener("click", handlers.moveWindow);
    buttons.setTitle.addEventListener("click", handlers.setWindowTitle);
    buttons.setFrameColor.addEventListener("click", handlers.setWindowFrameColor);
    buttons.maximize.addEventListener("click", handlers.maximizeWindow);
    buttons.minimize.addEventListener("click", handlers.minimizeWindow);
    buttons.restore.addEventListener("click", handlers.restoreWindow);
    buttons.tabHeader.addEventListener("click", handlers.setTabHeaderVisibility);
    buttons.clear.addEventListener("click", handlers.clearLogs);

    radioButtons.forEach(button => button.addEventListener("click", handlers.selectWindowMode));
    invalidInputAlert.addEventListener("click", hideAlert);
};

function showAlert(message) {
    invalidInputAlert.firstElementChild.innerText = message;
    invalidInputAlert.style.display = "block";
};

function hideAlert() {
    invalidInputAlert.style.display = "none";
}