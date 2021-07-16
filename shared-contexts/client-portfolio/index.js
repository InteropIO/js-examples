// Client database.
import { clients } from "./clients-db.js";

// The name of the context for which to subscribe.
const contextName = "SelectedClient";

let clientNameElement;
let portfolioContainer;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    clientNameElement = document.getElementById("client-name");
    portfolioContainer = document.getElementById("portfolio-table");

    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);

    const clientID = await getInitialContext();
    console.log(clientID)
    displayPortfolio(clientID);

    glue.contexts.subscribe(contextName, handleContextUpdate)
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

async function getInitialContext() {
    const contexts = await glue.contexts.all();
    const doesExist = contexts.includes(contextName);

    if (doesExist) {
        const { clientID } = await glue.contexts.get(contextName);
        
        return clientID;
    };
};

function handleContextUpdate(data) {
    const clientID = data.clientID;

    displayPortfolio(clientID);
};

/** DOM ELEMENT MANIPULATIONS **/
function displayPortfolio(clientID) {
    if (!clientID) {
        return;
    };

    const client = clients.find(client => client.id === clientID);
    const clientName = client.name;
    const clientPortfolio = client.portfolio;
    const instrumentRows = clientPortfolio.map(createInstrumentRows);

    portfolioContainer.innerText = "";
    clientNameElement.innerText = clientName;
    portfolioContainer.append(...instrumentRows);
};

function createInstrumentRows(asset) {
    const instrument = asset.instrument;
    const shares = asset.shares;
    const price = asset.price;
    const instrumentRow = document.createElement("tr");
    const nameColumn = document.createElement("td");
    const sharesColumn = nameColumn.cloneNode();
    const priceColumn = nameColumn.cloneNode();

    nameColumn.innerText = instrument;
    sharesColumn.innerText = shares;
    priceColumn.innerText = price;
    instrumentRow.append(nameColumn, sharesColumn, priceColumn);

    return instrumentRow;
};