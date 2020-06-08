// Topic for messages on which to subscribe.
const topic = "Time";

let hoursItem;
let minutesItem;
let secondsItem;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    hoursItem = document.getElementById("hours");
    minutesItem = document.getElementById("minutes");
    secondsItem = document.getElementById("seconds");
    
    // Initialize the Glue42 library.
    await initializeGlue42()
    .catch(error => { 
        console.error(error); 
        return 
    });

    subscribeForMessages();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    // Initializing the Glue42 library with `bus: true`
    // in order to be able to use the Pub/Sub API.
    window.glue = await Glue({ bus: true });
};

/** SUBSCRIBE FOR MESSAGES ON A SPECIFIC TOPIC **/
function subscribeForMessages() {
    glue.bus.subscribe(topic, handleData);
};

// Handle the data recieved from the messages.
function handleData(data) {
    const hours = data.hours;
    const minutes = data.minutes;
    const seconds = data.seconds;

    hoursItem.innerText = hours;
    minutesItem.innerText = minutes;
    secondsItem.innerText = seconds;
};