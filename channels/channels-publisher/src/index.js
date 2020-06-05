let channelNameItem;
let channelColorItem;
let currentChannelInput;
let publishToCurrentBtn;
let selectChannelAlert;
let channelListItem;
let selectedChannelInput;
let publishToSelectedBtn;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    channelNameItem = document.getElementById("channel-name");
    channelColorItem = document.getElementById("channel-color");
    currentChannelInput = document.getElementById("data-input-current");
    publishToCurrentBtn = document.getElementById("publish-current-button");
    selectChannelAlert = document.getElementById("select-channel-alert");
    channelListItem = document.getElementById("channel-list");
    selectedChannelInput = document.getElementById("data-input-selected");
    publishToSelectedBtn = document.getElementById("publish-selected-button");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    // Get the available channels and fill the select menu with the channel names.
    await createChannelsMenu();
    // Track channel changes.
    trackCurrentChannel();
    // Handle the buttons for publishing data to the channel.
    handleButtonClicks();
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    // Initialize the Glue42 library and enable the Channels API
    // and the Channel Selector UI.
    window.glue = await Glue({ channels: true });
};

/** FILL THE DROPDOWN MENU WITH ALL AVAILABLE CHANNELS **/
async function createChannelsMenu() {
    // Get the names of all available channels.
    const allChannels = await glue.channels.all();
    const optionItem = document.createElement("option");

    allChannels.sort().forEach(channelName => {
        const currentOption = optionItem.cloneNode();
        
        currentOption.innerText = channelName;
        channelListItem.appendChild(currentOption);
    });
};

/** TRACK APPLICATION MOVEMENT BETWEEN CHANNELS **/
function trackCurrentChannel() {
    // The callback passed to the `onChanged()` method will fire
    // every time the app changes channels.
    glue.channels.onChanged(async newChannelName => {
        if (newChannelName) {
            // Handle switching to another channel.
            const newChannelContext = await glue.channels.get(newChannelName);

            channelNameItem.innerText = newChannelName;
            channelColorItem.style.backgroundColor = newChannelContext.meta.color;
        } else {
            // Handle the case where the app is not joined to any channel 
            // (e.g., the user has deselected the current channel).
            channelNameItem.innerText = "No Channel";
            channelColorItem.style.backgroundColor = "";
        }
    });
};

/** HANDLE BUTTON CLICKS **/
function handleButtonClicks() {
    publishToCurrentBtn.addEventListener("click", publishToCurrent);
    publishToSelectedBtn.addEventListener("click", publishToSelected);
};

async function publishToCurrent() {
    // Get the name of the channel the application is currently on.
    const currentChannelName = await glue.channels.my();

    if (currentChannelName) {
        selectChannelAlert.style.display = "none";

        const input = currentChannelInput.value;
        const dataToPublish = { input };

        // Publish data to the current channel.
        glue.channels.publish(dataToPublish);
        currentChannelInput.value = "";
    } else {
        selectChannelAlert.style.display = "block";
    }
};

function publishToSelected() {
    const selectedChannelName = channelListItem[channelListItem.selectedIndex].text;
    const input = selectedChannelInput.value;
    const dataToPublish = { input };

    // Publish data to a specified channel by provide a channel name 
    // as a second parameter to the `publish()` method.
    glue.channels.publish(dataToPublish, selectedChannelName);
    selectedChannelInput.value = "";
};