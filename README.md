# Task Calendar

Task Calendar is a local Electron desktop prototype for managing tasks on a month calendar board. It focuses on a Today-first workflow: open the app, see today's workload, understand this week's pressure, and manage tasks from a compact desktop calendar.

This repository is preparing the v0.3.0 local testing baseline. It is intended for desktop smoke testing and prototype review, not production distribution.

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
- `npm run dist:portable` generates `dist/Task Calendar-0.3.0-portable-x64.zip`.
- To run the portable build, extract the ZIP to a normal folder first, then launch `TaskCalendar.exe`.
- Running the app directly from temporary folders may be unreliable in some Windows/Electron environments.

## Desktop Menu

- File: New Task, Import Tasks, Export Tasks, Reset Demo Data, Quit.
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
- Data is local to the Electron app profile `localStorage`.
- No cloud sync, installer, auto-update, reminders, notifications, tray integration, database, backend, or account system.
- Portable ZIP should be extracted before running.
