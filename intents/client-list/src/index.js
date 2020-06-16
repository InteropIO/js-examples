const intent = "DisplayPortfolio";
const targetedHandlerName = "intentsClientPortfolio";
const contextType = "Client";

let clientsTable;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    clientsTable = document.getElementById("clients-table");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch((error) => { 
            console.error(error); 
            return;
        });

    clientsTable.addEventListener("click", openPortfolio);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

// Find the targeted intent handler and raise an intent if it exists.
async function openPortfolio(event) {
    const clickedElement = event.target;

    if (clickedElement.nodeName !== "TD") {
        return;
    };

    const clientID = clickedElement.parentNode.id;
    // Context for the raised intent.
    const context = { type: contextType, data: { clientID } };
    // Filter with which to find the targeted intent.
    const intentFilter = { name: intent, contextType };
    // Finding an intent by name and context type.
    const targetedIntent = await glue.intents.find(intentFilter);
    // Check whether the desired handler is among the handlers of the targeted intent.
    const target = targetedIntent.handlers.find(handler => handler.applicationName === targetedHandlerName);
    console.log(target);
    
    if (target) {
        // Intent request object. The only required property is the intent name.
        const intentRequest = { intent, context, target: targetedHandlerName };

        // Raising an intent.
        glue.intents.raise(intentRequest)
            .catch(console.error);
    };
};