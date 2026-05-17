const { contextBridge, ipcRenderer } = require("electron");

const MENU_ACTION_CHANNEL = "task-calendar:menu-action";
const IMPORT_JSON_CHANNEL = "task-calendar:import-json";
const RESTART_AFTER_EMPTY_IMPORT_CHANNEL = "task-calendar:restart-after-empty-import";
const GET_DATA_INFO_CHANNEL = "task-calendar:get-data-info";
const OPEN_DATA_LOCATION_CHANNEL = "task-calendar:open-data-location";
const SAVE_EXPORT_JSON_CHANNEL = "task-calendar:save-export-json";
const OPEN_IMPORT_DIALOG_CHANNEL = "task-calendar:open-import-dialog";
const RESTART_AFTER_DATA_RESTORE_CHANNEL = "task-calendar:restart-after-data-restore";
const ALLOWED_MENU_ACTIONS = new Set(["newTask", "exportTasks", "resetDemoData", "dataSettings"]);
const ALLOWED_IMPORT_SOURCES = new Set(["menu", "dataSettingsRestore"]);

function subscribe(channel, handler) {
  if (typeof handler !== "function") return () => {};

  const listener = (_event, payload) => handler(payload);
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.removeListener(channel, listener);
}

contextBridge.exposeInMainWorld("taskCalendarDesktop", {
  onMenuAction(handler) {
    return subscribe(MENU_ACTION_CHANNEL, (action) => {
      if (ALLOWED_MENU_ACTIONS.has(action)) handler(action);
    });
  },
  onImportTasksText(handler) {
    return subscribe(IMPORT_JSON_CHANNEL, (payload) => {
      if (!payload || typeof payload.text !== "string") return;
      handler({
        fileName: typeof payload.fileName === "string" ? payload.fileName : "tasks.json",
        source: ALLOWED_IMPORT_SOURCES.has(payload.source) ? payload.source : "menu",
        text: payload.text
      });
    });
  },
  restartAfterEmptyImport() {
    return ipcRenderer.invoke(RESTART_AFTER_EMPTY_IMPORT_CHANNEL);
  },
  restartAfterDataRestore() {
    return ipcRenderer.invoke(RESTART_AFTER_DATA_RESTORE_CHANNEL);
  },
  getDataInfo() {
    return ipcRenderer.invoke(GET_DATA_INFO_CHANNEL);
  },
  openDataLocation() {
    return ipcRenderer.invoke(OPEN_DATA_LOCATION_CHANNEL);
  },
  saveExportJson(payload) {
    if (!payload || typeof payload.text !== "string") {
      return Promise.resolve({ canceled: true });
    }
    return ipcRenderer.invoke(SAVE_EXPORT_JSON_CHANNEL, {
      suggestedName: typeof payload.suggestedName === "string" ? payload.suggestedName : "task-calendar-backup.json",
      text: payload.text
    });
  },
  openImportDialog(source = "menu") {
    return ipcRenderer.invoke(OPEN_IMPORT_DIALOG_CHANNEL, {
      source: ALLOWED_IMPORT_SOURCES.has(source) ? source : "menu"
    });
  }
});
