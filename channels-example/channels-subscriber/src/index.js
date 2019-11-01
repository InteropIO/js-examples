Glue({
  agm: true,
}).then(glue => {
  // Convenient way of using glue throughout your application
  window.glue = glue

  const sendButtonElement = document.getElementById('sendButton')
  const symbolNameElement = document.getElementById('symbolName')

  glue.channels.subscribe(data => {
    symbolNameElement.textContent = data.symbol
  })

  // the subscriber app becomes a publisher app itself when the send button is clicked
  sendButtonElement.onclick = () => {
    const match = symbolNameElement.textContent.match(/\((.*)\)/)

    if (match) {
      glue.channels.publish({ ric: match[1] })
    }
  }

  glue.channels.changed(newChannel => {
    if (!newChannel) {
      // handle the case where your app is not joined to any channel
      // (e.g., the user has deselected the current channel)
      console.log('INFO: your app is not joined to any channel')
    } else {
      // handle the case where you have switched to another channel
      console.log('INFO: switched to channel with name: ', glue.channels.current())
    }
  })
})
