# JavaScript Examples for Glue42 Enterprise

This repository contains basic examples of Glue42 enabled applications.

*For more information on **Glue42 Enterprise**, visit the [official Glue42 product site](https://glue42.com/) or see the **Glue42 Enterprise** [documentation](https://docs.glue42.com).*

## Prerequisites

- [**Glue42 Enterprise**](https://glue42.com/enterprise/)
- node
- npm

## Setup

- Clone the repository.
- Copy the `glue42-js-examples.json` configuration file and paste it in the **Glue42 Enterprise** application configuration folder (`%LocalAppData%\Tick42\UserData\<ENV>-<REG>\apps` where you must replace `<ENV>-<REG>` with the region and environment folder name used for the deployment of your **Glue42 Enterprise** - e.g., `T42-DEMO`).  
- Open a command prompt in the base repo directory and run `npm install` to install all dependencies. 
- Run `npm start` to start a server at port 4242 where the applications will be hosted.
- Start **Glue42 Enterprise**. 

Now you will be able to start all example apps from the **Glue42 Enterprise** Toolbar. All examples are grouped in the "Glue42 JavaScript Examples" folder.

## Examples

### Application Management

This example application uses the [Application Management API](https://docs.glue42.com/glue42-concepts/application-management/javascript/index.html) to start and list applications and application instances:

- lists the names of all registered visible applications;
- lists the instances of the currently running visible applications;
- starts application instances;
- listens for any added or removed applications;
- listens for any started or stopped instances of applications;

### Application Preferences

This example demonstrates how to use the [Application Preferences API](https://docs.glue42.com/glue42-concepts/application-preferences/javascript/index.html) to save, update and retrieve custom application preferences for the current user.

### Channels

This example contains two applications which use the [Channels API](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/channels/javascript/index.html). You can open more than one instance of the subscriber app to use different Channels.

#### Channels Publisher

After selecting a Channel, you can publish any data to the current Channel or to any other Channel.

#### Channels Subscriber

Select a Channel from the Channel Selector UI or join/leave Channels programmatically. Get the context of any Channel. The context data of the current Channel is also displayed in the app.

### Flydown

Demo app demonstrating the [flydown window functionality](https://docs.glue42.com/glue42-concepts/windows/window-management/javascript/index.html#flydown_windows) in **Glue42 Enterprise**.

#### Flydown App

The app that will trigger the flydown window.

#### Flydown Window

The window that will be used as a flydown window.

### Intents

This example contains two applications that use the [Intents API](https://docs.glue42.com/glue42-concepts/intents/javascript/index.html).

#### Client List

Select a client to start the Client Portfolio application with the selected client as its context. If the Client Portfolio application is already running, selecting a client will update its context.

#### Client Portfolio

This application is registered as an Intent handler and will be started when you select a client in the Client List application, or if already running, its context will be updated and it will show the selected client's portfolio.

### Interop Request/Response

This example contains two applications which use the [Interop API](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/interop/javascript/index.html) to communicate.

#### Interop Request

Select a company from the list to [invoke an Interop method](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/interop/javascript/index.html#method_invocation) registered by the Interop Response app.

#### Interop Response

[Registers an Interop method](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/interop/javascript/index.html#method_registration) that will show details about the selected company in the Interop Request app.

### Interop Streaming

Basic [Interop Streaming](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/interop/javascript/index.html#streaming) example consisting of an Interop Publisher and an Interop Subscriber apps.

#### Interop Publisher

Creates a stream and handles stream subscriptions. Shows publishing stream data to all subscribers and to a specific stream branch.

#### Interop Subscriber

Subscribes to a stream and shows the received stream data. You can open more than one Interop Subscriber instance to test various streaming scenarios.

### Popup

Demo app demonstrating the [popup window functionality](https://docs.glue42.com/glue42-concepts/windows/window-management/javascript/index.html#popup_windows) in **Glue42 Enterprise**.

#### Popup App

The app that will trigger the popup window.

#### Popup Window

The window that will be used as a popup window.

### Pub/Sub

Two applications using the [Pub/Sub API](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/pub-sub/javascript/index.html) to communicate.

#### Publisher

Publishes data on a topic.

#### Subscriber

Subscribes for data on a topic.

### Shared Contexts

Two applications that use the [Shared Contexts API](https://docs.glue42.com/glue42-concepts/data-sharing-between-apps/shared-contexts/javascript/index.html) to communicate.

#### Client List

Selecting a client in the app updates a shared context object with the client ID.

#### Client Portfolio

Subscribes for context updates and shows the selected client's portfolio based on the updated client ID in the shared context object.

### Themes

This example demonstrates using the [Themes API](https://docs.glue42.com/glue42-concepts/windows/themes/javascript/index.html) to get all available themes, get the current theme, select a theme and subscribe for theme change events.

### Window Management

Example of controlling the current or other Glue42 Windows using the [Window Management API](https://docs.glue42.com/glue42-concepts/windows/window-management/javascript/index.html).

#### My Window

Application demonstrating controlling the current Glue42 Window.

#### Window Manipulation

Application demonstrating opening and controlling Glue42 Windows.