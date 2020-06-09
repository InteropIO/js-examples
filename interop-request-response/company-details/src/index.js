let companyElement;
let instrumentElement;
let priceElement;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    companyElement = document.getElementById("company");
    instrumentElement = document.getElementById("instrument");
    priceElement = document.getElementById("price");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    // Register an Interop method that will show details about a selected instrument.
    registerInteropMethod();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
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
    glue.interop.register(methoDefinition, showInstrumentDetails);
};

function showInstrumentDetails(args) {
    const companyName = args.company;
    const instrumentName = args.instrument;
    const fakePrice = (Math.random() * 100).toFixed(2);

    companyElement.innerText = companyName;
    instrumentElement.innerText = instrumentName;
    priceElement.innerText = fakePrice;
};