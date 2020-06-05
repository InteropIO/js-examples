let channelNameItem;
let channelColorItem;
let channelDataItem;
let channelListJoinItem;
let joinBtn;
let leaveBtn;
let channelListGetContextItem;
let getContextBtn;
let channelContextItem;

/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    channelNameItem = document.getElementById("channel-name");
    channelColorItem = document.getElementById("channel-color");
    channelDataItem = document.getElementById("channel-data");
    channelListJoinItem = document.getElementById("channel-list-join");
    joinBtn = document.getElementById("join-button");
    leaveBtn = document.getElementById("leave-button");
    channelListGetContextItem = document.getElementById("channel-list-context");
    getContextBtn = document.getElementById("get-context-button");
    channelContextItem = document.getElementById("channel-context");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    // Get the available channels and fill the select menus with the channel names.
    await createChannelsMenu();
    // Subscribe for updates of the current channel.
    subscribeToChannel();
    // Track channel changes.
    trackCurrentChannel();
    // Handle the buttons for joining/leaving a channel and for getting channel context.
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
        channelListJoinItem.appendChild(currentOption);
        channelListGetContextItem.appendChild(currentOption.cloneNode(true));
    });
};

/** SUBSCRIBE TO THE CURRENT CHANNEL **/
function subscribeToChannel() {
    return glue.channels.subscribe(handleChannelUpdates);
};

function handleChannelUpdates(newChannelData) {
    channelDataItem.innerText = JSON.stringify(newChannelData);
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
            channelDataItem.innerText = "";
        }
    });
};

/** HANDLE BUTTON CLICKS **/
function handleButtonClicks() {
    joinBtn.addEventListener("click", joinChannel);
    leaveBtn.addEventListener("click", leaveChannel);
    getContextBtn.addEventListener("click", getChannelContext);
};

function joinChannel() {
    const selectedChannelName = channelListJoinItem[channelListJoinItem.selectedIndex].text;

    // Join a channel programmatically (instead of from the Channel Selector UI).
    glue.channels.join(selectedChannelName);
};

function leaveChannel() {
    // Leave the current channel programmatically (instead of from the Channel Selector UI).
    glue.channels.leave();
};

async function getChannelContext() {
    const selectedChannelName = channelListGetContextItem[channelListGetContextItem.selectedIndex].text;
    // Get the context of a channel by a channel name.
    const channelContext = await glue.channels.get(selectedChannelName);
    // Extract the actual data from the channel context object (the value of its `data` property).
    const contextData = JSON.stringify(channelContext.data);

    channelContextItem.innerText = contextData;
};