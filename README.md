# JavaScript Examples for Glue42 Enterprise

This repository contains basic examples of Glue42 enabled applications.

*For more information on Glue42 Enterprise, visit the official product site [glue42.com](https://glue42.com/) or see the [product documentation](https://docs.glue42.com).*

## Prerequisites

- Glue42 Enterprise
- node
- npm

## Setup

- Clone the repository.
- Copy all (or only of the examples you are interested in) `.json` application configuration files from the application folders and paste them in the **Glue42 Enterprise** application configuration folder (`%LocalAppData%\Tick42\UserData\<ENV>-<REG>\apps` where you must replace `<ENV>-<REG>` with the region and environment folder name used for the deployment of your **Glue42 Enterprise** - e.g., `T42-DEMO`).  
- Open a command prompt in the base repo directory and run `npm install` to install all dependencies. 
- Run `npm start` to start a server at port 4242 where the applications will be hosted.
- Start **Glue42 Enterprise**. 

Now you should be able to start all registered applications from the **Glue42 Enterprise** App Manager Toolbar.

## Examples

### Interop Example

This example contains two applications which use *methods* and *streams* to communicate.

#### Instrument Details

Application which:

- registers *ShowInstrumentDetails* which visualizes the data sent from Instrument list;
- subscribes for *InstrumentPrice* and visualizes the received data;

#### Instrument List

Application which:

- invokes *ShowInstrumentDetails* when an instrument is clicked;
- creates the stream *InstrumentPrice*;
- accepts different subscribers on different branches and pushes different data to them;

### Application Management Example

This is an example application which uses the Application Management API to start and list applications.

- lists the names of all registered applications
- lists the instances of the currently running applications
- starts application instances
- listens for any added or removed applications
- listens for any started or stopped instances of applications

### Channels Example

This example contains two applications which use the Channels API.
You can open two instances of the subscriber app and keep them on different channels and play around with the interactions.

#### Channels Publisher App

- lists some symbols;
- publishes the symbol name to the channel when a symbol is clicked;
- the publisher app in turn becomes a subscriber by showing info coming from the subscriber app;

#### Channels Subscriber App

- subscribes to a channel and displays data passed to it;
- the subscriber app becomes a publisher app itself when the **Send back via the Channels API** button is clicked;

### Shared Contexts Example

This is a basic example of two applications that use the Shared Contexts API to communicate.

#### Publisher

Application which creates the *ExampleContext* context and changes it every second.

#### Subscriber

Application which listens for changes in *ExampleContext* and visualizes it.

### Streaming Example

Basic example which listens for a stream and logs the received data.
Make sure you run the Sample Price Publisher app first located [here](https://github.com/Tick42/g4e-tutorial/tree/master/support).

### Pub/Sub Example

Basic example which publishes messages on a topic and subscribes for messages published on that topic.

### Flydown Example

Demo app demonstrating the flydown window functionality in **Glue42 Enterprise**.

#### Flydown App

The app that will trigger the flydown window.

#### Flydown Window

The window that will be used as a flydown window.

### Popup Example

Demo app demonstrating the popup window functionality in **Glue42 Enterprise**.

#### Popup App

The app that will trigger the popup window.

#### Popup Window

The window that will be used as a popup window.