let appItemTemplate;
let instanceItemTemplate;
let appContainer;
let instanceList;

window.addEventListener("DOMContentLoaded", async () => {
    appItemTemplate = document.getElementById("app-item-template");
    instanceItemTemplate = document.getElementById("instance-item-template");
    appContainer = document.getElementById("app-container");
    instanceList = document.getElementById("instance-list");

    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });

    listAppsAndInstances();
    setupAppEvents();
    setupInstanceEvents();
    
    appContainer.addEventListener("click", openApp);
});

async function initializeGlue42() {
    window.glue = await Glue({ appManager: "full" });
};

function listAppsAndInstances() {
    const availableApps = glue.appManager.applications().filter(filterHiddenApps);
    const runningInstances = glue.appManager.instances();
    
    availableApps.forEach(app => {
        const appItem = appItemTemplate.cloneNode(true);
        
        appItem.id = app.name;
        appItem.textContent = app.title;

        appContainer.appendChild(appItem);
    });
};

function setupAppEvents() {

};

function setupInstanceEvents() {

};

function openApp(event) {
    const appName = event.target.id; 

    glue.appManager.application(appName).start();
};

function filterHiddenApps(app) {
    return app.hidden === false;
}