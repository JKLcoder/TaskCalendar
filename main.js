const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");

const APP_NAME = "Task Calendar";
const MENU_ACTION_CHANNEL = "task-calendar:menu-action";
const IMPORT_JSON_CHANNEL = "task-calendar:import-json";
const RESTART_AFTER_EMPTY_IMPORT_CHANNEL = "task-calendar:restart-after-empty-import";
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

  targetWindow.webContents.send(MENU_ACTION_CHANNEL, action);
}

async function importTasksFromDialog(browserWindow) {
  const targetWindow = getTargetWindow(browserWindow);
  if (!targetWindow) return;

  const result = await dialog.showOpenDialog({
    title: "Import Tasks",
    properties: ["openFile"],
    filters: [
      { name: "JSON files", extensions: ["json"] },
      { name: "All files", extensions: ["*"] }
    ]
  });
  if (result.canceled || !result.filePaths.length) return;

  try {
    const filePath = result.filePaths[0];
    const text = await fs.readFile(filePath, "utf8");
    targetWindow.webContents.send(IMPORT_JSON_CHANNEL, {
      fileName: path.basename(filePath),
      text
    });
  } catch (error) {
    dialog.showMessageBox(targetWindow, {
      type: "error",
      title: "Import failed",
      message: "Unable to read the selected JSON file.",
      detail: error.message,
      buttons: ["OK"]
    });
  }
}

function openImportTasksDialog(browserWindow) {
  const targetWindow = getTargetWindow(browserWindow);
  importTasksFromDialog(targetWindow).catch((error) => {
    console.error("Failed to open import dialog:", error);
    if (!targetWindow) return;
    dialog.showMessageBox(targetWindow, {
      type: "error",
      title: "Import failed",
      message: "Unable to open the import dialog.",
      detail: error.message,
      buttons: ["OK"]
    });
  });
}

function restartAfterEmptyImport() {
  app.relaunch();
  app.exit(0);
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
    e: "exportTasks"
  };

  if (actions[key]) {
    event.preventDefault();
    triggerRendererAction(actions[key], browserWindow);
    return;
  }

  if (key === "i") {
    event.preventDefault();
    openImportTasksDialog(browserWindow);
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
          click: (_menuItem, browserWindow) => openImportTasksDialog(browserWindow)
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
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: (_menuItem, browserWindow) => {
            const targetWindow = getTargetWindow(browserWindow);
            if (targetWindow) targetWindow.reload();
          }
        },
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
      preload: path.join(__dirname, "preload.js"),
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
  ipcMain.handle(RESTART_AFTER_EMPTY_IMPORT_CHANNEL, () => {
    restartAfterEmptyImport();
  });

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
