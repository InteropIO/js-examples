Glue({}).then((glue) => {
    window.glue = glue;
    const symbol ="VOD.L";
    const options = {
        arguments: {
            Symbol: symbol
        }
    };
    const streamName = 'T42.MarketStream.Subscribe';
    const streamNameElement = document.getElementById("streamName").textContent= streamName;
    const symbolNameElement = document.getElementById("symbolName");
    symbolNameElement.textContent= symbol;
    streamNameElement.textContent= streamName;
    const bidValue = document.getElementById("bidValue");
    const askValue = document.getElementById("askValue");
    glue.agm.subscribe(streamName, options).then((streamSubscription) => {
        // Listening for information pushed on the stream
        window.streamSubscription=streamSubscription;
        streamSubscription.onData((msg)=>{
           const payload = msg.data;
           bidValue.textContent= payload.image.BID
           askValue.textContent= payload.image.ASK
        });
    });
})
