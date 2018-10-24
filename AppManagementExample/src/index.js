Glue({
    appManager: "full"
}).then((glue) => {
    // Convenient way of using glue throughout your application
    window.glue = glue;

    const addAppElement = (app) => {
        const appElement = document.createElement("li");

        appElement.textContent = app.name;
        appElement.setAttribute("id", app.name);
        appElement.onclick = (event) => {
            const clickedAppName = event.srcElement.id;

            // Here the clicked application is started
            glue.appManager.application(clickedAppName).start();
        }

        appsList.appendChild(appElement);
    }

    const appsList = document.getElementById("availableApps");

    // glue.appManager.applications() returns an array of all currently registered applications in GD
    glue.appManager.applications().forEach(addAppElement);

    // Listening for any new apps in GD
    glue.appManager.onAppAdded(addAppElement)

    // Listening for the removing of an app from GD
    glue.appManager.onAppRemoved((app) => {
        const appElement = document.getElementById(app.name);
        appsList.removeChild(appElement);
    })

    const instancesList = document.getElementById("runningInstances");

    // Listening for started instances so they can be added to the list
    glue.appManager.onInstanceStarted((instance) => {
        const instanceElement = document.createElement("li");

        instanceElement.textContent = instance.application.name;
        instanceElement.setAttribute("id", instance.id);

        instanceElement.onclick = (event) => {
            const clickedAppName = event.srcElement.textContent;
            // instances gives you all currently running instances of the specified app
            const clickedInstance = glue.appManager.application(clickedAppName).instances.find((inst) => {
                return inst.id == instance.id;
            });

            // brings the window of the instances to the front and focuses on it
            clickedInstance.activate();
        }

        instancesList.appendChild(instanceElement);
    });

    // Listening for stopped instances so they can be removed from the list
    glue.appManager.onInstanceStopped((instance) => {
        const instanceElement = document.getElementById(instance.id);
        instancesList.removeChild(instanceElement);
    })
})