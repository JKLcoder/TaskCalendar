(function () {
  const {
    ALLOWED_STATUSES,
    buildExport,
    generateId,
    isValidDate,
    isValidTime,
    loadTasks,
    parseImport,
    resetTasks,
    saveTasks
  } = window.TaskStorage;

  const statusLabels = {
    todo: "Todo",
    in_progress: "In progress",
    done: "Done",
    overdue: "Overdue"
  };
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const grid = document.getElementById("calendarGrid");
  const monthTitle = document.getElementById("monthTitle");
  const panelDate = document.getElementById("panelDate");
  const panelSummary = document.getElementById("panelSummary");
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
  const statusFilterGroup = document.getElementById("statusFilterGroup");
  const todayIncompleteButton = document.getElementById("todayIncompleteButton");
  const clearFiltersButton = document.getElementById("clearFiltersButton");
  const resetDemoButton = document.getElementById("resetDemoButton");
  const filterSummary = document.getElementById("filterSummary");
  const toast = document.getElementById("toast");

  let tasks = loadTasks();
  let currentMonth = new Date(2026, 4, 1);
  let selectedDate = new Date(2026, 4, 15);
  let filters = {
    query: "",
    status: "all",
    todayIncomplete: false
  };
  let toastTimer = null;

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
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

  function renderAll() {
    updateFilterControls();
    renderCalendar();
    renderPanel();
  }

  function updateFilterControls() {
    taskSearchInput.value = filters.query;
    todayIncompleteButton.classList.toggle("active", filters.todayIncomplete);
    clearFiltersButton.disabled = !hasActiveFilters();
    filterSummary.textContent = getFilterSummary();
    statusFilterGroup.querySelectorAll("[data-status-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.statusFilter === filters.status && !filters.todayIncomplete);
    });
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
    taskModal.classList.remove("open");
    taskModal.setAttribute("aria-hidden", "true");
    taskForm.reset();
  }

  function persistTasks(nextTasks) {
    tasks = saveTasks(nextTasks);
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

  async function importTasks(file) {
    if (!file) return;

    try {
      const importedTasks = parseImport(await file.text());
      if (!confirm("Importing will replace your current local tasks. Continue?")) return;
      persistTasks(importedTasks);

      if (tasks.length) {
        selectedDate = parseISODate(tasks[0].date);
        currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      }

      renderAll();
      showToast("Tasks imported.");
    } catch (error) {
      showValidationError(error.message);
    } finally {
      importFileInput.value = "";
    }
  }

  function clearFilters() {
    filters = { query: "", status: "all", todayIncomplete: false };
    renderAll();
  }

  function resetDemoData() {
    if (!confirm("Reset all local tasks to the demo data? This replaces your current local tasks.")) return;
    tasks = resetTasks();
    filters = { query: "", status: "all", todayIncomplete: false };
    selectedDate = new Date(2026, 4, 15);
    currentMonth = new Date(2026, 4, 1);
    renderAll();
    showToast("Demo data reset.");
  }

  document.getElementById("newTaskButton").addEventListener("click", () => openTaskForm());
  document.getElementById("prevMonthButton").addEventListener("click", () => moveMonth(-1));
  document.getElementById("nextMonthButton").addEventListener("click", () => moveMonth(1));
  document.getElementById("todayButton").addEventListener("click", () => {
    filters.todayIncomplete = false;
    const today = new Date();
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    renderAll();
  });
  todayIncompleteButton.addEventListener("click", () => {
    const today = new Date();
    filters = { query: "", status: "all", todayIncomplete: true };
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    renderAll();
  });
  clearFiltersButton.addEventListener("click", clearFilters);
  taskSearchInput.addEventListener("input", () => {
    filters.query = taskSearchInput.value;
    filters.todayIncomplete = false;
    renderAll();
  });
  statusFilterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-status-filter]");
    if (!button) return;
    filters.status = button.dataset.statusFilter;
    filters.todayIncomplete = false;
    renderAll();
  });
  document.getElementById("exportButton").addEventListener("click", exportTasks);
  document.getElementById("importButton").addEventListener("click", () => importFileInput.click());
  resetDemoButton.addEventListener("click", resetDemoData);
  importFileInput.addEventListener("change", () => importTasks(importFileInput.files[0]));
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

  window.CalendarApp = {
    getEffectiveStatus,
    getFilterSummary,
    getFilters: () => ({ ...filters }),
    getTasks: () => tasks.map((task) => ({ ...task })),
    renderAll
  };

  renderAll();
  const loadNotice = window.TaskStorage.getLastLoadNotice();
  if (loadNotice) {
    showToast("Corrupted local data was backed up. Demo data restored.");
  }
})();
