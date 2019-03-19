Glue({}).then((glue) => {
    window.glue = glue;

    glue.bus.subscribe('time', (data) => {
        document.getElementById('clock').innerHTML = `${data.hours} ${data.minutes} ${data.seconds}`
    });
});
