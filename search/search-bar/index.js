let htmlElement;
let searchBar;
let searchField;
let searchBtn;
let closeBtn;
let resultsSection;
let myWindow;
let providers;
let types;
let query;
let results = [];

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    if (window.iodesktop) {
        handleThemeChanges(iodesktop.theme);
    };

    await initializeIOConnect();

    myWindow = io.windows.my();
    providers = (await io.search.listProviders()).filter(p => p.name === "search-provider");
    types = await io.search.listTypes();

    addEventListeners();

    searchField.focus();
};

/** INITIALIZATION **/
async function initializeIOConnect() {
    // Initializing the io.Connect library and enabling the Search API.
    const config = { libraries: [IOSearch] };

    window.io = await IODesktop(config);
};

/** HANDLE SEARCH QUERIES **/
async function handleSearch() {
    // Remove results from previous query.
    results = [];

    if (searchField.value !== "") {
        resultsSection.setAttribute("display", "none");
        resultsSection.replaceChildren();

        if (query) {
            query.cancel();
        };

        const queryConfig = {
            search: searchField.value,
            providers,
            providerLimits: {
                maxResultsPerType: 20
            },
            types
        };

        query = await io.search.query(queryConfig);

        query.onResults(consolidateResults);
        query.onCompleted(displayResults);
        query.onError(displayError);
    };
};

/** CONSOLIDATE RESULTS **/
function consolidateResults(resultsBatch) {
    results = results.concat(resultsBatch.results);
};

/** DISPLAY SEARCH RESULTS **/
function displayResults() {
    query = undefined;

    if (results.length === 0) {
        return;
    };

    orderResults(results);

    resultsSection.setAttribute("display", "block");
    resultsSection.style.height = "282px";

    if (results.length > 6) {
        resultsSection.style.overflowY = "scroll";
    } else {
        resultsSection.style.overflowY = "hidden";
    };

    myWindow.resizeTo(null, 330);

    let currentType = "";

    results.forEach((r, i) => {
        if (currentType !== r.type.displayName) {
            currentType = r.type.displayName;

            createSeparator(currentType);
        };

        const resultItem = document.createElement("button");

        resultItem.setAttribute("type", "button");
        resultItem.setAttribute("id", `${i}`);
        resultItem.classList.add("list-group-item", "list-group-item-action");
        resultItem.style.borderRadius = "17px";
        resultItem.innerText = r.displayName;

        resultsSection.appendChild(resultItem);
    });

    resultsSection.addEventListener("click", executeResultAction);
};

/** EXECUTE RESULT ACTIONS **/
function executeResultAction(event) {
    const resultItem = event.target;
    const resultID = Number(resultItem.getAttribute("id"));
    const result = results[resultID];
    const methodName = result.action.method;
    const args = result.action.params;

    io.interop.invoke(methodName, args);

    resetWindow();
};

/** DISPLAY ERROR FOR NO RESULTS **/
function displayError(error) {
    query = undefined;

    const errorElement = document.createElement("div");
    errorElement.style.marginTop = "5px";
    errorElement.innerText = error.error;

    myWindow.resizeTo(null, 71);

    resultsSection.setAttribute("display", "block");
    resultsSection.style.height = "28px";
    resultsSection.replaceChildren(errorElement);
};

/** HELPERS **/
function getDOMElements() {
    htmlElement = document.documentElement;
    searchBar = document.getElementById("search-bar");
    searchField = document.getElementById("search-field");
    searchBtn = document.getElementById("search-btn");
    closeBtn = document.getElementById("close-btn");
    resultsSection = document.getElementById("results-section");
};

function addEventListeners() {
    document.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        };

        if (event.key === "Escape") {
            resetWindow();
        };
    });
    searchBtn.addEventListener("click", handleSearch);
    closeBtn.addEventListener("click", resetWindow);

    myWindow.onFocusChanged((w) => {
        if (!w.isFocused) {
            resetWindow();
        } else {
            searchField.focus();
        };
    });
    myWindow.onRefreshing(() => {
        if (myWindow.bounds.height > 38) {
            myWindow.resizeTo(null, 38)
        }
    });
    io.themes.onChanged(handleThemeChanges);
};

function orderResults(rawResults) {
    let orderedResults = [];

    types.forEach(t => {
        orderedResults = orderedResults.concat(rawResults.filter(r => r.type.name === t.name));
    });

    results = orderedResults;
};

async function handleThemeChanges(theme) {
    const newTheme = typeof theme === "object" ? theme.name : theme;

    if (newTheme === "dark") {
        htmlElement.className = newTheme;
        searchBar.style.backgroundColor = "rgb(30, 30, 30)";
        resultsSection.style.backgroundColor = "rgb(30, 30, 30)";
    } else {
        htmlElement.className = newTheme;
        searchBar.style.backgroundColor = "rgb(250, 250, 250)";
        resultsSection.style.backgroundColor = "rgb(250, 250, 250)";
    };
};

function createSeparator(resultType) {
    const isPresent = resultsSection.querySelector(`#${resultType}`);

    if (!isPresent) {
        const separator = document.createElement("div");
        separator.setAttribute("id", `${resultType}`);
        separator.style.marginTop = "5px";
        separator.innerText = `- ${resultType} -`;

        resultsSection.appendChild(separator);
    };
};

function resetWindow() {
    myWindow.hide();
    myWindow.refresh();
};