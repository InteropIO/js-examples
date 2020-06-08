// Topic on which the messages will be published.
const topic = "Time";
let startPublishingBtn;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    startPublishingBtn = document.getElementById("button");

    // Initialize the Glue42 library.
    await initializeGlue42()
    .catch(error => { 
        console.error(error); 
        return 
    });

    startPublishingBtn.addEventListener("click", startPublishing);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    // Initializing the Glue42 library with `bus: true`
    // in order to be able to use the Pub/Sub API.
    window.glue = await Glue({ bus: true });
};

/** PUBLISH MESSAGES AT AN INTERVAL **/
function startPublishing() {
    setInterval(() => {
        const currentDate = new Date();
        const data = {
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            seconds: currentDate.getSeconds()
        };

        // Publish a message on a specific topic.
        glue.bus.publish(topic, data);
    }, 1000);
};