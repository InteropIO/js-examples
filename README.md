# JavaScript Example Applications

This is repository contains basic examples of Glue42 enabled applications.

*For more information on Glue42 Desktop, visit the official product site [glue42.com](https://glue42.com/) or see the [product documentation](https://docs.glue42.com).*

### Prerequisites

- Glue42 Desktop
- node
- npm

### Setup

- clone the repository
- copy the `.json` config files from the application folders (look at the configuration locations [below](#configurations-locations))
- put them in the Glue42 Desktop application configuration folder (`%LocalAppData%\Tick42\GlueDesktop\config\apps`) 
- open a terminal
- in the terminal run `npm install` to install all dependencies 
- run `npm run start` to host the applications
        
Now you should be able to start all registered applications from the Glue42 Desktop App Manager Toolbar.

## Interop Example

This example contains two applications which use *methods* and *streams* to communicate.

### Instrument Details

Application which:

- registers *ShowInstrumentDetails* which visualizes the data sent from Instrument list
- subscribes for *InstrumentPrice* and visualizes the received data

### Instrument List

Application which:

- invokes *ShowInstrumentDetails* when an instrument is clicked
- creates the stream *InstrumentPrice*
- accepts different subscribers on different branches and pushes different data to them

## Application Management Example

This is an example application which uses the Application Management API to start and list applications.

### App Management Example

Application which:

- lists the names of all registered applications
- lists the instances of the currently running applications
- starts application instances
- listens for any added or removed applications
- listens for any started or stopped instances of applications

## Channels Example

This example contains two applications which use the Channels API.
You can open two instances of the subscriber app and keep them on different channels and play around with the interactions.

### Channels Publisher App

- lists some symbols
- publishes symbol name to channel when a symbol is clicked
- the publisher app in turn becomes a subscriber by showing info coming from the subscriber app

### Channels Subscriber App

- subscribes to a channel and displays data passed to it
- the subscriber app becomes a publisher app itself when the **Send back via channels API** button is clicked

## Shared Contexts Example

This is a basic example of two applications that use the Shared Contexts API to communicate.

### Publisher

Application which creates the *ExampleContext* context and changes it every second.

### Subscriber

Application which listens for changes in *ExampleContext* and visualizes it.

## Streaming Example

Basic example which listens for a stream and logs the received data.
Make sure you run the Sample Price Publisher app first located at the following link: https://github.com/Tick42/g4e-tutorial/tree/master/support

## Pub/Sub Example

Basic example which publishes messages on a topic and subscribes for messages published on that topic.

## Flydown Example

Demo app showing the flydown window functionality in Glue42 Desktop.

## Popup Example

Demo app showing the popup window functionality in Glue42 Desktop.
