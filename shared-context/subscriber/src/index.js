Glue({
    contexts: true
}).then((glue) => {
    // Convenient way of using glue throughout your app
    window.glue = glue;

    const contextValue = document.getElementById("contextValue");

    // Listening for changes in ExampleContext
    glue.contexts.subscribe("ExampleContext", (data) => {
        contextValue.textContent = JSON.stringify(data);
    })
})