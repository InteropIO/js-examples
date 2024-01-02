// Topic on which the messages will be published.
const topic = "Time";
let startPublishingBtn;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    startPublishingBtn = document.getElementById("button");

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    startPublishingBtn.addEventListener("click", handlePublishing);
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    // Initializing the `@interopio/desktop` with `bus: true`
    // in order to be able to use the Pub/Sub API.
    window.io = await IODesktop({ bus: true });
};

/** HANDLE PUBLISHING MESSAGES AT A SET INTERVAL */
let interval;

function handlePublishing() {
    const publishState = startPublishingBtn.getAttribute("publishing");

    if (publishState === "false") {
        startPublishing();

        startPublishingBtn.innerText = "Stop Publishing";
        startPublishingBtn.setAttribute("publishing", "true");
    } else if (publishState === "true") {
        stopPublishing();

        startPublishingBtn.innerText = `Start Publishing on Topic "Time"`;
        startPublishingBtn.setAttribute("publishing", "false");
    };
};

function startPublishing() {
    const publishAtInterval = () => {
        const currentDate = new Date();
        const data = {
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            seconds: currentDate.getSeconds()
        };

        // Publish a message on a specific topic.
        io.bus.publish(topic, data);
    };

    interval = setInterval(publishAtInterval, 1000);
};

function stopPublishing() {
    clearInterval(interval);
};