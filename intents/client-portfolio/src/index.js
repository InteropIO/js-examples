import { clients } from "./clients-db.js";

const intent = "DisplayPortfolio";

let clientNameElement;
let portfolioContainer;
let context;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    clientNameElement = document.getElementById("client-name");
    portfolioContainer = document.getElementById("portfolio-table");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch((error) => { 
            console.error(error); 
            return;
        });

    context = glue.windows.my().context;

    const clientID = context.data.clientID;

    displayPortfolio(clientID);

    glue.intents.addIntentListener(intent, (context) => {
        const clientID = context.data.clientID;
        
        displayPortfolio(clientID);
    });
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

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