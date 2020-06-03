// initializing the Glue42 library
Glue().then(glue => {     
    window.glue = glue;

    //reference to the window that will be used as a flydown
    const flydown = glue.windows.find("flydown");

    // reference to this window
    const myWindow = glue.windows.my();

    // unique flydown trigger zone identifiers
    const zoneIDs = {
        left: "leftZone",
        top: "topZone",
        right: "rightZone",
        bottom: "bottomZone"
    }

    // reference to the visual zones in the app
    const zones = {
        left: document.getElementsByClassName("vertical-zone")[0],
        top: document.getElementsByClassName("horizontal-zone")[0],
        right: document.getElementsByClassName("vertical-zone")[1],
        bottom: document.getElementsByClassName("horizontal-zone")[1],
    }

    // calculation of the flydown trigger zones bounds
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

    // creating the flydown window
    myWindow.createFlydown(
        {
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
        }
    ).then(console.log(`Flydown created at ${new Date().toLocaleTimeString()}.`));
});