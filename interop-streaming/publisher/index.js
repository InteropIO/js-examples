// Name for the stream to be created.
const streamName = "G42.StreamDemo";
// Name for a stream branch on which to group subscribers.
const branchName = "Private";

let stream;
let subscriptionCountElement;
let streamBtn;
let dataInput;
let publishAllBtn;
let publishBranchBtn;
let noStreamWarning;
let subscriptionRequestsContainter;
let subscriptionRequestTemplate;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);

    streamBtn.addEventListener("click", handleStream);
    publishAllBtn.addEventListener("click", publishToAll);
    publishBranchBtn.addEventListener("click", publishToBranch);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

/** SUBSCRIPTION AND SUBSCRIPTION REQUEST HANDLERS **/
const subscriptions = {
    // Handler for added subscriptions.
    onAdded: (subscription) => {
        const subscriptionCount = subscription.stream.subscriptions().length;

        subscriptionCountElement.innerText = subscriptionCount;
    },
    // Hnadler for removed subscriptions.
    onRemoved: (subscription) => {
        const subscriptionCount = subscription.stream.subscriptions().length;

        subscriptionCountElement.innerText = subscriptionCount;
    },
    // Handler for subscription requests.
    onRequested: (request) => {
        const isntanceID = request.instance.windowId;
        const requestElement = subscriptionRequestTemplate.cloneNode(true);
        const requestTextElement = requestElement.getElementsByTagName("p")[0];
        const requestButtons = requestElement.getElementsByTagName("button");
        const acceptBtn = requestButtons[0];
        const acceptOnBranchBtn = requestButtons[1];
        const rejectBtn = requestButtons[2];

        requestTextElement.innerText = `Received subscription request by application instance with ID: "${isntanceID}"`;

        acceptBtn.addEventListener("click", acceptHandler);
        acceptOnBranchBtn.addEventListener("click", acceptOnBranchHandler);
        rejectBtn.addEventListener("click", rejectHandler);

        // Subscription requests will fail on the side of the subscriber after 30 seconds (by default) 
        // if the stream method does not respond within that time frame. 
        // Set a 30 second timeout to remove the request if it is not accepted or rejected within that period
        // and therefore fails on the side of the subscriber.
        const timeout = setTimeout(removeSubscriptionRequest, 30000, requestElement);

        function removeSubscriptionRequest(requestElement) {
            requestElement.remove();
        };

        function acceptHandler() {
            // Accept the request on the default stream branch.
            request.accept();

            this.parentNode.remove();
            clearTimeout(timeout);
        };

        function acceptOnBranchHandler() {
            // Accept the request on a stream branch by specifying a branch key.
            request.acceptOnBranch(branchName);

            this.parentNode.remove();
            clearTimeout(timeout);
        };

        function rejectHandler() {
            // Reject the request.
            request.reject();
            
            this.parentNode.remove();
            clearTimeout(timeout);
        };

        subscriptionRequestsContainter.appendChild(requestElement);
    }
};

/** CREATE OR CLOSE THE STREAM **/
function handleStream() {
    const streamState = streamBtn.getAttribute("streaming");

    if (streamState === "false") {
        createInteropStream();

        streamBtn.innerText = "Close Stream";
        streamBtn.setAttribute("streaming", "true");  
    } else if (streamState === "true") {
        closeInteropStream();

        streamBtn.innerText = "Create Stream";
        streamBtn.setAttribute("streaming", "false");
    };
};

async function createInteropStream() {
    // Optional subscription and subscription request handlers.
    const streamOptions = {
        subscriptionAddedHandler: subscriptions.onAdded,
        subscriptionRemovedHandler: subscriptions.onRemoved,
        subscriptionRequestHandler: subscriptions.onRequested
    };

    // Creating the stream.
    stream = await glue.interop.createStream(streamName, streamOptions);
    handleAlert("none");
};

function closeInteropStream() {
    // Closing the stream.
    stream.close();
    stream = undefined;
    subscriptionCountElement.innerText = "0";
    subscriptionRequestsContainter.innerHTML = "";
};

function publishToAll() {
    if (stream) {
        const dataToPublish = { data: dataInput.value };
        
        // Push data to all stream subscribers.
        stream.push(dataToPublish);

        handleAlert("none");
        dataInput.value = "";
    } else {
        handleAlert("block");
    };
};

function publishToBranch() {
    if (stream) {
        const dataToPublish = { data: dataInput.value };
        
        // Push data only to the subscribers grouped on the specified stream branch.
        stream.push(dataToPublish, branchName);
        
        dataInput.value = "";
        handleAlert("none");
    } else {
        handleAlert("block");
    };
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    subscriptionCountElement = document.getElementById("subscription-count");
    streamBtn = document.getElementById("stream-button");
    dataInput = document.getElementById("data-input");
    publishAllBtn = document.getElementById("publish-all-button");
    publishBranchBtn = document.getElementById("publish-branch-button");
    noStreamWarning = document.getElementById("no-stream-warning");
    subscriptionRequestsContainter = document.getElementById("subscription-requests");
    subscriptionRequestTemplate = createSubscriptionRequestTemplate();
};

// Show or hide the warning for publishing when the stream has not yet been created.
function handleAlert(alertState) {
    noStreamWarning.style.display = alertState;
};

// Create a template for the subscription requests.
function createSubscriptionRequestTemplate() {
    const template = document.createElement("div");

    template.classList.add("bg-dark", "p-2", "mb-2");

    const textHolder = document.createElement("p");

    textHolder.classList.add("card-text");

    const acceptBtn = document.createElement("button");

    acceptBtn.innerText = "Accept";
    acceptBtn.setAttribute("type", "button");
    acceptBtn.classList.add("btn", "btn-primary", "mr-2");

    const acceptOnBranchBtn = acceptBtn.cloneNode(true);

    acceptOnBranchBtn.innerText = "Accept on Branch";
    acceptOnBranchBtn.classList.remove("btn-primary");
    acceptOnBranchBtn.classList.add("btn-success");

    const rejectBtn = acceptBtn.cloneNode(true);

    rejectBtn.innerText = "Reject";
    rejectBtn.classList.remove("btn-primary");
    rejectBtn.classList.add("btn-danger");
    
    template.append(textHolder, acceptBtn, acceptOnBranchBtn, rejectBtn);

    return template;
};