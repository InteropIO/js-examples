Glue({
  agm: true,
}).then(glue => {
  // Convenient way of using glue throughout your application
  window.glue = glue

  const symbolListElement = document.getElementById('symbolList')
  const infoFromSubscriberElement = document.getElementById(
    'infoFromSubscriber'
  )
  const errorElement = document.getElementById('error')

  const symbols = ['Apple (APPL)', 'Google (GOOGL)', 'Microsoft (MSFT)']

  symbols.forEach(symbol => {
    const symbolElement = document.createElement('li')
    symbolElement.textContent = symbol
    symbolElement.onclick = () => {
      // Each time we click on a symbol we will update the context of the current channel with publish method
      // any subscribers to that channel will receive updated data
      errorElement.textContent = ''

      try {
        glue.channels.publish({ symbol }).then(() => {
          console.log(
            'Successfully pushed data to channel with name: ',
            glue.channels.current()
          )
        })
      } catch (error) {
        // try catch used since there was a bug as of time of writing, should use catch of the promise instead
        errorElement.textContent = error
      }
    }

    symbolListElement.appendChild(symbolElement)
  })

  // the publisher app becomes a subscriber in it's turn by showing info coming from subscriber app
  glue.channels.subscribe(data => {
    if (data.ric) {
      infoFromSubscriberElement.textContent = data.ric
    }
  })

  glue.channels.changed(newChannel => {
    if (!newChannel) {
      // handle the case where your app is not joined to any channel
      // (e.g., the user has deselected the current channel)
      console.log('INFO: your app is not joined to any channel')
    } else {
      // handle the case where you have switched to another channel
      console.log(
        'INFO: switched to channel with name: ',
        glue.channels.current()
      )
    }
  })
})
