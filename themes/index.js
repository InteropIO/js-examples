let htmlElement;
let selectedThemeElement;
let themesListElement;
let clearBtn;
let logContainer;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Get the initially selected theme before the initialization of the `@interopio/desktop`.
    if (window.iodesktop) {
        htmlElement.classList.add(iodesktop.theme);
    };

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);
    await createThemesMenu();
    attachEventHandlers();
    handleIOConnectWindowEvents();
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

/** io.Connect THEMES EVENTS */
function handleIOConnectWindowEvents() {
    const handleThemeChanges = async (theme) => {
        if (theme.name === htmlElement.classList[0]) {
            return;
        };

        const logElement = document.createElement("p");
        const date = new Date();
        const timestamp = `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}:${(`0${date.getSeconds()}`).slice(-2)}`;

        logElement.innerText = `Theme "${theme.displayName}" selected at ${timestamp}.`
        logContainer.prepend(logElement);
    };

    // Handle theme changes.
    io.themes.onChanged(handleThemeChanges);
};

/** EVENT HANDLERS */
async function selectTheme() {
    const selectedTheme = this[this.selectedIndex].value;

    // Select a theme.
    await io.themes.select(selectedTheme);

    htmlElement.classList = "";
    htmlElement.classList.add(selectedTheme);

    // Get the currently selected theme.
    const currentTheme = await io.themes.getCurrent();

    selectedThemeElement.innerText = currentTheme.displayName;
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    htmlElement = document.documentElement;
    selectedThemeElement = document.getElementById("selected-theme");
    themesListElement = document.getElementById("themes-list");
    clearBtn = document.getElementById("clear-button");
    logContainer = document.getElementById("event-log");
};

async function createThemesMenu() {
    // Get a list of all available themes.
    const themes = await io.themes.list();
    const optionElement = document.createElement("option");

    const createOptionsInMenu = (theme) => {
        const currentOption = optionElement.cloneNode();

        currentOption.innerText = theme.displayName;
        currentOption.value = theme.name;
        themesListElement.appendChild(currentOption);
    };

    themes.forEach(createOptionsInMenu);
};

function attachEventHandlers() {
    clearBtn.addEventListener("click", clearLogs);
    themesListElement.addEventListener("change", selectTheme);
};

function clearLogs() {
    logContainer.innerText = "";
};