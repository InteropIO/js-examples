let channelNameItem;
let channelColorItem;
let currentChannelInput;
let publishToCurrentBtn;
let selectChannelAlert;
let channelListItem;
let selectedChannelInput;
let publishToSelectedBtn;

window.addEventListener("DOMContentLoaded", async () => {
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

    trackCurrentChannel();

    handleButtonClicks();
});

async function initializeGlue42() {
    // Initialize the Glue42 library and enable the Channels API
    // and the Channel Selector UI.
    window.glue = await Glue({ channels: true });
};

async function createChannelsMenu() {
    const allChannels = await glue.channels.all();
    const optionItem = document.createElement("option");

    allChannels.sort().forEach(channelName => {
        const currentOption = optionItem.cloneNode();
        
        currentOption.innerText = channelName;
        channelListItem.appendChild(currentOption);
    });
};

function trackCurrentChannel() {
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

function handleButtonClicks() {
    publishToCurrentBtn.addEventListener("click", publishToCurrent);
    publishToSelectedBtn.addEventListener("click", publishToSelected);
};

async function publishToCurrent() {
    const currentChannelName = await glue.channels.my();

    if (currentChannelName) {
        selectChannelAlert.style.display = "none";

        const input = currentChannelInput.value;
        const dataToPublish = { input };

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

    glue.channels.publish(dataToPublish, selectedChannelName);
    selectedChannelInput.value = "";
};