# Task Calendar

Task Calendar is a local Electron desktop prototype for managing tasks on a month calendar board. It focuses on a Today-first workflow: open the app, see today's workload, understand this week's pressure, and manage tasks from a compact desktop calendar.

This repository is preparing the v0.6.0 local testing baseline. It is intended for desktop smoke testing and prototype review, not production distribution.

## Development Run

```bash
npm install
npm start
```

`npm start` launches the Electron shell around the local `index.html` app.

## Package Locally

```bash
npm run pack
npm run dist:portable
```

- `npm run pack` generates an unpacked Windows build at `dist/win-unpacked/`.
- `npm run dist:portable` generates `dist/Task Calendar-0.6.0-portable-x64.zip`.
- To run the portable build, extract the ZIP to a normal folder first, then launch `TaskCalendar.exe`.
- Running the app directly from temporary folders may be unreliable in some Windows/Electron environments.

## Local Data Location

Task data is stored in the Electron user profile `localStorage` under:

```text
%APPDATA%\Task Calendar\
```

The portable ZIP does not store task data inside the extracted app folder. Moving the portable app folder does not move user data; export JSON first if you want to transfer tasks to another Windows profile or machine.

## Data & Settings

Open `File > Data & Settings...` to view local data details and run basic data operations.

- Shows app version, resolved data location, storage type, current task count, and the portable data note.
- Open data location opens the Electron userData folder.
- Export backup writes a schema v1 JSON backup through a native save dialog.
- Restore from JSON validates schema v1 data, asks before replacing current tasks, and restarts the app after a successful restore.

## Desktop Menu

- File: New Task, Import Tasks, Export Tasks, Reset Demo Data, Data & Settings, Quit.
- View: Reload, Toggle Developer Tools.
- Help: About Task Calendar.

## Shortcuts

- `Ctrl/Cmd+N`: New Task.
- `Ctrl/Cmd+I`: Import Tasks.
- `Ctrl/Cmd+E`: Export Tasks.
- `Ctrl/Cmd+R`: Reload.
- `Ctrl/Cmd+Shift+I`: Toggle Developer Tools.
- `F12`: Toggle Developer Tools.
- `Ctrl/Cmd+Q`: Quit.

## v0.6.0 Scope

- Local Data & Settings release for making local data location, backup, and restore behavior explicit.
- Added `File > Data & Settings...`.
- Added a compact Data & Settings modal.
- The modal shows app version, resolved data location, storage type, current task count, and a portable data note.
- Open data location opens the Electron userData folder.
- Export backup writes schema v1 JSON through a native save dialog.
- Restore from JSON validates schema v1 data, confirms replacement, saves restored tasks, and restarts the app after success.
- Portable ZIP data remains stored in the Electron user profile, not inside the extracted portable folder.
- No task schema or Electron security setting changes are included.
- No Clear all tasks, cloud sync, database, account system, installer, auto-update, tray, or reminder workflow is included.

## v0.5.0 Scope

- End-of-Day Review release for moving from "what should I do next?" to "how do I wrap today?"
- Added End-of-Day Review / Wrap Today below Today Action List and above Selected Day Details.
- The review shows Done today, Remaining today, and Overdue today counts.
- The review shows compact completion copy such as `3 of 7 done`.
- View remaining today reuses the existing Today incomplete behavior.
- Review values are computed from existing task data and are not persisted.
- No task schema or Electron security setting changes are included.
- No dashboard, chart, AI summary, reminder, move-to-tomorrow, or batch reschedule workflow is included.

## v0.4.0 Scope

- Today Execution Loop release for moving from "what is today?" to "what should I do next?"
- Added Today Action List below Today Command Center and above Selected Day Details.
- Today Action List shows overdue unfinished tasks and today unfinished tasks.
- Done tasks are excluded from the action queue by default.
- The list shows at most 5 visible actions with a `+N more actions` note.
- Action items support Done, Edit, and Jump without adding new task fields.
- Today Action List is independent from toolbar search/status filters.
- Selected-day details are labeled `Full Today Details` when the selected day is today.
- Done is visually primary; Edit and Jump are secondary actions.
- No task schema or Electron security setting changes are included.

## v0.3.2 Scope

- Data Trust Hotfix release for empty JSON import recovery.
- Importing `{ "version": 1, "tasks": [] }` saves a valid empty schema v1 payload.
- After the empty import is saved, the app restarts through a limited Electron IPC action.
- After restart, first-run does not return and New Task is immediately editable.
- Tasks created after empty import recovery persist after close/reopen.
- No task schema, UI redesign, or Electron security setting changes are included.

## v0.3.1 Scope

- Hotfix release for first-run persistence detection.
- Valid schema v1 empty payloads suppress first-run.
- Start blank plus a newly created task persists after close/reopen.
- Clean rebuilt `win-unpacked` and portable ZIP artifacts persist data through the shared Electron user profile.

## v0.3.0 Scope

- Fixed desktop app shell layout for a stable work area.
- Calendar and right panel heights align within the desktop workspace.
- Right panel scrolls independently while the whole page stays fixed in normal desktop use.
- Calendar date numbers stay anchored top-left while tasks flow downward.
- Compact status select replaces the larger status filter button group.
- Right panel density polish tightens Today Overview, Selected Day Details, status legend, task cards, and metadata.
- Today Command Center with today incomplete, overdue, done, and this-week-open metrics.
- Week Pressure signal based on current Monday-Sunday open and overdue tasks.
- First-run start options: Start blank, Use demo data, or Import tasks.
- Month calendar task board with selected-day detail panel.
- Task create, edit, delete, and mark done.
- Search, status filters, Today incomplete, Clear filters, and toast feedback.
- JSON import and export.
- Reset demo data.
- `localStorage` schema v1 with corrupted-data backup fallback.
- Electron desktop shell with native menu and shortcuts.
- Renderer security baseline: `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true`, and local-only CSP.
- Windows `win-unpacked` and portable ZIP local build outputs.
- Placeholder Windows app icon and basic executable metadata.

## Documentation

- [Release notes](RELEASE_NOTES.md)
- [Manual test checklist](TEST_CHECKLIST.md)
- [Known limitations](docs/known-limitations.md)
- [Release checklist](docs/release-checklist.md)

## Current Limitations

- Packaged output is unsigned local prototype output, not a signed production release.
- Windows may show trust warnings for the unsigned app.
- The app icon is a simple placeholder calendar/check mark.
- Data is local to the Electron app profile `localStorage` under `%APPDATA%\Task Calendar\`.
- Portable app data is not stored inside the extracted app folder.
- No cloud sync, installer, auto-update, reminders, notifications, tray integration, database, backend, or account system.
- Portable ZIP should be extracted before running.
- Importing an empty JSON task list intentionally restarts the app after saving the empty schema v1 payload.
- Restore from JSON is a full local data replacement and intentionally restarts the app after a successful restore.
