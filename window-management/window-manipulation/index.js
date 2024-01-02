const buttons = {
    open: undefined,
    getWindowIDs: undefined,
    select: undefined,
    resize: undefined,
    move: undefined,
    setTitle: undefined,
    place: undefined,
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
    place: {
        vertical: undefined,
        horizontal: undefined
    }
};

// Button event handlers.
const handlers = {
    openWindow,
    getWindowIDs,
    selectWindow,
    resizeWindow,
    moveWindow,
    setWindowTitle,
    placeWindow,
    maximizeWindow,
    minimizeWindow,
    restoreWindow,
    setTabHeaderVisibility,
    clearLogs,
    selectWindowMode
};

// Handlers for io.Connect Window events.
const IOConnectEventHandlers = {
    windowAdded,
    windowRemoved
};

const alertState = {
    success: "alert-success",
    error: "alert-danger"
};

let radioButtons;
let selectedWindowMode;
let windowIDsContainer;
let logContainer;
let inputAlert;
let dismissBtn;

// Reference to the window selected by the user for control.
let selectedWindow;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);
    attachEventHandlers();
    handleIOConnectWindowEvents();
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    const config = { appManager: "full" };

    window.io = await IODesktop(config);
};

/** EVENT HANDLERS **/
async function openWindow() {
    const name = inputs.window.name.value;
    const URL = inputs.window.URL.value;

    // Window name and URL are required. URL must start with "http://" or "https://"
    if (name === "") {
        const message = "You must enter a window name!";

        showAlert(message, alertState.error);
        return;
    } else if (!URL.startsWith("https://") && !URL.startsWith("http://")) {
        const message = "Invalid URL!";

        showAlert(message, alertState.error);
        return;
    };

    // Get the value for the window mode.
    const windowMode = [...radioButtons].find(button => button.checked === true).value;

    // Optional settings for the new window.
    const windowOptions = {
        top: parseInt(inputs.window.top.value) || 0,
        left: parseInt(inputs.window.left.value) || 0,
        width: parseInt(inputs.window.width.value) || 200,
        height: parseInt(inputs.window.height.value) || 200,
        mode: windowMode
    };

    // Opening a new window.
    await io.windows.open(name, URL, windowOptions)
        .catch(() => {
            // Handles only the case where a window with the specified name has already been opened.
            const message = `A window with name "${name}" already exists!`;

            showAlert(message, alertState.error);
        });
};

function getWindowIDs() {
    // Get all io.Connect Windows.
    const windowIDs = io.windows.list()
        .reduce(extractWindowIDs, []);

    if (windowIDs.length > 0) {
        const formattedOutput = windowIDs.join(", ");
        windowIDsContainer.innerText = formattedOutput;
    } else {
        const message = "No windows have been opened yet!";

        showAlert(message, alertState.error);
    };
};

function extractWindowIDs(windowIDs, window) {
    const windowID = window.id;

    // Get the current window.
    const currentWindowID = io.windows.my().id;

    // Exclude the IDs of the current window and the embedded shell app.
    const isTargetedID = window.isVisible && windowID !== currentWindowID && !window.application.isShell;

    if (isTargetedID) {
        windowIDs.push(windowID);
    };

    return windowIDs;
};

function selectWindow() {
    const windowID = inputs.windowID.value;

    if (windowID === "") {
        const message = "You must enter a window ID first!";

        showAlert(message, alertState.error);
        return;
    };

    // Finding a io.Connect Window by its ID.
    selectedWindow = io.windows.findById(windowID);

    if (selectedWindow) {
        const message = "Window selected successfully! You can now control the selected window."

        showAlert(message, alertState.success);

        inputs.windowID.value = "";
    } else {
        const message = `A window with ID "${windowID}" doesn't exist!`;

        showAlert(message, alertState.error);
    };
};

function resizeWindow() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        const width = Number(inputs.resize.width.value);
        const height = Number(inputs.resize.height.value);
        const isValidWidth = !Number.isNaN(width) && width > 0;
        const isValidHeight = !Number.isNaN(height) && height > 0;

        if (!isValidWidth || !isValidHeight) {
            const message = "You must enter a valid number!";

            showAlert(message, alertState.error);
        } else {
            // Resizing the selected window.
            selectedWindow.resizeTo(width, height);

            inputs.resize.width.value = "";
            inputs.resize.height.value = "";
        };
    };
};

function moveWindow() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        if (inputs.move.top.value === "" || inputs.move.left.value === "") {
            const message = "You must enter a valid number!";

            showAlert(message, alertState.error);
            return;
        };

        const top = Number(inputs.move.top.value);
        const left = Number(inputs.move.left.value);
        const isValidTop = !Number.isNaN(top);
        const isValidLeft = !Number.isNaN(left);

        if (!isValidTop || !isValidLeft) {
            const message = "You must enter a valid number!";

            showAlert(message, alertState.error);
        } else {
            // Moving the selected window.
            selectedWindow.moveTo(top, left);

            inputs.move.top.value = "";
            inputs.move.left.value = "";
        };
    };
};

function setWindowTitle() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        const title = inputs.title.value;

        if (title !== "") {

            // Changing the title of the selected window.
            selectedWindow.setTitle(title);

            inputs.title.value = "";
        } else {
            const message = "You must enter a title first!";

            showAlert(message, alertState.error);
        };
    };
};

async function placeWindow() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        const verticalAlignment = inputs.place.vertical.value;
        const horizontalAlignment = inputs.place.horizontal.value;
        // The `snapped` property is required.
        const placementSetings = { snapped: true, verticalAlignment, horizontalAlignment };

        // Place the window at the specified location.
        await selectedWindow.place(placementSetings).catch(() => {
            const message = `The combination of vertical alignment "${verticalAlignment}" and horizontal alignment "${horizontalAlignment}" currently isn't supported!`;

            showAlert(message, alertState.error);
        });
    };
};

function maximizeWindow() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        // Maximizing the selected window.
        selectedWindow.maximize();
    };
};

function minimizeWindow() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        // Minimizing the selected window.
        selectedWindow.minimize();
    };
};

function restoreWindow() {
    const windowHasBeenSelected = checkForSelectedWindow();

    if (windowHasBeenSelected) {
        // Restoring the selected window.
        selectedWindow.restore();
    };
};

function setTabHeaderVisibility() {
    const windowHasBeenSelected = checkForSelectedWindow();
    // Check whether the selected window is a tab window.
    const windowIsTab = selectedWindow.mode === "tab";

    if (windowHasBeenSelected) {
        if (!windowIsTab) {
            const message = "Can't manipulate the tab header. The selected window isn't a tab window!";

            showAlert(message, alertState.error);
            return;
        };

        // Check whether the tab header is visible.
        if (selectedWindow.isTabHeaderVisible) {
            // Toggle the tab header visibility of the selected window.
            selectedWindow.setTabHeaderVisible(false);
        } else {
            selectedWindow.setTabHeaderVisible(true);
        };
    };
};

/** io.Connect WINDOW EVENTS **/
function handleIOConnectWindowEvents() {
    // Listen for window added events which fire when a new io.Connect Window has been created.
    io.windows.onWindowAdded(IOConnectEventHandlers.windowAdded);
    // Listen for window removed events which fire when a io.Connect Window has been closed.
    io.windows.onWindowRemoved(IOConnectEventHandlers.windowRemoved);
};

function windowAdded(window) {
    const windowName = window.name;
    const windowID = window.id;
    const windowMode = window.mode;
    const event = "Window Added. "
    const details = `Name: "${windowName}", Mode: "${windowMode}", ID: "${windowID}".`;
    const logElement = document.createElement("p");
    const eventElement = document.createElement("span");
    const detailsElement = document.createElement("span");

    eventElement.style.color = "green";
    eventElement.innerText = event;
    detailsElement.innerText = details;
    logElement.append(eventElement, detailsElement);
    logContainer.prepend(logElement);
};

function windowRemoved(window) {
    const windowName = window.name;
    const windowID = window.id;
    const windowMode = window.mode;
    const event = "Window Removed. "
    const details = `Name: "${windowName}", Mode: "${windowMode}", ID: "${windowID}".`;
    const logElement = document.createElement("p");
    const eventElement = document.createElement("span");
    const detailsElement = document.createElement("span");

    eventElement.style.color = "red";
    eventElement.innerText = event;
    detailsElement.innerText = details;
    logElement.append(eventElement, detailsElement);
    logContainer.prepend(logElement);

    if (selectedWindow && selectedWindow.id === windowID) {
        selectedWindow = undefined;
    };
};

/** HELPERS **/
function checkForSelectedWindow() {
    if (selectedWindow) {
        return true;
    } else {
        const message = "You must select a window first!";

        showAlert(message, alertState.error);

        return false;
    };
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    // Buttons.
    buttons.open = document.getElementById("open-button");
    buttons.getWindowIDs = document.getElementById("get-ids-button");
    buttons.select = document.getElementById("select-button");
    buttons.resize = document.getElementById("resize-button");
    buttons.move = document.getElementById("move-button");
    buttons.setTitle = document.getElementById("set-title-button");
    buttons.place = document.getElementById("place-window-button");
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
    inputs.place.vertical = document.getElementById("place-vertical");
    inputs.place.horizontal = document.getElementById("place-horizontal");

    // Other.
    radioButtons = [...document.querySelectorAll("label[name='window-mode']")].map(e => e.previousElementSibling);
    windowIDsContainer = document.getElementById("window-ids");
    logContainer = document.getElementById("event-log");
    inputAlert = document.getElementById("alert");
    dismissBtn = document.getElementById("dismiss-button");
};

function attachEventHandlers() {
    buttons.open.addEventListener("click", handlers.openWindow);
    buttons.getWindowIDs.addEventListener("click", handlers.getWindowIDs);
    buttons.select.addEventListener("click", handlers.selectWindow);
    buttons.resize.addEventListener("click", handlers.resizeWindow);
    buttons.move.addEventListener("click", handlers.moveWindow);
    buttons.setTitle.addEventListener("click", handlers.setWindowTitle);
    buttons.place.addEventListener("click", handlers.placeWindow);
    buttons.maximize.addEventListener("click", handlers.maximizeWindow);
    buttons.minimize.addEventListener("click", handlers.minimizeWindow);
    buttons.restore.addEventListener("click", handlers.restoreWindow);
    buttons.tabHeader.addEventListener("click", handlers.setTabHeaderVisibility);
    buttons.clear.addEventListener("click", handlers.clearLogs);

    radioButtons.forEach(button => button.nextElementSibling.addEventListener("click", handlers.selectWindowMode));
    dismissBtn.addEventListener("click", hideAlert);
};

// Selecting and deselecting radio buttons when choosing a window mode.
function selectWindowMode(event) {
    const selectedButton = event.target.previousElementSibling;

    selectedWindowMode = selectedButton.value;

    radioButtons.forEach(button => button.checked = false);

    selectedButton.checked = true;
};

function showAlert(message, state) {
    const classToRemove = state === alertState.success ? alertState.error : state;

    inputAlert.classList.remove(classToRemove);
    inputAlert.classList.add(state);
    inputAlert.firstElementChild.innerText = message;
    inputAlert.classList.remove("d-none");
};

function hideAlert() {
    inputAlert.classList.add("d-none");
};

function clearLogs() {
    logContainer.innerText = "";
};