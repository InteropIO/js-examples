Glue({
    agm: true
}).then((glue) => {
    // Convenient way of using glue throughout your application
    window.glue = glue;

    const instrumentList = document.getElementById("instrumentList");
    const instruments = ["Apple (APPL)", "Google (GOOGL)", "Microsoft (MSFT)"];

    instruments.forEach((instrument) => {
        const instrumentElement = document.createElement("li");

        instrumentElement.textContent = instrument;
        instrumentList.appendChild(instrumentElement);

        instrumentElement.addEventListener("click", () => {
            // Invoking the method registered in the Instrument list application
            glue.agm.invoke("ShowInstrumentDetails", { name: instrument });
        })
    })

    const requestHandler = (request) => {
        // Accepts the subscriber on a specific branch. In this way multiple apps can subscribe for the same stream and receive different data
        request.acceptOnBranch(request.arguments.name);
    };

    const generatePriceNoise = () => {
        const randomNum = Math.random();
        const sign = randomNum > 0.5 ? 1 : -1;

        return Math.random()*100*sign;
    };

    const getPrice = () => {
        return 1000 + generatePriceNoise();
    };

    /* The stream can be registered either with a string (which represents the name of the stream) 
    or with a simple method definition object which has supportsStreaming set to true
    */
    const instrumentPriceStream = {
        name: "InstrumentPrice",
        supportsStreaming: true
    };

    /* 
        Creating a stream and passing a function which will determine how to handle subscription requests
        In this case the function will accept the subscribers on different branches
    */
    glue.agm.createStream(instrumentPriceStream, { subscriptionRequestHandler: requestHandler }).then((stream) => {
        setInterval(() => {
            // branches() returns an array of all available branches
            stream.branches().forEach(b => {
                // Pushing new data on different branches
                b.push({ price: getPrice() });
            })
        }, 1000)
    })
})