const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");

const APP_NAME = "Task Calendar";
const MENU_ACTION_CHANNEL = "task-calendar:menu-action";
const IMPORT_JSON_CHANNEL = "task-calendar:import-json";
const RESTART_AFTER_EMPTY_IMPORT_CHANNEL = "task-calendar:restart-after-empty-import";
const GET_DATA_INFO_CHANNEL = "task-calendar:get-data-info";
const OPEN_DATA_LOCATION_CHANNEL = "task-calendar:open-data-location";
const SAVE_EXPORT_JSON_CHANNEL = "task-calendar:save-export-json";
const OPEN_IMPORT_DIALOG_CHANNEL = "task-calendar:open-import-dialog";
const RESTART_AFTER_DATA_RESTORE_CHANNEL = "task-calendar:restart-after-data-restore";
const isMac = process.platform === "darwin";
const ALLOWED_IMPORT_SOURCES = new Set(["menu", "dataSettingsRestore"]);

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

async function importTasksFromDialog(browserWindow, source = "menu") {
  const targetWindow = getTargetWindow(browserWindow);
  if (!targetWindow) return { canceled: true };
  const safeSource = ALLOWED_IMPORT_SOURCES.has(source) ? source : "menu";

  const result = await dialog.showOpenDialog({
    title: "Import Tasks",
    properties: ["openFile"],
    filters: [
      { name: "JSON files", extensions: ["json"] },
      { name: "All files", extensions: ["*"] }
    ]
  });
  if (result.canceled || !result.filePaths.length) return { canceled: true };

  try {
    const filePath = result.filePaths[0];
    const text = await fs.readFile(filePath, "utf8");
    targetWindow.webContents.send(IMPORT_JSON_CHANNEL, {
      fileName: path.basename(filePath),
      source: safeSource,
      text
    });
    return { canceled: false };
  } catch (error) {
    dialog.showMessageBox(targetWindow, {
      type: "error",
      title: "Import failed",
      message: "Unable to read the selected JSON file.",
      detail: error.message,
      buttons: ["OK"]
    });
    return { canceled: true, error: error.message };
  }
}

function openImportTasksDialog(browserWindow, source = "menu") {
  const targetWindow = getTargetWindow(browserWindow);
  return importTasksFromDialog(targetWindow, source).catch((error) => {
    console.error("Failed to open import dialog:", error);
    if (!targetWindow) return { canceled: true, error: error.message };
    dialog.showMessageBox(targetWindow, {
      type: "error",
      title: "Import failed",
      message: "Unable to open the import dialog.",
      detail: error.message,
      buttons: ["OK"]
    });
    return { canceled: true, error: error.message };
  });
}

function sanitizeJsonFileName(value) {
  const fallback = "task-calendar-backup.json";
  const name = String(value || fallback)
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  if (!name) return fallback;
  return name.toLowerCase().endsWith(".json") ? name : `${name}.json`;
}

function restartAfterEmptyImport() {
  app.relaunch();
  app.exit(0);
}

function restartAfterDataRestore() {
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

function showDataSettings(browserWindow) {
  triggerRendererAction("dataSettings", browserWindow);
}

async function saveExportJson(browserWindow, payload) {
  const targetWindow = getTargetWindow(browserWindow);
  if (!targetWindow || !payload || typeof payload.text !== "string") {
    return { canceled: true };
  }

  const result = await dialog.showSaveDialog(targetWindow, {
    title: "Export Task Backup",
    defaultPath: sanitizeJsonFileName(payload.suggestedName),
    filters: [
      { name: "JSON files", extensions: ["json"] }
    ]
  });

  if (result.canceled || !result.filePath) return { canceled: true };

  await fs.writeFile(result.filePath, payload.text, "utf8");
  return { canceled: false, filePath: result.filePath };
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
        {
          label: "Data && Settings...",
          click: (_menuItem, browserWindow) => showDataSettings(browserWindow)
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
  ipcMain.handle(RESTART_AFTER_DATA_RESTORE_CHANNEL, () => {
    restartAfterDataRestore();
  });
  ipcMain.handle(GET_DATA_INFO_CHANNEL, () => ({
    appVersion: app.getVersion(),
    userDataPath: app.getPath("userData"),
    storageType: "Electron localStorage"
  }));
  ipcMain.handle(OPEN_DATA_LOCATION_CHANNEL, () => shell.openPath(app.getPath("userData")));
  ipcMain.handle(SAVE_EXPORT_JSON_CHANNEL, (event, payload) => {
    const targetWindow = BrowserWindow.fromWebContents(event.sender);
    return saveExportJson(targetWindow, payload);
  });
  ipcMain.handle(OPEN_IMPORT_DIALOG_CHANNEL, (event, payload = {}) => {
    const targetWindow = BrowserWindow.fromWebContents(event.sender);
    return openImportTasksDialog(targetWindow, payload.source);
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
