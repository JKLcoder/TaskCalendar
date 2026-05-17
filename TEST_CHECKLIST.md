# Manual Test Checklist

Use this checklist for the v0.4.0 local testing baseline. Mark each item after testing the development app when needed and both packaged Windows app artifacts.

## Setup

- [ ] Run `npm install`.
- [ ] Run `npm audit` and confirm 0 vulnerabilities.
- [ ] Run `node --check main.js app.js storage.js preload.js`.
- [ ] Run `npm start` and confirm the desktop app launches.
- [ ] Run `npm run pack`.
- [ ] Run `npm run dist:portable`.
- [ ] Confirm `dist/win-unpacked/TaskCalendar.exe` exists.
- [ ] Confirm `dist/Task Calendar-0.4.0-portable-x64.zip` exists.

## App Launch And Rendering

- [ ] Launch the development app with `npm start`.
- [ ] Launch `dist/win-unpacked/TaskCalendar.exe`.
- [ ] Extract the portable ZIP to a normal folder and launch `TaskCalendar.exe`.
- [ ] Confirm the window title is `Task Calendar`.
- [ ] Confirm the app opens on the real current month and selects the real today.
- [ ] Confirm the month calendar renders.
- [ ] Confirm task summary cards appear in calendar cells.
- [ ] Confirm each day shows at most 3 task cards plus `+N more` when needed.
- [ ] Confirm today and selected date are visually distinguishable.
- [ ] Confirm the compact desktop layout uses the workspace width without excessive side whitespace.
- [ ] Confirm the toolbar is compact on normal desktop widths and wraps acceptably on narrow widths.
- [ ] Confirm the app shell uses a fixed-height desktop work area.
- [ ] Confirm the whole page/body is not the main scroll container in normal desktop use.
- [ ] Confirm the calendar and right panel align vertically.
- [ ] Confirm the right panel scrolls independently when details overflow.
- [ ] Confirm calendar date numbers remain anchored top-left.
- [ ] Confirm calendar tasks stack downward below the date number.
- [ ] Confirm the right panel layout remains compact and readable.

## Today-First Experience

- [ ] Confirm Today Command Center is the first major right-panel section.
- [ ] Confirm Selected Day Details appears below Today Command Center.
- [ ] Confirm Today Overview shows incomplete, overdue, done, and this-week-open metrics.
- [ ] Confirm Week Pressure appears beside the this-week-open metric.
- [ ] Confirm Week Pressure changes when current-week tasks are created, completed, or become overdue.
- [ ] Confirm Today Action List appears below Today Command Center and above Selected Day Details.
- [ ] Confirm Today Action List shows overdue unfinished tasks and today unfinished tasks.
- [ ] Confirm Today Action List shows overdue unfinished tasks before today unfinished tasks.
- [ ] Confirm Today Action List excludes done tasks and caps visible actions at 5 with a `+N more actions` note.
- [ ] Confirm Today Action List ignores toolbar search/status filters while calendar and Selected Day Details still honor them.
- [ ] Confirm Today Action List Mark done removes the item from the action queue.
- [ ] Confirm Today Action List Edit opens the existing task edit form.
- [ ] Confirm Today Action List Jump switches to the task date without mutating task data.
- [ ] Confirm Today Action List shows `No urgent actions right now.` when no overdue or today incomplete tasks exist.
- [ ] Confirm Today Action List visually treats Done as the primary action and Edit/Jump as secondary actions.
- [ ] Confirm Today Action List remains compact and readable around a 1024x720 window.
- [ ] Confirm Selected Day Details changes to `Full Today Details` when the selected date is today.
- [ ] Confirm Show today incomplete selects today and filters unfinished today tasks.
- [ ] Confirm Clear filters resets search, status filter, and Today incomplete mode.

## First-Run And Empty Data

- [ ] Start with a clean Electron profile or cleared app localStorage.
- [ ] Confirm the first-run panel appears.
- [ ] Choose Start blank and confirm schema v1 stores an empty task array.
- [ ] Reopen the app and confirm valid empty v1 data does not show first-run again.
- [ ] From Start blank, create a minimal task, close/reopen, and confirm first-run does not return.
- [ ] Confirm the saved minimal task loads after close/reopen.
- [ ] Reset to clean storage and choose Use demo data.
- [ ] Confirm demo tasks load and Today Command Center remains visible.
- [ ] Reset to clean storage and choose Import tasks.
- [ ] Confirm valid imported tasks load and render.
- [ ] Import `{ "version": 1, "tasks": [] }` and confirm the app restarts into the normal empty calendar state without showing first-run.
- [ ] Confirm the empty import restart shows `Empty task list imported.` after recovery.
- [ ] Click New Task after the empty import restart and confirm Title and Description are immediately editable.
- [ ] After the empty JSON import restart, click New Task, create a minimal task, close/reopen, and confirm the task persists without first-run returning.
- [ ] Confirm corrupted localStorage is backed up before fallback and does not crash the app.

## Task CRUD

- [ ] Create a new task from the toolbar or File menu.
- [ ] Confirm the new task appears in the calendar cell.
- [ ] Confirm the new task appears in the selected-day detail panel.
- [ ] Edit the task title, description, date, time, status, and assignee/tag.
- [ ] Confirm edited values update in the calendar and detail panel.
- [ ] Delete the task from the edit form.
- [ ] Confirm delete asks for confirmation.
- [ ] Confirm the deleted task is removed from the calendar and detail panel.

## Status And Filters

- [ ] Mark a task done from the right detail panel.
- [ ] Confirm the done task is visually subdued.
- [ ] Search by task title.
- [ ] Search by description.
- [ ] Search by assignee/tag.
- [ ] Use the status select to choose All.
- [ ] Use the status select to choose Todo.
- [ ] Use the status select to choose In progress.
- [ ] Use the status select to choose Done.
- [ ] Use the status select to choose Overdue and confirm overdue is calculated dynamically.
- [ ] Confirm empty states appear when no tasks match current filters.

## Import, Export, And Demo Data

- [ ] Export tasks and confirm a JSON file downloads.
- [ ] Import a valid JSON task file.
- [ ] Confirm import asks for confirmation before replacing data outside first-run.
- [ ] Confirm imported tasks render after import.
- [ ] Import a non-empty JSON file and confirm it does not restart the app.
- [ ] Try invalid imported JSON and confirm it is rejected without crashing.
- [ ] Use Reset demo data.
- [ ] Confirm reset asks for confirmation.
- [ ] Confirm seed demo tasks return after reset.

## Persistence

- [ ] Create or edit a task.
- [ ] Close the app normally.
- [ ] Reopen the same app build.
- [ ] Confirm the task persists from `localStorage`.
- [ ] Confirm packaged app data is stored under `%APPDATA%\Task Calendar\`, not inside the portable app folder.
- [ ] Mark a task done.
- [ ] Close and reopen again.
- [ ] Confirm the done status persists.

## Desktop Menu And Shortcuts

- [ ] File > New Task opens the task form.
- [ ] File > Import Tasks opens the import flow.
- [ ] File > Export Tasks starts export.
- [ ] File > Reset Demo Data starts reset confirmation.
- [ ] File > Quit quits the app.
- [ ] View > Reload reloads the renderer.
- [ ] View > Toggle Developer Tools toggles DevTools.
- [ ] Help > About Task Calendar opens About information.
- [ ] `Ctrl/Cmd+N` opens New Task.
- [ ] `Ctrl/Cmd+I` opens Import Tasks.
- [ ] `Ctrl/Cmd+E` starts Export Tasks.
- [ ] `Ctrl/Cmd+R` reloads.
- [ ] `Ctrl/Cmd+Shift+I` toggles DevTools.
- [ ] `F12` toggles DevTools.
- [ ] `Ctrl/Cmd+Q` quits where supported.

## Security And Console

- [ ] In the renderer console, confirm `typeof require === "undefined"`.
- [ ] In the renderer console, confirm `typeof process === "undefined"`.
- [ ] In the renderer console, confirm `typeof window.process === "undefined"`.
- [ ] Confirm no Electron Content Security Policy warning appears.
- [ ] Confirm the renderer console has no unexpected errors.
- [ ] Confirm the renderer console has no unexpected warnings.

## Portable ZIP

- [ ] Copy `dist/Task Calendar-0.4.0-portable-x64.zip` to a separate normal folder.
- [ ] Extract `dist/Task Calendar-0.4.0-portable-x64.zip` to a normal folder.
- [ ] Launch the extracted `TaskCalendar.exe`.
- [ ] Confirm the calendar renders.
- [ ] Confirm Today Command Center and Week Pressure render.
- [ ] Confirm Today Action List renders and supports Done, Edit, and Jump.
- [ ] Confirm first-run flows work in a clean extracted-app profile.
- [ ] Confirm empty JSON import restarts the extracted app and returns to a normal empty calendar state.
- [ ] Choose Start blank, create a task, close/reopen the same extracted `TaskCalendar.exe`, and confirm the task persists.
- [ ] Confirm CRUD works.
- [ ] Confirm localStorage persists after close and reopen.
- [ ] Confirm import/export works.
- [ ] Confirm menus and shortcuts work.
- [ ] Avoid using system temporary folders for baseline validation.
