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

### Application Management Example

This is an example application which uses the Application Management API to start and list applications.

- lists the names of all registered applications visible in the App Manager;
- lists the instances of the currently running applications visible in the App Manager;
- starts application instances;
- listens for any added or removed applications;
- listens for any started or stopped instances of applications;

### Channels Example

This example contains two applications which use the Channels API. You can open more than one instance of the subscriber app to use different channels.

#### Channels Publisher

After selecting a channel, you an publish any data to the current channel or to any other channel.

#### Channels Subscriber

Select a channel from the Channel Selector UI or join/leave channels programmatically. Get the context of any channel. The context data of the current channel is also displayed in the app.

### Flydown Example

Demo app demonstrating the flydown window functionality in **Glue42 Enterprise**.

#### Flydown App

The app that will trigger the flydown window.

#### Flydown Window

The window that will be used as a flydown window.

### Interop Example

This example contains two applications which use an Interop method to communicate.

#### Company Details

Registers an Interop method that will show details about a selected company from the Company List app.

#### Company List

Select a company from the list to invoke the Interop method that will show details about the selected company in the Company Details app.

### Interop Streaming Example

Basic Interop Streaming example consisting of an Interop Publisher and an Interop Subscriber app.

#### Interop Publisher

Creates a stream and handles stream subscriptions. Shows publishing stream data to all subscribers and to a specific stream branch.

#### Interop Subscriber

Subscribes to a stream and shows the received stream data.

### Popup Example

Demo app demonstrating the popup window functionality in **Glue42 Enterprise**.

#### Popup App

The app that will trigger the popup window.

#### Popup Window

The window that will be used as a popup window.

### Pub/Sub Example

Basic example which publishes messages on a topic and subscribes for messages published on that topic.

### Shared Contexts Example

Example of manipulating a context object that holds information about the current theme of **Glue42 Enterprise**.

### Window Management Example

Example of controlling the current or other Glue42 Windows.

#### My Window

Application demonstrating controlling the current Glue42 Window.

#### Window Manipulation

Application demonstrating opening and controlling Glue42 Windows.