Glue({
    agm: true
}).then((glue) => {
    // Convenient way of using glue throughout your application
    window.glue = glue;

    const nameElement = document.getElementById("instrumentName");
    const priceElement = document.getElementById("price");
    const getPriceButton = document.getElementById("priceButton");
    const closeSubscriptionButton = document.getElementById("closeButton");

    let subscription;

    const handlePreviousSubscription = () => {
        if (subscription) {
            subscription.close();
            subscription = undefined;
            priceElement.innerHTML = 'Not available';
        }
    };

    /* Streams and methods can be registered either with a string ( the name of the method/stream)
         or with a method definition. This is an example of a simple method definition
    */
    const showInstrumentDetailsMD = {
        name:"ShowInstrumentDetails",
        description:"Method which visualizes the received instrument name and subscribes for its stock price",
        accepts:"String name"
    }

    glue.agm.register(showInstrumentDetailsMD, (args) => {
        // Closing the subscription when a different instrument is selected
        handlePreviousSubscription();

        nameElement.textContent = args.name;
        getPriceButton.onclick = () => {
            // Subscribing for a stream only if there isn't an active subscription
            if (!subscription) {
                // Providing the name of the current instrument so the stream subscription request can be accepted on an appropriate branch
                glue.agm.subscribe("InstrumentPrice", { arguments: { name: nameElement.textContent } }).then((streamSubscription) => {
                    subscription = streamSubscription;
                    // Listening for information pushed on the stream
                    subscription.onData((strData) => {
                        priceElement.textContent = strData.data.price;
                    });
                });
            }
        };

        closeSubscriptionButton.onclick = handlePreviousSubscription;
    });
})