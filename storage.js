(function () {
  const STORAGE_KEY = "task-calendar-board.tasks.v1";
  const SCHEMA_VERSION = 1;
  const ALLOWED_STATUSES = ["todo", "in_progress", "done"];
  let lastLoadNotice = null;

  const defaultTasks = [
    { id: "seed-1", title: "Review launch checklist", status: "done", assignee: "Maya", date: "2026-05-01", time: "09:30", description: "Confirm release items and note follow-up work for next week." },
    { id: "seed-2", title: "Draft onboarding notes", status: "todo", assignee: "Leo", date: "2026-05-01", time: "14:00", description: "Write concise setup notes for the support team." },
    { id: "seed-3", title: "Planning sync", status: "in_progress", assignee: "Team", date: "2026-05-04", time: "10:00", description: "Finalize this sprint's calendar and task board priorities." },
    { id: "seed-4", title: "Renew vendor quote", status: "todo", assignee: "Nora", date: "2026-05-04", time: "16:30", description: "Collect updated pricing and flag blockers before approval." },
    { id: "seed-5", title: "QA notes cleanup", status: "todo", assignee: "Ivan", date: "2026-05-06", time: "11:00", description: "Consolidate duplicate QA items into a smaller review queue." },
    { id: "seed-6", title: "Design critique", status: "done", assignee: "Rae", date: "2026-05-08", time: "13:00", description: "Capture action items from the prototype critique." },
    { id: "seed-7", title: "Update task labels", status: "todo", assignee: "Maya", date: "2026-05-08", time: "15:00", description: "Normalize task status labels across calendar and detail views." },
    { id: "seed-8", title: "Ops handoff", status: "todo", assignee: "Sam", date: "2026-05-08", time: "17:00", description: "Prepare notes for the operations handoff." },
    { id: "seed-9", title: "Calendar prototype pass", status: "in_progress", assignee: "Maya", date: "2026-05-11", time: "09:00", description: "Review spacing, status colors, and right panel readability." },
    { id: "seed-10", title: "Team availability", status: "todo", assignee: "Nora", date: "2026-05-11", time: "12:30", description: "Update vacation coverage for late May." },
    { id: "seed-11", title: "Budget reminder", status: "todo", assignee: "Leo", date: "2026-05-11", time: "15:45", description: "Send the missing budget confirmation." },
    { id: "seed-12", title: "Archive done tasks", status: "done", assignee: "Sam", date: "2026-05-11", time: "18:00", description: "Move completed April admin tasks out of the active board." },
    { id: "seed-13", title: "Client review", status: "todo", assignee: "Rae", date: "2026-05-12", time: "10:30", description: "Walk through current task-board prototype and capture feedback." },
    { id: "seed-14", title: "Accessibility sweep", status: "todo", assignee: "Ivan", date: "2026-05-12", time: "14:00", description: "Check keyboard focus states and color contrast for the board." },
    { id: "seed-15", title: "May calendar UI prototype", status: "in_progress", assignee: "Maya", date: "2026-05-15", time: "09:00", description: "Build the static month board with task summaries and detail panel." },
    { id: "seed-16", title: "Mock data review", status: "todo", assignee: "Leo", date: "2026-05-15", time: "11:30", description: "Make sure fake tasks cover empty, light, and busy day states." },
    { id: "seed-17", title: "Past invoice follow-up", status: "todo", assignee: "Nora", date: "2026-05-15", time: "13:00", description: "Close the delayed finance follow-up before end of day." },
    { id: "seed-18", title: "Component naming", status: "done", assignee: "Rae", date: "2026-05-15", time: "16:00", description: "Confirm the naming model for calendar cells and task cards." },
    { id: "seed-19", title: "Sprint review prep", status: "todo", assignee: "Team", date: "2026-05-18", time: "09:30", description: "Prepare highlights and blockers for the sprint review." },
    { id: "seed-20", title: "Data import notes", status: "done", assignee: "Ivan", date: "2026-05-18", time: "12:00", description: "Document import assumptions for a later business-logic round." },
    { id: "seed-21", title: "Support backlog", status: "in_progress", assignee: "Sam", date: "2026-05-18", time: "15:00", description: "Group backlog items by owner and urgency." },
    { id: "seed-22", title: "Legal checklist", status: "todo", assignee: "Nora", date: "2026-05-18", time: "16:30", description: "Confirm what legal fields will appear in task details later." },
    { id: "seed-23", title: "Demo script", status: "todo", assignee: "Maya", date: "2026-05-18", time: "18:00", description: "Create a short script for showing the prototype flow." },
    { id: "seed-24", title: "Metrics snapshot", status: "done", assignee: "Leo", date: "2026-05-21", time: "10:00", description: "Capture sample dashboard metrics for the prototype review." },
    { id: "seed-25", title: "Roadmap notes", status: "todo", assignee: "Rae", date: "2026-05-21", time: "14:30", description: "Draft lightweight roadmap notes for the next design iteration." },
    { id: "seed-26", title: "Regression triage", status: "todo", assignee: "Ivan", date: "2026-05-22", time: "09:45", description: "Triage stale issues that should not appear in active planning." },
    { id: "seed-27", title: "Prototype polish", status: "in_progress", assignee: "Maya", date: "2026-05-22", time: "11:00", description: "Tune hover, selected, weekend, and today states." },
    { id: "seed-28", title: "Stakeholder digest", status: "todo", assignee: "Sam", date: "2026-05-22", time: "15:30", description: "Prepare the weekly task digest." },
    { id: "seed-29", title: "Memorial Day coverage", status: "todo", assignee: "Team", date: "2026-05-25", time: "09:00", description: "Check holiday coverage and mark any blocked work." },
    { id: "seed-30", title: "Usability notes", status: "todo", assignee: "Rae", date: "2026-05-27", time: "10:00", description: "Collect notes on information density and visual hierarchy." },
    { id: "seed-31", title: "Archive candidates", status: "done", assignee: "Sam", date: "2026-05-27", time: "13:30", description: "Review completed tasks that can be moved out of the board." },
    { id: "seed-32", title: "Open risk review", status: "todo", assignee: "Nora", date: "2026-05-27", time: "16:00", description: "List remaining product and delivery risks." },
    { id: "seed-33", title: "Month-end close", status: "in_progress", assignee: "Nora", date: "2026-05-29", time: "10:00", description: "Prepare month-end close tasks for finance and operations." },
    { id: "seed-34", title: "Prototype notes", status: "todo", assignee: "Maya", date: "2026-05-29", time: "15:00", description: "Summarize prototype decisions and next build steps." }
  ];

  function cloneTasks(tasks) {
    return tasks.map((task) => ({ ...task }));
  }

  function generateId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function isValidDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return false;
    const [year, month, day] = value.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);
    return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
  }

  function isValidTime(value) {
    return value === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || ""));
  }

  function normalizeStatus(value) {
    if (value === "overdue") return "todo";
    return ALLOWED_STATUSES.includes(value) ? value : null;
  }

  function normalizeTask(raw, options = {}) {
    if (!raw || typeof raw !== "object") return null;

    const title = String(raw.title || "").trim();
    const date = String(raw.date || "").trim();
    const time = String(raw.time || "").trim();
    const status = normalizeStatus(raw.status);
    const id = String(raw.id || "").trim() || (options.repairId ? generateId() : "");

    if (!id || !title || !isValidDate(date) || !isValidTime(time) || !status) return null;

    return {
      id,
      title,
      description: String(raw.description || "").trim(),
      date,
      time,
      status,
      assignee: String(raw.assignee || raw.owner || "").trim()
    };
  }

  function normalizeTaskList(rawTasks, options = {}) {
    if (!Array.isArray(rawTasks)) return null;
    const normalized = rawTasks.map((task) => normalizeTask(task, options));
    if (normalized.some((task) => task === null)) return null;
    return normalized;
  }

  function toPayload(tasks) {
    const normalized = normalizeTaskList(tasks);
    if (!normalized) {
      throw new Error("Task data failed validation and was not saved.");
    }
    return {
      version: SCHEMA_VERSION,
      tasks: normalized
    };
  }

  function writePayload(tasks) {
    const payload = toPayload(tasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    lastLoadNotice = null;
    return cloneTasks(payload.tasks);
  }

  function hasSavedTaskPayload() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    try {
      const parsed = JSON.parse(stored);
      if (parsed?.version !== SCHEMA_VERSION) return false;
      return Boolean(normalizeTaskList(parsed.tasks, { repairId: true }));
    } catch {
      return false;
    }
  }

  function backupCorruptedData(rawValue, reason) {
    const key = `calendarTasks_corrupted_backup_${Date.now()}`;
    try {
      localStorage.setItem(key, rawValue || "");
      lastLoadNotice = { key, reason };
      console.warn(`Task storage was invalid. Backed up to ${key}.`);
    } catch {
      lastLoadNotice = { key: "", reason };
      console.warn("Task storage was invalid. Could not create backup.");
    }
  }

  function loadTasks(options = {}) {
    const seedIfMissing = options.seedIfMissing !== false;
    const seedIfInvalid = options.seedIfInvalid !== false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return seedIfMissing ? writePayload(defaultTasks) : [];

    try {
      const parsed = JSON.parse(stored);
      const rawTasks = Array.isArray(parsed) ? parsed : parsed?.tasks;
      const normalized = normalizeTaskList(rawTasks, { repairId: true });
      if (!normalized) {
        backupCorruptedData(stored, "Invalid task schema");
        if (seedIfInvalid) return writePayload(defaultTasks);
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }
      return writePayload(normalized);
    } catch {
      backupCorruptedData(stored, "Unreadable task JSON");
      if (seedIfInvalid) return writePayload(defaultTasks);
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  function saveTasks(tasks) {
    return writePayload(tasks);
  }

  function parseImport(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Import file is not valid JSON.");
    }

    const rawTasks = Array.isArray(parsed) ? parsed : parsed?.tasks;
    const normalized = normalizeTaskList(rawTasks);
    if (!normalized) {
      throw new Error("Import file does not match the task schema.");
    }

    return normalized;
  }

  function buildExport(tasks) {
    return JSON.stringify(toPayload(tasks), null, 2);
  }

  function getLastLoadNotice() {
    return lastLoadNotice ? { ...lastLoadNotice } : null;
  }

  function resetTasks() {
    return writePayload(defaultTasks);
  }

  window.TaskStorage = {
    STORAGE_KEY,
    SCHEMA_VERSION,
    ALLOWED_STATUSES,
    buildExport,
    defaultTasks: cloneTasks(defaultTasks),
    generateId,
    getLastLoadNotice,
    hasSavedTaskPayload,
    isValidDate,
    isValidTime,
    loadTasks,
    normalizeTask,
    parseImport,
    resetTasks,
    saveTasks
  };
})();
