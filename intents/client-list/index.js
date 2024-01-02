const intent = "DisplayPortfolio";
const contextType = "Client";

let clientsTable;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    clientsTable = document.getElementById("clients-table");
    clientsTable.addEventListener("click", openPortfolio);
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

// Find the targeted Intent and raise it.
async function openPortfolio(event) {
    const clickedElement = event.target;

    if (clickedElement.nodeName !== "TD") {
        return;
    };

    const clientID = clickedElement.parentNode.id;

    // Context for the raised Intent.
    const context = { type: contextType, data: { clientID } };

    // Filter with which to find the targeted Intent.
    const intentFilter = { name: intent, contextType };

    // Finding an Intent by name and context type.
    const targetedIntent = await io.intents.find(intentFilter);

    if (targetedIntent) {
        // Intent request object. The only required property is the Intent name.
        const intentRequest = { intent, context, target: "reuse" };

        // Raising an Intent.
        await io.intents.raise(intentRequest).catch(console.error);
    };
};