# JavaScript Examples for io.Connect Desktop

This repository contains basic examples of io.Connect enabled apps.

*For more information on **io.Connect Desktop**, visit the [official io.Connect product site](https://interop.io/products/io-connect/) or see the **io.Connect Desktop** [documentation](https://docs.interop.io/).*

## Prerequisites

- [**io.Connect Desktop**](https://interop.io/products/io-connect/)
- node
- npm

## Setup

- Clone the repository.
- Copy the `js-examples.json` configuration file and paste it in the **io.Connect Desktop** app configuration folder located at `%LocalAppData%\interop.io\io.Connect Desktop\<ENV>-<REG>\apps`, where `<ENV>-<REG>` represents the environment and region of **io.Connect Desktop** (e.g., DEMO-INTEROP.IO).
- Open a command prompt in the base repo directory and run `npm install` to install all dependencies.
- Run `npm start` to start a server at port 4242 where the apps will be hosted.
- Start **io.Connect Desktop**.

Now you will be able to start all example apps from the **io.Connect Desktop** launcher. All examples are grouped in the "JavaScript Examples" folder.

## Examples

### App Management

This example app uses the [App Management API](https://docs.interop.io/desktop/capabilities/app-management/javascript/index.html) to start and list apps and app instances:

- lists the names of all registered visible apps;
- lists the instances of the currently running visible apps;
- starts app instances;
- listens for any added or removed apps;
- listens for any started or stopped instances of apps;

### App Preferences

This example demonstrates how to use the [App Preferences API](https://docs.interop.io/desktop/capabilities/app-preferences/javascript/index.html) to save, update and retrieve custom app preferences for the current user.

### Channels

This example contains two apps which use the [Channels API](https://docs.interop.io/desktop/capabilities/data-sharing/channels/javascript/index.html). You can open more than one instance of the subscriber app to use different Channels.

#### Channels Publisher

After selecting a Channel, you can publish any data to the current Channel or to any other Channel.

#### Channels Subscriber

Select a Channel from the Channel Selector UI or join/leave Channels programmatically. Get the context of any Channel. The context data of the current Channel is also displayed in the app.

### Flydown

App demonstrating the [flydown window functionality](https://docs.interop.io/desktop/capabilities/windows/window-management/javascript/index.html#flydown_windows) in **io.Connect Desktop**.

#### Flydown App

The app that will trigger the flydown window.

#### Flydown Window

The window that will be used as a flydown window.

### Intents

This example contains two apps that use the [Intents API](https://docs.interop.io/desktop/capabilities/intents/javascript/index.html).

#### Client List

Select a client to start the Client Portfolio app with the selected client as its context. If the Client Portfolio app is already running, selecting a client will update its context.

#### Client Portfolio

This app is registered as an Intent handler and will be started when you select a client in the Client List app, or if already running, its context will be updated and it will show the selected client's portfolio.

### Interop Request/Response

This example contains two apps which use the [Interop API](https://docs.interop.io/desktop/capabilities/data-sharing/interop/javascript/index.html) to communicate.

#### Interop Request

Select a company from the list to [invoke an Interop method](https://docs.interop.io/desktop/capabilities/data-sharing/interop/javascript/index.html#method_invocation) registered by the Interop Response app.

#### Interop Response

[Registers an Interop method](https://docs.interop.io/desktop/capabilities/data-sharing/interop/javascript/index.html#method_registration) that will show details about the selected company in the Interop Request app.

### Interop Streaming

Basic [Interop Streaming](https://docs.interop.io/desktop/capabilities/data-sharing/interop/javascript/index.html#streaming) example consisting of an Interop Publisher and an Interop Subscriber apps.

#### Interop Publisher

Creates a stream and handles stream subscriptions. Shows publishing stream data to all subscribers and to a specific stream branch.

#### Interop Subscriber

Subscribes to a stream and shows the received stream data. You can open more than one Interop Subscriber instance to test various streaming scenarios.

### Popup

App demonstrating the [popup window functionality](https://docs.interop.io/desktop/capabilities/windows/window-management/javascript/index.html#popup_windows) in **io.Connect Desktop**.

#### Popup App

The app that will trigger the popup window.

#### Popup Window

The window that will be used as a popup window.

### Pub/Sub

Two apps using the [Pub/Sub API](https://docs.interop.io/desktop/capabilities/data-sharing/pub-sub/javascript/index.html) to communicate.

#### Publisher

Publishes data on a topic.

#### Subscriber

Subscribes for data on a topic.

### Search

Two apps using the [Search API](https://docs.interop.io/desktop/capabilities/search/javascript/index.html) to register a search provider and create search queries.

#### Search Bar

Open the Search Bar from the **io.Connect Desktop** launcher or by pressing `CTRL + SHIFT + S`. Type and press the "Search" button or `Enter` to search. Press `Esc` or the "Close" button to hide the Search Bar. The Search Bar will hide also when it loses focus. Selecting an action from the results, will execute it; selecting a Workspace, will open it; selecting a client, will open the **io.Connect Desktop** Client Contact demo app showing info about the selected client.

#### Search Provider

Starts automatically as a hidden service app and registers itself as a search provider for actions, Workspaces and clients. Registers a shortcut for opening the Search bar and Interop methods for executing actions when the user clicks a result in the Search Bar.

### Shared Contexts

Two apps that use the [Shared Contexts API](https://docs.interop.io/desktop/capabilities/data-sharing/shared-contexts/javascript/index.html) to communicate.

#### Client List

Selecting a client in the app updates a shared context object with the client ID.

#### Client Portfolio

Subscribes for context updates and shows the selected client's portfolio based on the updated client ID in the shared context object.

### Themes

This example demonstrates using the [Themes API](https://docs.interop.io/desktop/capabilities/windows/themes/javascript/index.html) to get all available themes, get the current theme, select a theme and subscribe for theme change events.

### Window Management

Example of controlling the current or other io.Connect Windows using the [Window Management API](https://docs.interop.io/desktop/capabilities/windows/window-management/javascript/index.html).

#### My Window

App demonstrating controlling the current io.Connect Window.

#### Window Manipulation

App demonstrating opening and controlling io.Connect Windows.