// Name for the stream to be created.
const streamName = "G42.StreamDemo";

let stream;
let subscriptionCountElement;
let streamBtn;
let dataInput;
let publishAllBtn;
let publishBranchBtn;
let subscriptionRequestsContainter;
let subscriptionRequestTemplate;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    subscriptionCountElement = document.getElementById("subscription-count");
    streamBtn = document.getElementById("stream-button");
    dataInput = document.getElementById("data-input");
    publishAllBtn = document.getElementById("publish-all-button");
    publishBranchBtn = document.getElementById("publish-branch-button");
    subscriptionRequestsContainter = document.getElementById("subscription-requests");
    subscriptionRequestTemplate = createSubscriptionRequestTemplate();

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    streamBtn.addEventListener("click", handleStream);
    publishAllBtn.addEventListener("click", publishToAll);
    publishBranchBtn.addEventListener("click", publishToBranch);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

function handleStream() {
    const streamState = streamBtn.getAttribute("streaming");

    if (streamState === "true") {
        streamBtn.innerText = "Close Stream";
        streamBtn.setAttribute("streaming", "false");
        
        createInteropStream();
    } else if (streamState === "false") {
        streamBtn.innerText = "Create Stream";
        streamBtn.setAttribute("streaming", "true");

        closeInteropStream();
    };
};

const subscriptions = {
    onAdded: (subscription) => {
        const subscriptionCount = subscription.stream.subscriptions().length;

        subscriptionCountElement.innerText = subscriptionCount;
    },
    onRemoved: (subscription) => {
        const subscriptionCount = subscription.stream.subscriptions().length;

        subscriptionCountElement.innerText = subscriptionCount;
    },
    onRequested: (request) => {
        const isntanceID = request.instance.windowId;
        const requestElement = subscriptionRequestTemplate.cloneNode(true);
        const requestText = requestElement.getElementsByTagName("p")[0];
        const acceptBtn = requestElement.getElementsByTagName("button")[0];
        const acceptOnBranchBtn = requestElement.getElementsByTagName("button")[1];
        const rejectBtn = requestElement.getElementsByTagName("button")[2];

        requestText.innerText = `Received subscription request by application instance with ID: "${isntanceID}"`;

        acceptBtn.addEventListener("click", acceptHandler);
        acceptOnBranchBtn.addEventListener("click", acceptOnBranchHandler);
        rejectBtn.addEventListener("click", rejectHandler);

        function acceptHandler() {
            request.accept();
            this.parentNode.remove();
        };

        function acceptOnBranchHandler() {
            request.acceptOnBranch();
            this.parentNode.remove();
        };

        function rejectHandler() {
            request.reject();
            this.parentNode.remove();
        };

        subscriptionRequestsContainter.appendChild(requestElement);
    }
};

async function createInteropStream() {
    const streamOptions = {
        subscriptionAddedHandler: subscriptions.onAdded,
        subscriptionRemovedHandler: subscriptions.onRemoved,
        subscriptionRequestHandler: subscriptions.onRequested
    };

    stream = await glue.interop.createStream(streamName, streamOptions);
};

function closeInteropStream() {
    stream.close();
    subscriptionCountElement.innerText = "0";
    subscriptionRequestsContainter.innerHTML = "";
};

function publishToAll() {

};

function publishToBranch() {

};

// Create a template for the subscription requests.
function createSubscriptionRequestTemplate() {
    const template = document.createElement("div");

    template.classList.add("bg-dark", "p-2", "mb-2");

    const textHolder = document.createElement("p");

    textHolder.classList.add("card-text");
    template.appendChild(textHolder);

    const acceptBtn = document.createElement("button");

    acceptBtn.innerText = "Accept";
    acceptBtn.setAttribute("type", "button");
    acceptBtn.classList.add("btn", "btn-primary", "mr-2");
    template.appendChild(acceptBtn);

    const acceptOnBranchBtn = acceptBtn.cloneNode(true);

    acceptOnBranchBtn.innerText = "Accept on Branch";
    acceptOnBranchBtn.classList.remove("btn-primary");
    acceptOnBranchBtn.classList.add("btn-success");
    template.appendChild(acceptOnBranchBtn);

    const rejectBtn = acceptBtn.cloneNode(true);

    rejectBtn.innerText = "Reject";
    rejectBtn.classList.remove("btn-primary");
    rejectBtn.classList.add("btn-danger");
    template.appendChild(rejectBtn);

    return template;
};