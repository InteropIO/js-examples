Glue({}).then((glue) => {
    window.glue = glue;

    setInterval(() => {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
    
        glue.bus.publish('time', {
            hours,
            minutes,
            seconds
        })
    }, 1000);
});
