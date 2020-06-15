// Company database.
const companies = [
    {
        name: "Google LLC",
        displayName: "Google",
        instrument: "GOOG"
    },
    {
        name: "Microsoft Corp.",
        displayName: "Microsoft",
        instrument: "MSFT"
    },
    {
        name: "Apple Inc.",
        displayName: "Apple",
        instrument: "AAPL"
    },
    {
        name: "Tick42 LLC",
        displayName: "Tick42",
        instrument: "TICK"
    }
];

// Name of the Interop method to invoke.
const methodName = "ShowCompanyDetails";

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the Glue42 library.
    await initializeGlue42()
    .catch((error) => { 
        console.error(error); 
        return;
    });

    document.body.addEventListener("click", invokeInteropMethod);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

// Function for invoking the Interop method when a button is clicked.
function invokeInteropMethod(event) {
    if (event.target.nodeName === "BUTTON") {
        const selectedCompany = event.target.textContent;
        const company = companies.find(company => company.displayName === selectedCompany).name;
        const instrument = company.instrument;
        // The arguments must be wrapped in an object.
        const arguments = { company, instrument };

        // Invoking an Interop method by name and passing arguments for the invocation.
        glue.interop.invoke(methodName, arguments);
    };
};