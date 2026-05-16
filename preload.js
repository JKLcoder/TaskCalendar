const { contextBridge, ipcRenderer } = require("electron");

const MENU_ACTION_CHANNEL = "task-calendar:menu-action";
const IMPORT_JSON_CHANNEL = "task-calendar:import-json";
const ALLOWED_MENU_ACTIONS = new Set(["newTask", "exportTasks", "resetDemoData"]);

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
        text: payload.text
      });
    });
  }
});
