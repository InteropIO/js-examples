let htmlElement;
let selectedThemeElement;
let themesListElement;
let clearBtn;
let logContainer;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Get the initially selected theme before the initialization of the Glue42 library.
    if (window.glue42gd) {
        htmlElement.classList.add(glue42gd.theme);
    };

    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);
    await createThemesMenu();
    attachEventHandlers();
    handleGlue42WindowEvents();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

/** GLUE42 THEMES EVENTS */
function handleGlue42WindowEvents() {
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
    glue.themes.onChanged(handleThemeChanges);
};

/** EVENT HANDLERS */
async function selectTheme() {
    const selectedTheme = this[this.selectedIndex].value;

    // Select a theme.
    await glue.themes.select(selectedTheme);
    
    htmlElement.classList = "";
    htmlElement.classList.add(selectedTheme);

    // Get the currently selected theme.
    const currentTheme = await glue.themes.getCurrent();

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
    const themes = await glue.themes.list();
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