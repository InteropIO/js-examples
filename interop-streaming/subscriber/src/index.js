// Name for the stream to which to subscribe.
const streamName = "G42.StreamDemo";

let subscription;
let subscriptionBtn;
let dataElement;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    subscriptionBtn = document.getElementById("subscription-button");
    dataElement = document.getElementById("data");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    subscriptionBtn.addEventListener("click", handleSubscription);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

/** CREATE OR CLOSE THE SUBSCRIPTION **/
function handleSubscription() {
    const subscriptionState = subscriptionBtn.getAttribute("subscribed");

    if (subscriptionState === "false") {
        subscriptionBtn.setAttribute("subscribed", "true");
        subscribeToStream();  
    } else if (subscriptionState === "true" && subscription) {
        closeSubscription();
    };
};

async function subscribeToStream() {
    const subscriptionParams = {
        onConnected: handleAcceptedSubscription,
        onData: handleReceivedData,
        onClosed: handleClosedSubscription
    }

    subscription = await glue.interop.subscribe(streamName, subscriptionParams)
        .catch(handleFailedSubscription);
};

function handleAcceptedSubscription() {
    subscriptionBtn.innerText = "Unsubscribe";
    dataElement.innerText = "Successful subscription! No stream data available yet.";
};

function handleReceivedData(streamData) {
    const receivedData = streamData.data;

    dataElement.innerText = JSON.stringify(receivedData);
};

function handleClosedSubscription() {
    subscriptionBtn.innerText = "Subscribe";
    subscriptionBtn.setAttribute("subscribed", "false");
    dataElement.innerText = "The subscription has been closed.";
};

function handleFailedSubscription() {
    subscriptionBtn.setAttribute("subscribed", "false");
    dataElement.innerText = "Subscription rejected or failed!";
};

function closeSubscription() {
    subscription.close();
};