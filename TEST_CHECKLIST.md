# Manual Test Checklist

Use this checklist for the v0.1.0 local testing baseline. Mark each item after testing both the development app when needed and the packaged Windows app artifacts.

## Setup

- [ ] Run `npm install`.
- [ ] Run `npm audit` and confirm 0 vulnerabilities.
- [ ] Run `node --check main.js app.js storage.js`.
- [ ] Run `npm start` and confirm the desktop app launches.
- [ ] Run `npm run pack`.
- [ ] Run `npm run dist:portable`.
- [ ] Confirm `dist/win-unpacked/TaskCalendar.exe` exists.
- [ ] Confirm `dist/Task Calendar-0.1.0-portable-x64.zip` exists.

## App Launch And Rendering

- [ ] Launch the development app with `npm start`.
- [ ] Launch `dist/win-unpacked/TaskCalendar.exe`.
- [ ] Extract the portable ZIP to a normal folder and launch `TaskCalendar.exe`.
- [ ] Confirm the window title is `Task Calendar`.
- [ ] Confirm the May 2026 month calendar renders.
- [ ] Confirm the right-side selected-day detail panel renders.
- [ ] Confirm task summary cards appear in calendar cells.
- [ ] Confirm each day shows at most 3 task cards plus `+N more` when needed.

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
- [ ] Use the All status filter.
- [ ] Use the Todo status filter.
- [ ] Use the In progress status filter.
- [ ] Use the Done status filter.
- [ ] Use the Overdue status filter and confirm overdue is calculated dynamically.
- [ ] Use Today incomplete and confirm the calendar switches to the real current month and selects today.
- [ ] Use Clear filters and confirm search, status filter, and Today incomplete mode reset.
- [ ] Confirm empty states appear when no tasks match current filters.

## Import, Export, And Demo Data

- [ ] Export tasks and confirm a JSON file downloads.
- [ ] Import a valid JSON task file.
- [ ] Confirm import asks for confirmation before replacing data.
- [ ] Confirm imported tasks render after import.
- [ ] Try invalid imported JSON and confirm it is rejected without crashing.
- [ ] Use Reset demo data.
- [ ] Confirm reset asks for confirmation.
- [ ] Confirm seed demo tasks return after reset.

## Persistence

- [ ] Create or edit a task.
- [ ] Close the app normally.
- [ ] Reopen the same app build.
- [ ] Confirm the task persists from `localStorage`.
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

- [ ] Extract `dist/Task Calendar-0.1.0-portable-x64.zip` to a normal folder.
- [ ] Launch the extracted `TaskCalendar.exe`.
- [ ] Confirm the calendar renders.
- [ ] Confirm CRUD works.
- [ ] Confirm localStorage persists after close and reopen.
- [ ] Confirm import/export works.
- [ ] Confirm menus and shortcuts work.
- [ ] Avoid using system temporary folders for baseline validation.
