// Name of the context that will be manipulated.
const contextName = "T42.Themes";

let htmlElement;
let inputElement;
let updateBtn;
let themesContextElement;
let getContextBtn;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);

    // Subscribe for updates to the context.
    await subscribeForContext().catch(console.error);

    updateBtn.addEventListener("click", updateContext);
    getContextBtn.addEventListener("click", getContext);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

async function subscribeForContext() {
    return glue.contexts.subscribe(contextName, changeTheme);
};

async function updateContext() {
    const selected = inputElement.value;

    if (selected === "dark" || selected === "light") {
        const update = { selected };

        await glue.contexts.update(contextName, update);
    };
};

async function getContext() {
    const currentContext = await glue.contexts.get(contextName).catch(console.error);

    themesContextElement.innerText = JSON.stringify(currentContext);
};

function changeTheme(contextData) {
    const newTheme = contextData.selected;

    htmlElement.classList = "";
    htmlElement.classList.add(newTheme);
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    htmlElement = document.documentElement;
    inputElement = document.getElementById("theme-input");
    updateBtn = document.getElementById("update-button");
    themesContextElement = document.getElementById("themes-context");
    getContextBtn = document.getElementById("get-context-button");
};