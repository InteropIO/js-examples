let appElementTemplate;
let instanceElementTemplate;
let appContainer;
let instanceContainer;

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Create DOM element templates for the apps and instances.
    createListElementTemplates();

    appContainer = document.getElementById("app-container");
    instanceContainer = document.getElementById("instance-list");

    // Initialize the `@interopio/desktop` library.
    await initializeIOConnect().catch(console.error);

    // Handle adding and removing apps and instances.
    setupAppAndInstanceEvents();

    // Start the selected app from the "Available Apps" list.
    appContainer.addEventListener("click", openApp);
};

/** INITIALIZE io.Connect **/
async function initializeIOConnect() {
    // Initializing the `@interopio/desktop` with `appManager:"full"`
    // in order to be able to use the complete App Management API.
    window.io = await IODesktop({ appManager: "full" });
};

/** HANDLE APP & INSTANCE EVENTS TO UPDATE THE LISTS **/
function setupAppAndInstanceEvents() {
    // The callback passed to the `onAppAdded()` method will fire
    // every time an app definition is added.
    io.appManager.onAppAdded(updateAppList);

    // The callback passed to the `onAppRemoved()` method will fire
    // every time an app definition is removed.
    io.appManager.onAppRemoved(updateAppList);

    // The callback passed to the `onInstanceStarted()` method will fire
    // every time an app instance is started.
    io.appManager.onInstanceStarted(addInstanceToList);

    // The callback passed to the `onInstanceStopped()` method will fire
    // every time an app instance is stopped.
    io.appManager.onInstanceStopped(removeInstanceFromList);
};

/** HELPER FUNCTIONS **/
function openApp(event) {
    const appName = event.target.id;

    // Start an app by name.
    io.appManager.application(appName).start();
};

function updateAppList(app) {
    // The app object has useful properties for identifying
    // or sorting apps - `name`, `title`, `hidden`, `instances`, etc.
    const appToRemove = document.getElementById(app.name);

    // Show only the apps visible in the App Manager.
    if (app.hidden === false) {
        // If an app is not in the list, add it, otherwise - remove it.
        if (!appToRemove) {
            const appToAdd = appElementTemplate.cloneNode(true);

            appToAdd.id = app.name;
            appToAdd.textContent = app.title;
            appContainer.appendChild(appToAdd);
        } else {
            appContainer.removeChild(appToRemove);
        };
    };
};

function addInstanceToList(instance) {
    const existingInstanceElement = document.getElementById(`${instance.application.name}-instance`);

    // Show only the instances of apps that are visible in the App Manager.
    if (instance.application.hidden === false) {

        // If the instance is not on the list, add it, otherwise - increment its count.
        if (!existingInstanceElement) {
            const instanceToAdd = instanceElementTemplate.cloneNode(true);
            const instanceNameElement = instanceToAdd.querySelector("span[name='instance']");
            const instanceCountElement = instanceToAdd.querySelector("span[name='count']");

            instanceToAdd.id = `${instance.application.name}-instance`;
            instanceNameElement.innerText = instance.application.title;
            instanceCountElement.innerText = instance.application.instances.length;
            instanceContainer.appendChild(instanceToAdd);
        } else {
            const instanceCountElement = existingInstanceElement.querySelector("span[name='count']");

            instanceCountElement.innerText = instance.application.instances.length;
        };
    };
};

function removeInstanceFromList(instance) {
    if (instance.application.hidden === false) {
        const instanceToRemove = document.getElementById(`${instance.application.name}-instance`);

        // Get the current number of the app instances.
        const instanceCount = instance.application.instances.length;

        // If this is the last app instance, remove it from the list,
        // otherwise - decrement its count.
        if (instanceCount === 0) {
            instanceToRemove.remove();
        } else {
            const instanceCountElement = instanceToRemove.querySelector("span[name='count']");
            instanceCountElement.innerText = instanceCount;
        };
    };
};

function createListElementTemplates() {
    appElementTemplate = document.createElement("button");
    appElementTemplate.classList.add("list-group-item", "list-group-item-action");

    instanceElementTemplate = document.createElement("li");
    instanceElementTemplate.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    const instanceNameSpan = document.createElement("span");
    instanceNameSpan.setAttribute("name", "instance");

    const instanceCountSpan = document.createElement("span");
    instanceCountSpan.classList.add("badge", "badge-primary", "badge-pill");
    instanceCountSpan.setAttribute("name", "count");

    instanceElementTemplate.appendChild(instanceNameSpan);
    instanceElementTemplate.appendChild(instanceCountSpan);
};