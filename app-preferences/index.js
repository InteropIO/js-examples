const buttons = {
    update: undefined,
    set: undefined,
    clear: undefined
};

let textContainer;
let selectFontSizeElement;
let selectTextColorElement;
let successAlert;
let noInputAlert;
let dismissBtn;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMELements();
    handleButtonClicks();
    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);

    await applyPreferences();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

async function applyPreferences() {
    const { data } = await glue.prefs.get();

    if (data) {
        const fontSize = data.fontSize;
        const textColor = data.textColor;

        textContainer.style.fontSize = `${fontSize}px` || null;
        textContainer.style.color = textColor || null;
    };
};

async function updatePreferences() {
    const preferences = getPreferencesData();
    console.log(preferences)
    if (preferences) {
        await glue.prefs.update(preferences);
        showSuccessAlert("updated");
    };
};

async function setPreferences() {
    const preferences = getPreferencesData();

    if (preferences) {
        await glue.prefs.set(preferences);
        showSuccessAlert("set");
    };
};

async function clearPreferences() {
    await glue.prefs.clear();
    showSuccessAlert("cleared");
};

/** DOM ELEMENT MANIPULATIONS */
function getDOMELements() {
    buttons.update = document.getElementById("update-button");
    buttons.set = document.getElementById("set-button");
    buttons.clear = document.getElementById("clear-button");

    textContainer = document.getElementById("text");
    selectFontSizeElement = document.getElementById("font-size");
    selectTextColorElement = document.getElementById("text-color");
    successAlert = document.getElementById("success-alert");
    noInputAlert = document.getElementById("no-input-alert");
    dismissBtn = document.getElementById("dismiss-button");
};

function handleButtonClicks() {
    buttons.update.addEventListener("click", updatePreferences);
    buttons.set.addEventListener("click", setPreferences);
    buttons.clear.addEventListener("click", clearPreferences);

    dismissBtn.addEventListener("click", hideNoInputAlert);
};

function getPreferencesData() {
    const preferences = {};
    const fontSize = selectFontSizeElement[selectFontSizeElement.selectedIndex].value;
    const textColor = selectTextColorElement[selectTextColorElement.selectedIndex].value;

    if (fontSize === "" && textColor === "") {
        showNoInputAlert();
        return;
    };

    if (fontSize) {
        preferences.fontSize = fontSize;
    };

    if (textColor) {
        preferences.textColor = textColor;
    };

    return preferences;
}

function showSuccessAlert(action) {
    hideNoInputAlert();

    const message = `Preferences successfully ${action}! Refresh or restart the app to apply them.`

    successAlert.innerText = message;
    successAlert.classList.remove("d-none");
};

function showNoInputAlert() {
    noInputAlert.classList.remove("d-none");
};

function hideNoInputAlert() {
    noInputAlert.classList.add("d-none");
};