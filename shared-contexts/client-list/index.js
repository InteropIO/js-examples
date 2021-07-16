const contextName = "SelectedClient";

let clientsTable;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);
    await createContext();
    // Destroy the context when the window is about to be closed.
    glue.windows.my().onClosing(async () => await glue.contexts.destroy(contextName));
    
    clientsTable = document.getElementById("clients-table");
    clientsTable.addEventListener("click", openPortfolio);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

// Create an initial context if it doesn't already exist.
async function createContext() {
    const contexts = await glue.contexts.all();
    const doesExist = contexts.includes(contextName);

    if (doesExist) {
        return;
    } else {
        // Set an initial context.
        await glue.contexts.set(contextName, { clientID: "" });
    };
};

async function openPortfolio(event) {
    const clickedElement = event.target;

    if (clickedElement.nodeName !== "TD") {
        return;
    };

    const clientID = clickedElement.parentNode.id;
    const update = { clientID };

    // Update the context with the ID of the selected client.
    await glue.contexts.update(contextName, update);
};