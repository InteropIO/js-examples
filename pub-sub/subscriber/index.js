// Topic for messages on which to subscribe.
const topic = "Time";

let hoursElement;
let minutesElement;
let secondsElement;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    hoursElement = document.getElementById("hours");
    minutesElement = document.getElementById("minutes");
    secondsElement = document.getElementById("seconds");

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    subscribeForMessages();
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    // Initializing the `@interopio/desktop` with `bus: true`
    // in order to be able to use the Pub/Sub API.
    window.io = await IODesktop({ bus: true });
};

/** SUBSCRIBE FOR MESSAGES ON A SPECIFIC TOPIC **/
function subscribeForMessages() {
    io.bus.subscribe(topic, handleData);
};

// Handle the data recieved from the messages.
function handleData(data) {
    const hours = data.hours;
    const minutes = data.minutes;
    const seconds = data.seconds;

    hoursElement.innerText = hours;
    minutesElement.innerText = minutes;
    secondsElement.innerText = seconds;
};