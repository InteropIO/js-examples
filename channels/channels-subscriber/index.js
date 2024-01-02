let channelNameElement;
let channelColorElement;
let channelDataElement;
let channelListJoinElement;
let joinBtn;
let leaveBtn;
let channelListGetContextElement;
let getContextBtn;
let channelContextElement;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    getDOMElements();

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    // Get the available channels and fill the select menus with the channel names.
    await createChannelsMenu();
    // Subscribe for updates of the current channel.
    subscribeToChannel();
    // Track channel changes.
    trackCurrentChannel();
    // Handle the buttons for joining/leaving a channel and for getting channel context.
    handleButtonClicks();
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    // Initialize the `@interopio/desktop` library and enable the Channels API
    // and the Channel Selector UI.
    window.io = await IODesktop({ channels: true });
};

/** SUBSCRIBE TO THE CURRENT CHANNEL **/
function subscribeToChannel() {
    return io.channels.subscribe(handleChannelUpdates);
};

function handleChannelUpdates(newChannelData) {
    channelDataElement.innerText = JSON.stringify(newChannelData);
};

/** TRACK APP MOVEMENT BETWEEN CHANNELS **/
function trackCurrentChannel() {
    // The callback passed to the `onChanged()` method will fire
    // every time the app changes channels.
    io.channels.onChanged(async (newChannelName) => {
        if (newChannelName) {
            // Handle switching to another channel.
            const newChannelContext = await io.channels.get(newChannelName);

            channelNameElement.innerText = newChannelName;
            channelColorElement.style.backgroundColor = newChannelContext.meta.color;
        } else {
            // Handle the case where the app is not joined to any channel
            // (e.g., the user has deselected the current channel).
            channelNameElement.innerText = "No Channel";
            channelColorElement.style.backgroundColor = "";
            channelDataElement.innerText = "";
        };
    });
};

/** CHANNEL OPERATIONS **/
function joinChannel() {
    const selectedChannelName = channelListJoinElement[channelListJoinElement.selectedIndex].text;

    // Join a channel programmatically (instead of from the Channel Selector UI).
    io.channels.join(selectedChannelName);
};

function leaveChannel() {
    // Leave the current channel programmatically (instead of from the Channel Selector UI).
    io.channels.leave();
};

async function getChannelContext() {
    const selectedChannelName = channelListGetContextElement[channelListGetContextElement.selectedIndex].text;
    // Get the context of a channel by a channel name.
    const channelContext = await io.channels.get(selectedChannelName);
    // Extract the actual data from the channel context object (the value of its `data` property).
    const contextData = JSON.stringify(channelContext.data);

    channelContextElement.innerText = contextData;
};

/** DOM ELEMENT MANIPULATIONS **/
function getDOMElements() {
    channelNameElement = document.getElementById("channel-name");
    channelColorElement = document.getElementById("channel-color");
    channelDataElement = document.getElementById("channel-data");
    channelListJoinElement = document.getElementById("channel-list-join");
    joinBtn = document.getElementById("join-button");
    leaveBtn = document.getElementById("leave-button");
    channelListGetContextElement = document.getElementById("channel-list-context");
    getContextBtn = document.getElementById("get-context-button");
    channelContextElement = document.getElementById("channel-context");
};

// Fill the dropdown menus with all available channels.
async function createChannelsMenu() {
    // Get the names of all available channels.
    const allChannels = await io.channels.list();
    const optionElement = document.createElement("option");

    const sortChannelsByName = (a, b) => a.name.localeCompare(b.name);

    const createOptionInMenu = (channelContext) => {
        const currentOption = optionElement.cloneNode();
        const channelName = channelContext.name;
        const channelColor = channelContext.meta.color;

        currentOption.innerText = channelName;
        currentOption.style.color = channelColor;
        channelListJoinElement.appendChild(currentOption);
        channelListGetContextElement.appendChild(currentOption.cloneNode(true));
    };

    allChannels.sort(sortChannelsByName).forEach(createOptionInMenu);
};

// Handle button clicks.
function handleButtonClicks() {
    joinBtn.addEventListener("click", joinChannel);
    leaveBtn.addEventListener("click", leaveChannel);
    getContextBtn.addEventListener("click", getChannelContext);
};