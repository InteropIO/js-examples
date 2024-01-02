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
        name: "interop.io",
        displayName: "interop.io",
        instrument: "INTEROP"
    }
];

// Name of the Interop method to invoke.
const methodName = "ShowCompanyDetails";

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    document.body.addEventListener("click", invokeInteropMethod);
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

// Function for invoking the Interop method when a button is clicked.
function invokeInteropMethod(event) {
    if (event.target.nodeName === "BUTTON") {
        const selectedCompanyName = event.target.textContent;
        const selectedCompany = companies.find(company => company.displayName === selectedCompanyName);
        const company = selectedCompany.name;
        const instrument = selectedCompany.instrument;
        // The arguments must be wrapped in an object.
        const arguments = { company, instrument };

        // Invoking an Interop method by name and passing arguments for the invocation.
        io.interop.invoke(methodName, arguments);
    };
};