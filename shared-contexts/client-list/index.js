const contextName = "SelectedClient";

let clientsTable;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);
    await createContext();
    // Destroy the context when the window is about to be closed.
    io.windows.my().onClosing(async () => await io.contexts.destroy(contextName));

    clientsTable = document.getElementById("clients-table");
    clientsTable.addEventListener("click", openPortfolio);
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

// Create an initial context if it doesn't already exist.
async function createContext() {
    const contexts = await io.contexts.all();
    const doesExist = contexts.includes(contextName);

    if (doesExist) {
        return;
    } else {
        // Set an initial context.
        await io.contexts.set(contextName, { clientID: "" });
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
    await io.contexts.update(contextName, update);
};