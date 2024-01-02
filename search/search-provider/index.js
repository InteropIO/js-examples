const clientsURL = "http://localhost:22060/clients";
const searchTypes = {
    actions: {
        name: "actions",
        displayName: "Actions"
    },
    workspaces: {
        name: "workspaces",
        displayName: "Workspaces"
    },
    clients: {
        name: "clients",
        displayName: "Clients"
    }
};
const actions = [
    {
        name: "restart",
        displayName: "Restart io.Connect Desktop"
    },
    {
        name: "switchTheme",
        displayName: "Switch the Theme"
    }
];

let results = [];

/** SET UP THE APP **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
    // Initialize the io.Connect library.
    await initializeIOConnect().catch(console.error);

    // Register the Interop methods that will be used as actions for the result items.
    await registerInteropMethods();

    // Register the search provider.
    await registerSearchProvider().catch(console.error);

    io.windows.my().onRefreshing(prevent => prevent());

    // Register a keyboard shortcut for showing the Search App.
    const handler = () => io.appManager.application("search-bar").start();

    await io.hotkeys.register("ctrl+shift+s", handler);
};

/** INITIALIZATION **/
async function initializeIOConnect() {
    // Initializing the io.Connect library and enabling the Search API.
    const config = {
        libraries: [IOSearch, IOWorkspaces],
        layouts: "full"
    };

    window.io = await IODesktop(config);
};

/** REGISTER THE SEARCH PROVIDER **/
async function registerSearchProvider() {
    const providerConfig = {
        name: "search-provider",
        types: [searchTypes.actions, searchTypes.workspaces, searchTypes.clients]
    };

    const provider = await io.search.registerProvider(providerConfig);

    provider.onQuery(handleQuery);
};

/** HANDLE QUERIES **/
async function handleQuery({
    search,
    types,
    providerLimits,
    sendResult,
    error,
    done
}) {
    results = [];

    await Promise.all(
        types.map(async (t) => {
            await searchByType(t.name, search, providerLimits);
        })
    );

    if (results.length !== 0) {
        results.forEach(sendResult);

        done();
    } else {
        error("No results found. Try something else.")
    };
};

async function searchByType(type, search, providerLimits) {
    switch (type) {
        case "clients":
            return await searchClients(search, providerLimits).catch(console.error);

        case "workspaces":
            return await searchWorkspaces(search, providerLimits).catch(console.error);

        case "actions":
            return await searchActions(search, providerLimits).catch(console.error);
    };
};

async function searchClients(search, providerLimits) {
    // Limit for returned results.
    let limit = providerLimits.maxResultsPerType;

    //Getting the clients from the DB.
    const clients = (await getClients().catch(console.error)).map((c) => {
        return {
            clientId: c._id,
            displayName: c.displayName
        };
    });

    // Searching through the clients.
    clients.every(({displayName, clientId }) => {
        if (displayName.toLowerCase().includes(search)) {
            const result = {
                type: searchTypes.clients,
                displayName,
                action: {
                    method: "OpenClientContact",
                    params: {
                        clientId
                    }
                }
            };

            results.push(result);
            limit--;
        };

        return limit === 0 ? false : true;
    });
};

async function searchWorkspaces(search, providerLimits) {
    // Limit for returned results.
    let limit = providerLimits.maxResultsPerType;

    // Getting all Workspace Layouts.
    const workspaces = await io.layouts.getAll("Workspace");

    // Searching through the Workspaces.
    workspaces.every((w) => {
        if (w.name.toLowerCase().includes(search)) {
            const result = {
                type: searchTypes.workspaces,
                displayName: w.name,
                action: {
                    method: "RestoreWorkspace",
                    params: {
                        name: w.name
                    }
                }
            };

            results.push(result);
            limit--;
        };

        return limit === 0 ? false : true;
    });
};

async function searchActions(search, providerLimits) {
    // Limit for returned results.
    let limit = providerLimits.maxResultsPerType;

    // Searching through the actions.
    actions.every((a) => {
        if (a.name.toLowerCase().includes(search)) {
            const result = {
                type: searchTypes.actions,
                displayName: a.displayName,
                action: {
                    method: "ExecuteAction",
                    params: {
                        name: a.name
                    }
                }
            };

            results.push(result);
            limit--;
        };

        return limit === 0 ? false : true;
    });
};

/** REGISTER INTEROP METHODS FOR RESULT ACTIONS **/
async function registerInteropMethods() {
    await io.interop.register("OpenClientContact", (args) => {
        io.appManager.application("channelsclientcontact").start(args);
    });

    await io.interop.register("RestoreWorkspace", (args) => {
        io.workspaces.restoreWorkspace(args.name);
    });

    await io.interop.register("ExecuteAction", async (args) => {
        switch (args.name) {
            case "restart":
                return io.appManager.restart();

            case "switchTheme":
                const theme = await io.themes.getCurrent();

                return io.themes.select(theme.name === "dark" ? "light" : "dark");
        };
    });
};

/** HELPERS **/
async function getClients() {

    let clientsFromDB;
    let response;

    try {
        response = await fetch(clientsURL);
    } catch (error) {
        console.error(error.message);
        return;
    };

    if (response.ok) {
        clientsFromDB = await response.json();
    } else {
        console.error("Error when fetching the clients from the database!");
        return;
    };

    return clientsFromDB;
};