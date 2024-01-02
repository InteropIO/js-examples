let companyElement;
let instrumentElement;
let priceElement;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    companyElement = document.getElementById("company");
    instrumentElement = document.getElementById("instrument");
    priceElement = document.getElementById("price");

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    // Register an Interop method that will show details about a selected instrument.
    registerInteropMethod();
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    window.io = await IODesktop();
};

function registerInteropMethod() {

    // Method definition. The only required property is the name of the method.
    const methoDefinition = {
        name: "ShowCompanyDetails",
        description: "Shows information about a company - name, instrument, instrument price.",
        accepts: "String company, String instrument"
    };

    // Registering an Interop method by passing a method definition and a callback
    // that will be executed when the registered Interop method is invoked.
    io.interop.register(methoDefinition, showInstrumentDetails);
};

function showInstrumentDetails(args) {
    const companyName = args.company;
    const instrumentName = args.instrument;
    const fakePrice = (Math.random() * 100).toFixed(2);

    companyElement.innerText = companyName;
    instrumentElement.innerText = instrumentName;
    priceElement.innerText = fakePrice;
};