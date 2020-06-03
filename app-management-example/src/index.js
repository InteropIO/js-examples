let appItemTemplate;
let instanceItemTemplate;
let appContainer;
let instanceContainer;

window.addEventListener("DOMContentLoaded", async () => {
    
    // Create DOM element templates for the apps and instances.
    createListItemTemplates();
    
    appContainer = document.getElementById("app-container");
    instanceContainer = document.getElementById("instance-list");

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    // Handle adding and removing apps and instances.
    setupAppAndInstanceEvents();
    
    // Start the selected app from the "Availbale Applications" list.
    appContainer.addEventListener("click", openApp);
});

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    // Initializing the Glue42 library with `appManager:"full"`
    // in order to be able to use the complete Application Management API.
    window.glue = await Glue({ appManager: "full" });
};

/** HANDLE APP & INSTANCE EVENTS TO UPDATE THE LISTS **/
function setupAppAndInstanceEvents() {
    glue.appManager.onAppAdded(updateAppList);
    glue.appManager.onAppRemoved(updateAppList);
    glue.appManager.onInstanceStarted(addInstanceToList);
    glue.appManager.onInstanceStopped(removeInstanceFromList);
};

/** HELPER FUNCTIONS **/
function openApp(event) {
    const appName = event.target.id; 

    // Start an application by name.
    glue.appManager.application(appName).start();
};

function updateAppList(app) {
    const appToRemove = document.getElementById(app.name);

    // Show only the apps visible in the App Manager.
    if (app.hidden === false) {
        // If an app is not in the list, add it, otherwise - remove it.
        if (!appToRemove) {
            const appToAdd = appItemTemplate.cloneNode(true);
    
            appToAdd.id = app.name;
            appToAdd.textContent = app.title;
            appContainer.appendChild(appToAdd);
        } else {
            appContainer.removeChild(appToRemove);
        };
    };
};

function addInstanceToList(instance) {
    const existingInstanceItem = document.getElementById(`${instance.application.name}-instance`);

    // Show only the instances of apps that are visible in the App Manager.
    if (instance.application.hidden === false) {

        // If the instance is not on the list, add it, otherwise - increment its count.
        if (!existingInstanceItem) {
            const instanceToAdd = instanceItemTemplate.cloneNode(true);
            const instanceNameItem = instanceToAdd.querySelector("span[name=\"instance\"]");
            const instanceCountItem = instanceToAdd.querySelector("span[name=\"count\"]");
    
            instanceToAdd.id = `${instance.application.name}-instance`;
            instanceNameItem.innerText = instance.application.title;
            instanceCountItem.innerText = instance.application.instances.length;
    
            instanceContainer.appendChild(instanceToAdd);

        } else {
            const instanceCountItem = existingInstanceItem.querySelector("span[name=\"count\"]");
            instanceCountItem.innerText = instance.application.instances.length;
        }
    }
    
};

function removeInstanceFromList(instance) {
    if (instance.application.hidden === false) {
        const instanceToRemove = document.getElementById(`${instance.application.name}-instance`);

        // Get the current count of the application instances.
        const instanceCount = instance.application.instances.length;

        // If this is the last application instance, remove it from the list,
        // otherwise - decrement its count.
        if (instanceCount === 0) {
            instanceToRemove.remove();
        } else {
            const instanceCountItem = instanceToRemove.querySelector("span[name=\"count\"]");
            instanceCountItem.innerText = instanceCount;
        };
    }
};

function createListItemTemplates() {
    appItemTemplate = document.createElement("button");
    appItemTemplate.classList.add("list-group-item", "list-group-item-action")
    
    instanceItemTemplate = document.createElement("li");
    instanceItemTemplate.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    const instanceNameSpan = document.createElement("span");
    instanceNameSpan.setAttribute("name", "instance");

    const instanceCountSpan = document.createElement("span");
    instanceCountSpan.classList.add("badge", "badge-primary", "badge-pill");
    instanceCountSpan.setAttribute("name", "count");

    instanceItemTemplate.appendChild(instanceNameSpan);
    instanceItemTemplate.appendChild(instanceCountSpan);
};