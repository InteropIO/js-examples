let instrumentItem;
let priceItem;
let companyItem;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    instrumentItem = document.getElementById("instrument");
    priceItem = document.getElementById("price");
    companyItem = document.getElementById("company");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    registerInteropMethod();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

function registerInteropMethod() {
    const methoDefinition = {
        name: "ShowInstrumentDetails",
        description: "Shows information about an instrument - name, price, company.",
        accepts: "String name, String company"
    };

    glue.interop.register(methoDefinition, showInstrumentDetails);
};

function showInstrumentDetails(args) {
    const instrumentName = args.name;
    const companyName = args.company;
    const fakePrice = (Math.random() * 100).toFixed(2);

    instrumentItem.innerText = instrumentName;
    companyItem.innerText = companyName;
    priceItem.innerText = fakePrice;
};