const { app, BrowserWindow, Menu, dialog } = require("electron");
const path = require("node:path");

const APP_NAME = "Task Calendar";
const isMac = process.platform === "darwin";

app.setName(APP_NAME);

if (process.env.CALENDAR_USER_DATA_DIR) {
  app.setPath("userData", path.resolve(process.env.CALENDAR_USER_DATA_DIR));
}

function getTargetWindow(browserWindow) {
  return browserWindow || BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0] || null;
}

function triggerRendererAction(action, browserWindow) {
  const targetWindow = getTargetWindow(browserWindow);
  if (!targetWindow) return;

  const script = `
    (() => {
      const actionButtons = {
        newTask: "newTaskButton",
        importTasks: "importButton",
        exportTasks: "exportButton",
        resetDemoData: "resetDemoButton"
      };
      const button = document.getElementById(actionButtons[${JSON.stringify(action)}]);
      if (!button) return false;
      button.click();
      return true;
    })()
  `;

  targetWindow.webContents.executeJavaScript(script).catch((error) => {
    console.error(`Failed to run renderer action "${action}":`, error);
  });
}

function toggleDevTools(browserWindow) {
  const targetWindow = getTargetWindow(browserWindow);
  if (targetWindow) targetWindow.webContents.toggleDevTools();
}

function showAboutDialog(browserWindow) {
  const targetWindow = getTargetWindow(browserWindow);
  dialog.showMessageBox(targetWindow, {
    type: "info",
    title: `About ${APP_NAME}`,
    message: APP_NAME,
    detail: [
      "A local desktop task calendar prototype.",
      "",
      `Version ${app.getVersion()}`,
      `Electron ${process.versions.electron}`
    ].join("\n"),
    buttons: ["OK"]
  });
}

function handleWindowShortcut(event, input, browserWindow) {
  if (input.type !== "keyDown") return;

  const key = String(input.key || "").toLowerCase();
  const isCommand = isMac ? input.meta : input.control;

  if (input.key === "F12" || (isCommand && input.shift && key === "i")) {
    event.preventDefault();
    toggleDevTools(browserWindow);
    return;
  }

  if (!isCommand || input.shift || input.alt) return;

  const actions = {
    n: "newTask",
    i: "importTasks",
    e: "exportTasks"
  };

  if (actions[key]) {
    event.preventDefault();
    triggerRendererAction(actions[key], browserWindow);
    return;
  }

  if (key === "r") {
    event.preventDefault();
    browserWindow.reload();
    return;
  }

  if (key === "q") {
    event.preventDefault();
    app.quit();
  }
}

function createApplicationMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "New Task",
          accelerator: "CmdOrCtrl+N",
          click: (_menuItem, browserWindow) => triggerRendererAction("newTask", browserWindow)
        },
        {
          label: "Import Tasks",
          accelerator: "CmdOrCtrl+I",
          click: (_menuItem, browserWindow) => triggerRendererAction("importTasks", browserWindow)
        },
        {
          label: "Export Tasks",
          accelerator: "CmdOrCtrl+E",
          click: (_menuItem, browserWindow) => triggerRendererAction("exportTasks", browserWindow)
        },
        { type: "separator" },
        {
          label: "Reset Demo Data",
          click: (_menuItem, browserWindow) => triggerRendererAction("resetDemoData", browserWindow)
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: isMac ? "Cmd+Q" : "Ctrl+Q",
          click: () => app.quit()
        }
      ]
    },
    {
      label: "View",
      submenu: [
        { label: "Reload", accelerator: "CmdOrCtrl+R", role: "reload" },
        {
          label: "Toggle Developer Tools",
          accelerator: "CmdOrCtrl+Shift+I",
          click: (_menuItem, browserWindow) => toggleDevTools(browserWindow)
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: `About ${APP_NAME}`,
          click: (_menuItem, browserWindow) => showAboutDialog(browserWindow)
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 720,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.webContents.on("before-input-event", (event, input) => handleWindowShortcut(event, input, mainWindow));

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createApplicationMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
