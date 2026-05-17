(function () {
  const {
    ALLOWED_STATUSES,
    buildExport,
    generateId,
    getLastLoadNotice,
    hasSavedTaskPayload,
    isValidDate,
    isValidTime,
    loadTasks,
    parseImport,
    resetTasks,
    saveTasks,
    STORAGE_KEY
  } = window.TaskStorage;

  const statusLabels = {
    todo: "Todo",
    in_progress: "In progress",
    done: "Done",
    overdue: "Overdue"
  };
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const appRoot = document.querySelector(".app");
  const firstRunPanel = document.getElementById("firstRunPanel");
  const startBlankButton = document.getElementById("startBlankButton");
  const useDemoDataButton = document.getElementById("useDemoDataButton");
  const firstRunImportButton = document.getElementById("firstRunImportButton");
  const grid = document.getElementById("calendarGrid");
  const monthTitle = document.getElementById("monthTitle");
  const panelDate = document.getElementById("panelDate");
  const panelSummary = document.getElementById("panelSummary");
  const panelRelation = document.getElementById("panelRelation");
  const panelList = document.getElementById("panelList");
  const taskModal = document.getElementById("taskModal");
  const taskForm = document.getElementById("taskForm");
  const taskId = document.getElementById("taskId");
  const taskTitle = document.getElementById("taskTitle");
  const taskDescription = document.getElementById("taskDescription");
  const taskDate = document.getElementById("taskDate");
  const taskTime = document.getElementById("taskTime");
  const taskStatus = document.getElementById("taskStatus");
  const taskAssignee = document.getElementById("taskAssignee");
  const deleteTaskButton = document.getElementById("deleteTaskButton");
  const importFileInput = document.getElementById("importFileInput");
  const taskSearchInput = document.getElementById("taskSearchInput");
  const statusFilterSelect = document.getElementById("statusFilterSelect");
  const todayIncompleteButton = document.getElementById("todayIncompleteButton");
  const clearFiltersButton = document.getElementById("clearFiltersButton");
  const resetDemoButton = document.getElementById("resetDemoButton");
  const filterSummary = document.getElementById("filterSummary");
  const todayDatePill = document.getElementById("todayDatePill");
  const todayIncompleteCount = document.getElementById("todayIncompleteCount");
  const todayOverdueCount = document.getElementById("todayOverdueCount");
  const todayDoneCount = document.getElementById("todayDoneCount");
  const weekOpenCount = document.getElementById("weekOpenCount");
  const weekPressurePill = document.getElementById("weekPressurePill");
  const weekPressureHint = document.getElementById("weekPressureHint");
  const commandTodayIncompleteButton = document.getElementById("commandTodayIncompleteButton");
  const commandClearFiltersButton = document.getElementById("commandClearFiltersButton");
  const toast = document.getElementById("toast");

  const startupDate = getTodayDate();
  let tasks = loadTasks({ seedIfMissing: false, seedIfInvalid: false });
  let currentMonth = new Date(startupDate.getFullYear(), startupDate.getMonth(), 1);
  let selectedDate = startupDate;
  let firstRunActive = !hasSavedTaskPayload() || Boolean(getLastLoadNotice());
  let importFromFirstRun = false;
  let filters = {
    query: "",
    status: "all",
    todayIncomplete: false
  };
  let toastTimer = null;
  const EMPTY_IMPORT_RESTART_NOTICE_KEY = "task-calendar.emptyImportRestartNotice";

  function setLocalFlag(key) {
    try {
      localStorage.setItem(key, "1");
    } catch {
      // The persisted empty task payload is the source of truth; the notice is best-effort.
    }
  }

  function consumeLocalFlag(key) {
    try {
      const exists = localStorage.getItem(key) === "1";
      if (exists) localStorage.removeItem(key);
      return exists;
    } catch {
      return false;
    }
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function getTodayDate() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function dateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseISODate(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getDueDate(task) {
    if (!isValidDate(task.date)) return null;
    const [year, month, day] = task.date.split("-").map(Number);
    const [hour, minute] = (isValidTime(task.time) && task.time ? task.time : "23:59").split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
  }

  function getEffectiveStatus(task) {
    if (task.status === "done") return "done";
    const dueDate = getDueDate(task);
    if (dueDate && dueDate < new Date()) return "overdue";
    return task.status;
  }

  function taskMatchesSearch(task) {
    const query = filters.query.trim().toLowerCase();
    if (!query) return true;
    return [task.title, task.description, task.assignee]
      .join(" ")
      .toLowerCase()
      .includes(query);
  }

  function taskMatchesStatus(task) {
    if (filters.status === "all") return true;
    return getEffectiveStatus(task) === filters.status;
  }

  function taskMatchesTodayIncomplete(task) {
    if (!filters.todayIncomplete) return true;
    return task.date === dateToISO(new Date()) && task.status !== "done";
  }

  function taskMatchesFilters(task) {
    return taskMatchesSearch(task) && taskMatchesStatus(task) && taskMatchesTodayIncomplete(task);
  }

  function getTasksForDate(date) {
    const iso = dateToISO(date);
    return tasks
      .filter((task) => task.date === iso)
      .sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
  }

  function getVisibleTasksForDate(date) {
    return getTasksForDate(date).filter(taskMatchesFilters);
  }

  function hasActiveFilters() {
    return Boolean(filters.query.trim()) || filters.status !== "all" || filters.todayIncomplete;
  }

  function formatPanelDate(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }

  function statusCase(value) {
    return String(value || "").replace(/^\w/, (letter) => letter.toUpperCase());
  }

  function getWeekRange(date) {
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const mondayOffset = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - mondayOffset);
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
    return { start, end };
  }

  function isTaskInDateRange(task, start, end) {
    if (!isValidDate(task.date)) return false;
    const taskDate = parseISODate(task.date);
    return taskDate >= start && taskDate <= end;
  }

  function getWeekPressureLevel(openCount, overdueCount) {
    if (openCount >= 15 || overdueCount >= 4) return "critical";
    if (openCount >= 9 || overdueCount >= 2) return "high";
    if (openCount >= 4 || overdueCount >= 1) return "medium";
    return "low";
  }

  function getTodayMetrics() {
    const today = getTodayDate();
    const todayISO = dateToISO(today);
    const todayTasks = tasks.filter((task) => task.date === todayISO);
    const weekRange = getWeekRange(today);
    const weekOpenTasks = tasks.filter((task) => task.status !== "done" && isTaskInDateRange(task, weekRange.start, weekRange.end));
    const weekOverdue = weekOpenTasks.filter((task) => getEffectiveStatus(task) === "overdue").length;

    return {
      today,
      incomplete: todayTasks.filter((task) => task.status !== "done").length,
      overdue: todayTasks.filter((task) => getEffectiveStatus(task) === "overdue").length,
      done: todayTasks.filter((task) => task.status === "done").length,
      weekOpen: weekOpenTasks.length,
      weekOverdue,
      weekPressure: getWeekPressureLevel(weekOpenTasks.length, weekOverdue)
    };
  }

  function buildCalendarCells() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const leadingDays = (firstDay.getDay() + 6) % 7;
    const totalDays = daysInMonth(year, month);
    const cells = [];

    for (let offset = leadingDays; offset > 0; offset -= 1) {
      cells.push({ date: new Date(year, month, 1 - offset), outside: true });
    }
    for (let day = 1; day <= totalDays; day += 1) {
      cells.push({ date: new Date(year, month, day), outside: false });
    }
    while (cells.length % 7 !== 0) {
      const day = cells.length - leadingDays - totalDays + 1;
      cells.push({ date: new Date(year, month + 1, day), outside: true });
    }

    return cells;
  }

  function renderCalendar() {
    grid.innerHTML = "";
    monthTitle.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    const todayISO = dateToISO(new Date());
    const selectedISO = dateToISO(selectedDate);

    buildCalendarCells().forEach((cell) => {
      const cellISO = dateToISO(cell.date);
      const dayTasks = cell.outside ? [] : getVisibleTasksForDate(cell.date);
      const button = document.createElement("button");
      button.type = "button";
      button.className = [
        "day-cell",
        cell.outside ? "outside" : "",
        cellISO === selectedISO && !cell.outside ? "selected" : "",
        cellISO === todayISO ? "today" : ""
      ].filter(Boolean).join(" ");
      button.disabled = cell.outside;
      button.dataset.date = cellISO;
      button.setAttribute("aria-label", `${monthNames[cell.date.getMonth()]} ${cell.date.getDate()}, ${cell.date.getFullYear()}, ${dayTasks.length} tasks`);

      const visibleTasks = dayTasks.slice(0, 3);
      button.innerHTML = `
        <div class="day-header">
          <span class="day-number">${cell.date.getDate()}</span>
          ${dayTasks.length ? `<span class="task-count">${dayTasks.length}</span>` : ""}
        </div>
        <div class="task-stack">
          ${visibleTasks.map((task) => `
            <div class="task-card ${escapeHTML(getEffectiveStatus(task))}">
              <span class="status-rail" aria-hidden="true"></span>
              <span class="task-title">${escapeHTML(task.title)}</span>
            </div>
          `).join("")}
          ${dayTasks.length > 3 ? `<div class="more">+${dayTasks.length - 3} more</div>` : ""}
        </div>
      `;

      if (!cell.outside) {
        button.addEventListener("click", () => {
          selectedDate = parseISODate(cellISO);
          renderAll();
        });
      }

      grid.appendChild(button);
    });
  }

  function renderPanel() {
    const dayTasks = getVisibleTasksForDate(selectedDate);
    panelDate.textContent = formatPanelDate(selectedDate);
    const today = getTodayDate();
    const todayISO = dateToISO(today);
    const selectedISO = dateToISO(selectedDate);
    panelRelation.textContent = selectedISO === todayISO
      ? "Today"
      : `Today overview: ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(today)}`;
    const noun = dayTasks.length === 1 ? "task" : "tasks";
    panelSummary.textContent = hasActiveFilters()
      ? `${dayTasks.length} matching ${noun}`
      : `${dayTasks.length} ${noun} scheduled`;

    if (!dayTasks.length) {
      const emptyMessage = filters.todayIncomplete
        ? "No incomplete tasks for today."
        : hasActiveFilters()
          ? "No tasks match current filters."
          : "No tasks scheduled for this day.";
      panelList.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
      return;
    }

    panelList.innerHTML = dayTasks.map((task) => {
      const effectiveStatus = getEffectiveStatus(task);
      return `
        <article class="detail-card ${escapeHTML(effectiveStatus)}" data-task-id="${escapeHTML(task.id)}" role="button" tabindex="0" aria-label="Edit ${escapeHTML(task.title)}">
          <div class="detail-topline">
            <h3 class="detail-title">${escapeHTML(task.title)}</h3>
            <span class="status-label ${escapeHTML(effectiveStatus)}">${statusLabels[effectiveStatus]}</span>
          </div>
          <p class="detail-body">${escapeHTML(task.description || "No description added.")}</p>
          <div class="detail-meta">
            <span class="meta-pill">${escapeHTML(task.time || "No time")}</span>
            <span class="meta-pill">${escapeHTML(task.assignee || "Unassigned")}</span>
          </div>
          ${task.status !== "done" ? `
            <div class="detail-actions">
              <button class="text-button" type="button" data-action="done" data-task-id="${escapeHTML(task.id)}">Mark done</button>
            </div>
          ` : ""}
        </article>
      `;
    }).join("");
  }

  function renderTodayCommandCenter() {
    const metrics = getTodayMetrics();
    todayDatePill.textContent = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric"
    }).format(metrics.today);
    todayIncompleteCount.textContent = metrics.incomplete;
    todayOverdueCount.textContent = metrics.overdue;
    todayDoneCount.textContent = metrics.done;
    weekOpenCount.textContent = metrics.weekOpen;
    weekPressurePill.className = `pressure-pill ${metrics.weekPressure}`;
    weekPressurePill.textContent = `Pressure: ${statusCase(metrics.weekPressure)}`;
    weekPressureHint.textContent = `${metrics.weekOverdue} overdue in Mon-Sun open tasks`;
    commandClearFiltersButton.disabled = !hasActiveFilters();
  }

  function renderAll() {
    renderFirstRunState();
    updateFilterControls();
    renderCalendar();
    renderTodayCommandCenter();
    renderPanel();
  }

  function renderFirstRunState() {
    appRoot.classList.toggle("first-run-mode", firstRunActive);
    firstRunPanel.hidden = !firstRunActive;
  }

  function updateFilterControls() {
    taskSearchInput.value = filters.query;
    statusFilterSelect.value = filters.status;
    todayIncompleteButton.classList.toggle("active", filters.todayIncomplete);
    clearFiltersButton.disabled = !hasActiveFilters();
    filterSummary.textContent = getFilterSummary();
  }

  function getFilterSummary() {
    if (filters.todayIncomplete) return "Today incomplete";

    const parts = [];
    const query = filters.query.trim();
    if (query) parts.push(`Search: ${query}`);
    if (filters.status !== "all") parts.push(`Status: ${statusLabels[filters.status]}`);

    if (!parts.length) return "Showing: All tasks";
    if (parts.length === 1 && filters.status !== "all" && !query) return `Showing: ${statusLabels[filters.status]}`;
    return parts.join(" · ");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  function showValidationError(message) {
    alert(message);
  }

  function getFormValues() {
    return {
      id: taskId.value || generateId(),
      title: taskTitle.value.trim(),
      description: taskDescription.value.trim(),
      date: taskDate.value,
      time: taskTime.value,
      status: taskStatus.value,
      assignee: taskAssignee.value.trim()
    };
  }

  function validateTaskInput(task) {
    if (!task.title) return "Title is required.";
    if (!isValidDate(task.date)) return "A valid date is required.";
    if (!ALLOWED_STATUSES.includes(task.status)) return "Status must be Todo, In progress, or Done.";
    if (!isValidTime(task.time)) return "Time must use HH:MM format.";
    return "";
  }

  function openTaskForm(task = null) {
    const isEdit = Boolean(task);
    document.getElementById("taskModalTitle").textContent = isEdit ? "Edit Task" : "New Task";
    taskId.value = task?.id || "";
    taskTitle.value = task?.title || "";
    taskDescription.value = task?.description || "";
    taskDate.value = task?.date || dateToISO(selectedDate);
    taskTime.value = task?.time || "09:00";
    taskStatus.value = task?.status || "todo";
    taskAssignee.value = task?.assignee || "";
    deleteTaskButton.style.display = isEdit ? "inline-flex" : "none";
    taskModal.classList.add("open");
    taskModal.setAttribute("aria-hidden", "false");
    taskTitle.focus();
  }

  function closeTaskForm() {
    if (taskModal.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    taskModal.classList.remove("open");
    taskModal.setAttribute("aria-hidden", "true");
    taskForm.reset();
  }

  function persistTasks(nextTasks) {
    tasks = saveTasks(nextTasks);
  }

  function finishFirstRun(message) {
    filters = { query: "", status: "all", todayIncomplete: false };
    focusToday();
    firstRunActive = false;
    renderAll();
    showToast(message);
  }

  function enterEmptyImportFallback(message) {
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    importFileInput.value = "";
    importFromFirstRun = false;
    filters = { query: "", status: "all", todayIncomplete: false };
    focusToday();
    firstRunActive = false;
    renderAll();
    showToast(message);
  }

  function restartAfterEmptyImport() {
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    importFileInput.value = "";
    importFromFirstRun = false;
    filters = { query: "", status: "all", todayIncomplete: false };
    setLocalFlag(EMPTY_IMPORT_RESTART_NOTICE_KEY);

    if (window.taskCalendarDesktop?.restartAfterEmptyImport) {
      window.taskCalendarDesktop.restartAfterEmptyImport().catch(() => {
        consumeLocalFlag(EMPTY_IMPORT_RESTART_NOTICE_KEY);
        enterEmptyImportFallback("Empty task list imported.");
      });
      return;
    }

    consumeLocalFlag(EMPTY_IMPORT_RESTART_NOTICE_KEY);
    enterEmptyImportFallback("Empty task list imported.");
  }

  function startBlankCalendar() {
    persistTasks([]);
    finishFirstRun("Blank calendar started.");
  }

  function useDemoData() {
    tasks = resetTasks();
    finishFirstRun("Demo data loaded. You can reset or import tasks anytime.");
  }

  function upsertTask(event) {
    event.preventDefault();
    const values = getFormValues();
    const error = validateTaskInput(values);
    if (error) {
      showValidationError(error);
      return;
    }

    const exists = taskId.value && tasks.some((task) => task.id === taskId.value);
    const nextTasks = exists
      ? tasks.map((task) => task.id === taskId.value ? values : task)
      : [values, ...tasks];

    try {
      persistTasks(nextTasks);
    } catch (error) {
      showValidationError(error.message);
      return;
    }

    selectedDate = parseISODate(values.date);
    currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    closeTaskForm();
    renderAll();
    showToast(taskMatchesFilters(values) ? (exists ? "Task updated." : "Task created.") : "Task saved, but hidden by current filters.");
  }

  function deleteCurrentTask() {
    const id = taskId.value;
    if (!id) return;
    if (!confirm("Delete this task? This cannot be undone.")) return;
    persistTasks(tasks.filter((task) => task.id !== id));
    closeTaskForm();
    renderAll();
    showToast("Task deleted.");
  }

  function markTaskDone(id) {
    persistTasks(tasks.map((task) => task.id === id ? { ...task, status: "done" } : task));
    renderAll();
    showToast("Task marked done.");
  }

  function moveMonth(delta) {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + delta;
    const day = Math.min(selectedDate.getDate(), daysInMonth(year, month));
    currentMonth = new Date(year, month, 1);
    selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    renderAll();
  }

  function exportTasks() {
    const blob = new Blob([buildExport(tasks)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `task-calendar-export-${dateToISO(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Tasks exported.");
  }

  function importTasksFromText(text, options = {}) {
    const fromFirstRun = Boolean(options.fromFirstRun);

    try {
      const importedTasks = parseImport(text);
      if (!fromFirstRun && !confirm("Importing will replace your current local tasks. Continue?")) return;
      persistTasks(importedTasks);

      if (!tasks.length) {
        restartAfterEmptyImport();
        return;
      }

      if (fromFirstRun || firstRunActive) {
        finishFirstRun("Tasks imported.");
        return;
      }

      selectedDate = parseISODate(tasks[0].date);
      currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

      renderAll();
      showToast("Tasks imported.");
    } catch (error) {
      showValidationError(error.message);
    }
  }

  async function importTasks(file, options = {}) {
    if (!file) return;

    try {
      importTasksFromText(await file.text(), options);
    } catch (error) {
      showValidationError(error.message);
    } finally {
      importFileInput.value = "";
      importFromFirstRun = false;
    }
  }

  function openImportPicker(fromFirstRun = false) {
    importFromFirstRun = fromFirstRun;
    importFileInput.click();
  }

  function clearFilters() {
    filters = { query: "", status: "all", todayIncomplete: false };
    renderAll();
  }

  function showTodayIncomplete() {
    const today = getTodayDate();
    filters = { query: "", status: "all", todayIncomplete: true };
    selectedDate = today;
    currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    renderAll();
  }

  function focusToday() {
    const today = getTodayDate();
    selectedDate = today;
    currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  }

  function resetDemoData() {
    if (!confirm("Reset all local tasks to the demo data? This replaces your current local tasks.")) return;
    tasks = resetTasks();
    firstRunActive = false;
    filters = { query: "", status: "all", todayIncomplete: false };
    focusToday();
    renderAll();
    showToast("Demo data reset.");
  }

  startBlankButton.addEventListener("click", startBlankCalendar);
  useDemoDataButton.addEventListener("click", useDemoData);
  firstRunImportButton.addEventListener("click", () => openImportPicker(true));
  document.getElementById("newTaskButton").addEventListener("click", () => {
    if (!firstRunActive) openTaskForm();
  });
  document.getElementById("prevMonthButton").addEventListener("click", () => moveMonth(-1));
  document.getElementById("nextMonthButton").addEventListener("click", () => moveMonth(1));
  document.getElementById("todayButton").addEventListener("click", () => {
    filters.todayIncomplete = false;
    focusToday();
    renderAll();
  });
  todayIncompleteButton.addEventListener("click", showTodayIncomplete);
  commandTodayIncompleteButton.addEventListener("click", showTodayIncomplete);
  commandClearFiltersButton.addEventListener("click", clearFilters);
  clearFiltersButton.addEventListener("click", clearFilters);
  taskSearchInput.addEventListener("input", () => {
    filters.query = taskSearchInput.value;
    filters.todayIncomplete = false;
    renderAll();
  });
  statusFilterSelect.addEventListener("change", () => {
    filters.status = statusFilterSelect.value;
    filters.todayIncomplete = false;
    renderAll();
  });
  document.getElementById("exportButton").addEventListener("click", exportTasks);
  document.getElementById("importButton").addEventListener("click", () => openImportPicker(firstRunActive));
  resetDemoButton.addEventListener("click", resetDemoData);
  importFileInput.addEventListener("change", () => importTasks(importFileInput.files[0], { fromFirstRun: importFromFirstRun }));
  document.getElementById("closeModalButton").addEventListener("click", closeTaskForm);
  document.getElementById("cancelTaskButton").addEventListener("click", closeTaskForm);
  deleteTaskButton.addEventListener("click", deleteCurrentTask);
  taskForm.addEventListener("submit", upsertTask);
  taskModal.addEventListener("click", (event) => {
    if (event.target === taskModal) closeTaskForm();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && taskModal.classList.contains("open")) closeTaskForm();
  });
  panelList.addEventListener("click", (event) => {
    const doneButton = event.target.closest("[data-action='done']");
    if (doneButton) {
      event.stopPropagation();
      markTaskDone(doneButton.dataset.taskId);
      return;
    }

    const card = event.target.closest(".detail-card");
    if (card) openTaskForm(tasks.find((task) => task.id === card.dataset.taskId));
  });
  panelList.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("detail-card")) {
      event.preventDefault();
      openTaskForm(tasks.find((task) => task.id === event.target.dataset.taskId));
    }
  });

  if (window.taskCalendarDesktop) {
    window.taskCalendarDesktop.onMenuAction((action) => {
      const actions = {
        newTask: () => {
          if (!firstRunActive) openTaskForm();
        },
        exportTasks,
        resetDemoData
      };
      actions[action]?.();
    });

    window.taskCalendarDesktop.onImportTasksText((payload) => {
      importTasksFromText(payload.text, { fromFirstRun: firstRunActive });
    });
  }

  window.CalendarApp = {
    getEffectiveStatus,
    getFilterSummary,
    getFilters: () => ({ ...filters }),
    isFirstRunActive: () => firstRunActive,
    getTodayMetrics,
    getTasks: () => tasks.map((task) => ({ ...task })),
    renderAll
  };

  renderAll();
  if (consumeLocalFlag(EMPTY_IMPORT_RESTART_NOTICE_KEY)) {
    showToast("Empty task list imported.");
  }
  const loadNotice = getLastLoadNotice();
  if (loadNotice) {
    showToast("Corrupted local data was backed up. Choose how to start.");
  }
})();
