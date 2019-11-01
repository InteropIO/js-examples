# Example applications
This is repository contains basic examples of glue-enabled applications. It contains three folders containing the examples and one folder with glue.

### Prerequisites
- Glue Desktop
- node
- npm

### Setup
- clone the repository
- copy the `.json` config files from the application folders (look at the configuration locations [below](#configurations-locations))
- put them in the GD application configuration folder (`%LocalAppData%\Tick42\GlueDesktop\config\apps`) 
- open a terminal
- in the terminal write `npm install` to install all dependencies 
- write `npm run start` to host the applications.
        
 Now you should be able to start all registered applications from the GD app manager.

#### Configurations locations
These are the locations of all configuration files
-  `./app-management-example/app-management-example.json`
-  `./interop-example/instrument-details/instrument-details-example.json`
-  `./interop-example/instrument-list/instrument-list-example.json`
-  `./shared-context-example/publisher/shared-context-publisher.json`
-  `./shared-context-example/subscriber/shared-context-subscriber.json`
-  `./streaming/basic-streaming-subscriber.json`
  
## Interop example

This example contains two applications which use *methods* and *streams* to communicate.

### Instrument details

Application which:

- registers *ShowInstrumentDetails* which visualizes the data sent from Instrument list
- subscribes for *InstrumentPrice* and visualizes the received data

### Instrument list

Application which:

- invokes *ShowInstrumentDetails* when an instrument is clicked
- creates the stream *InstrumentPrice*
- accepts different subscribers on different branches and pushes different data to them

## Application management example

This is an example application which uses the glue.appManager api to start and list applications.

### App Management Example

Application which:

- lists the names of all registered applications
- lists the instances of the currently running applications
- starts application instances
- listens for any added or removed applications
- listens for any started or stopped instances of applications


## Channels Example

This example contains two applications which use *channels* API.
You can open two instances of the subscriber app and keep them on different channels and play around with the interactions

### Channels publisher app

- lists some symbols
- publishes symbol name to channel when a symbol is clicked
- the publisher app becomes a subscriber in it's turn by showing info coming from subscriber app

### Channels subscriber app

- subscribes to channel and displays data passed in
- the subscriber app becomes a publisher app itself when the **Send back via channels API** button is clicked

## Shared Contexts example
This is a basic example of two applications that use the contexts api to communicate.
### Publisher
Application which creates the *ExampleContext* context and changes it every second.
### Subscriber
Application which listens for changes in *ExampleContext* and visualizes it.

## Streaming example
Basic example which listens for a stream and logs the received data