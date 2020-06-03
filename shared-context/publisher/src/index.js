Glue({
    contexts: true
}).then((glue) => {
    // Convenient way of using glue throughout your app
    window.glue = glue;

    // Setting an initial value for ExampleContext (set overrides the previous value of the context)
    return glue.contexts.set("ExampleContext", { counter: 0 });
}).then(() => {
    let counter = 1;

    const counterValue = document.getElementById("counterValue");
    const resetButton = document.getElementById("resetButton");

    resetButton.onclick = () => {
        counter = 1;
    };

    setInterval(() => {
        counterValue.textContent = counter;
        // Changing the value of the ExampleContext (update changes the value of the context without overriding all of its properties)
        glue.contexts.update("ExampleContext", { counter });
        counter++;
    }, 1000);
})