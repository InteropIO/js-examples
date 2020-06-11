/** SET UP THE APPLICATION **/
window.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {

    // Initialize the Glue42 library.
    await initializeGlue42()
        .catch(error => { 
            console.error(error); 
            return 
        });
};

/** INITIALIZE GLUE42 **/
async function initializeGlue42() {
    window.glue = await Glue();
};