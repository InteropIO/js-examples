let channelNameElement;
let channelColorElement;
let currentChannelInput;
let publishToCurrentBtn;
let channelListElement;
let selectedChannelInput;
let publishToSelectedBtn;
let selectChannelAlert;
let dismissBtn;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the Glue42 library.
    await initializeGlue42().catch(console.error);

    // Get the available Channels and fill the select menu with the Channel names.
    await createChannelsMenu();
    // Track Channel changes.
    trackCurrentChannel();
    // Handle the buttons for publishing data to the Channel.
    handleButtonClicks();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    // Initialize the Glue42 library and enable the Channels API
    // and the Channel Selector UI.
    window.glue = await Glue({ channels: true });
};

/** TRACK APPLICATION MOVEMENT BETWEEN CHANNELS **/
function trackCurrentChannel() {
    // The callback passed to the `onChanged()` method will fire
    // every time the app changes Channels.
    glue.channels.onChanged(async (newChannelName) => {
        if (newChannelName) {
            // Handle switching to another Channel.
            const newChannelContext = await glue.channels.get(newChannelName);

            channelNameElement.innerText = newChannelName;
            channelColorElement.style.backgroundColor = newChannelContext.meta.color;
        } else {
            // Handle the case where the app is not joined to any Channel
            // (e.g., the user has deselected the current Channel).
            channelNameElement.innerText = "No Channel";
            channelColorElement.style.backgroundColor = "";
        };
    });
};

/** PUBLISHING CHANNEL DATA **/
async function publishToCurrent() {
    // Get the name of the Channel the application is currently on.
    const currentChannelName = await glue.channels.my();

    if (currentChannelName) {
        const input = currentChannelInput.value;
        const dataToPublish = { input };

        // Publish data to the current Channel.
        glue.channels.publish(dataToPublish);
        currentChannelInput.value = "";
    } else {
        showAlert();
    };
};

function publishToSelected() {
    const selectedChannelName = channelListElement[channelListElement.selectedIndex].text;
    const input = selectedChannelInput.value;
    const dataToPublish = { input };

    // Publish data to a specified channel by providing a Channel name
    // as a second parameter to the `publish()` method.
    glue.channels.publish(dataToPublish, selectedChannelName);
    selectedChannelInput.value = "";
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    channelNameElement = document.getElementById("channel-name");
    channelColorElement = document.getElementById("channel-color");
    currentChannelInput = document.getElementById("data-input-current");
    publishToCurrentBtn = document.getElementById("publish-current-button");
    channelListElement = document.getElementById("channel-list");
    selectedChannelInput = document.getElementById("data-input-selected");
    publishToSelectedBtn = document.getElementById("publish-selected-button");
    selectChannelAlert = document.getElementById("select-channel-alert");
    dismissBtn = document.getElementById("dismiss-button");
};

// Fill the dropdown menu with all available Channels.
async function createChannelsMenu() {
    // Get the names of all available Channels.
    const allChannels = await glue.channels.list();
    const optionElement = document.createElement("option");

    const sortChannelsByName = (a, b) => a.name.localeCompare(b.name);

    const createOptionInMenu = (channelContext) => {
        const currentOption = optionElement.cloneNode();
        const channelName = channelContext.name;
        const channelColor = channelContext.meta.color;

        currentOption.innerText = channelName;
        currentOption.style.color = channelColor;
        channelListElement.appendChild(currentOption);
    };

    allChannels.sort(sortChannelsByName).forEach(createOptionInMenu);
};

// Handle button clicks.
function handleButtonClicks() {
    publishToCurrentBtn.addEventListener("click", publishToCurrent);
    publishToSelectedBtn.addEventListener("click", publishToSelected);
    dismissBtn.addEventListener("click", hideAlert);
};

function showAlert() {
    selectChannelAlert.classList.remove("d-none");
};

function hideAlert() {
    selectChannelAlert.classList.add("d-none");
};