/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => {
            console.error(error);
            return
        });

    // Reference to the visual flydown zones in the app.
    const zones = {
        left: document.getElementById("left-zone"),
        top: document.getElementById("top-zone"),
        right: document.getElementById("right-zone"),
        bottom: document.getElementById("bottom-zone"),
    }

    // Calculation of the flydown trigger zones bounds.
    const zonesBounds = {
        leftZone: {
            left: 0,
            top: Math.round(zones.top.getBoundingClientRect().height),
            width: Math.round(zones.left.getBoundingClientRect().width),
            height: Math.round(zones.left.getBoundingClientRect().height)
        },
        topZone: {
            left: 0,
            top: 0,
            width: Math.round(zones.top.getBoundingClientRect().width),
            height: Math.round(zones.top.getBoundingClientRect().height)
        },
        rightZone: {
            left: Math.round(window.innerWidth - zones.right.getBoundingClientRect().width),
            top: Math.round(zones.top.getBoundingClientRect().height),
            width: Math.round(zones.right.getBoundingClientRect().width),
            height: Math.round(zones.right.getBoundingClientRect().height)
        },
        bottomZone: {
            left: 0,
            top: Math.round(window.innerHeight - zones.bottom.getBoundingClientRect().height),
            width: Math.round(zones.bottom.getBoundingClientRect().width),
            height: Math.round(zones.bottom.getBoundingClientRect().height)
        }
    }
    
    // Unique flydown trigger zone identifiers.
    const zoneIDs = {
        left: "leftZone",
        top: "topZone",
        right: "rightZone",
        bottom: "bottomZone"
    }

    // Create a flydown window.
    createFlydownWindow(zonesBounds, zoneIDs);
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};

/** CREATE A FLYDOWN **/
async function createFlydownWindow(zonesBounds, zoneIDs) {
    //Reference to the window that will be used as a flydown.
    const flydown = glue.windows.find("flydown");
    
    // Reference to this window.
    const myWindow = glue.windows.my();

    // Options object for the flydown.
    const flydownOptions = {
        windowId: flydown.id,
        size: {
            width: 250,
            height: 50
        },
        horizontalOffset: 10,
        verticalOffset: 10,
        zones: [
            {
                id: zoneIDs.left,
                bounds: zonesBounds.leftZone,
                targetLocation: "left",
            },
            {
                id: zoneIDs.top,
                bounds: zonesBounds.topZone,
                targetLocation: "top"
            },
            {
                id: zoneIDs.right,
                bounds: zonesBounds.rightZone,
                targetLocation: "right"
            },
            {
                id: zoneIDs.bottom,
                bounds: zonesBounds.bottomZone,
                targetLocation: "bottom"
            }
        ]
    };
    
    // Creating the flydown window.
    await myWindow.createFlydown(flydownOptions);
    console.log(`Flydown created at ${new Date().toLocaleTimeString()}.`);
};