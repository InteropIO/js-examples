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
    await initializeGlue42().catch(console.error);

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

const subscriptions = {
    onAccepted: () => {
        subscriptionBtn.innerText = "Unsubscribe";
        dataElement.innerText = "Successful subscription! No stream data available yet.";
    },
    onData: (streamData) => {
        const receivedData = streamData.data;
    
        dataElement.innerText = JSON.stringify(receivedData);
    },
    onClosed: () => {
        subscriptionBtn.innerText = "Subscribe";
        subscriptionBtn.setAttribute("subscribed", "false");
        dataElement.innerText = "The subscription has been closed.";
    },
    onFailed: () => {
        subscriptionBtn.setAttribute("subscribed", "false");
        dataElement.innerText = "Subscription rejected or failed!";
    }
};

// Subscribe to the stream.
async function subscribeToStream() {

    // Optional subscription handlers.
    const subscriptionParams = {
        onConnected: subscriptions.onAccepted,
        onData: subscriptions.onData,
        onClosed: subscriptions.onClosed
    };

    // Creating the stream subscription.
    subscription = await glue.interop.subscribe(streamName, subscriptionParams)
        .catch(subscriptions.onFailed);
};

function closeSubscription() {
    // Closing the subscription.
    subscription.close();
};