# Flydown Demo

This is a basic project demonstrating the flydown window functionality in **Glue42 Desktop**.

## Running the Project

1. Open a command prompt in the project directory and run:

```cmd
npm install
```

2. In the same directory, run:

```cmd
npm start
```

This will start a local server on port 4445.

3. Copy the configuration files from the `app-config` directory and paste them in the `%LocalAppData%\Tick42\UserData\<REG-ENV>\apps` folder of **Glue42 Desktop**, where `<REG-ENV>` should be replaced with the region and environment of your **Glue42 Desktop** copy (e.g., `TICK42-DEMO`).

4. Start **Glue42 Desktop** and start the Flydown Demo application from the Glue42 Toolbar. It is important to start **Glue42 Desktop** *after* you start the server and place the configuration files, because this example relies on **Glue42 Desktop** to auto start the window that will be used as a flydown. Otherwise, the flydown window will not show and you will need to restart **Glue42 Desktop** in order for the demo to work properly.

*For more information on flydown windows, visit the **Glue42 Desktop** [documentation](https://docs.glue42.com/glue42-concepts/windows/window-management/javascript/index.html#flydown_windows) site.*