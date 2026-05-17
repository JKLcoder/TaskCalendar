# Task Calendar

Task Calendar is a local-first desktop command center for today's work.

Chinese positioning: Task Calendar 是一个本地优先的桌面今日工作台：打开就知道今天先做什么，晚上知道完成得怎么样，数据始终在自己电脑上。

Task Calendar exists for people who want a calmer way to run a workday without sending task data to another cloud service. It combines a month calendar board, a Today-first execution queue, daily wrap-up signals, and explicit local data controls.

This project is currently a beta/local prototype. It is not a signed production release and is not commercially available yet.

## Key Features

- Month calendar task board.
- Task create, edit, delete, and mark done.
- Today Command Center for today's workload and this week's pressure.
- Today Action List for overdue and today unfinished tasks.
- End-of-Day Review for done, remaining, and overdue counts.
- First-run choices: Start blank, Use demo data, or Import tasks.
- JSON import/export.
- Data & Settings with local data path, backup export, and JSON restore.
- Windows unpacked and portable ZIP builds.
- Native Electron menu and shortcuts.

## Download And Run

For beta testing, use the portable ZIP artifact from the project owner or the GitHub release package when available:

```text
dist/Task Calendar-0.6.0-portable-x64.zip
```

To run the portable build:

1. Extract the ZIP to a normal folder.
2. Launch `TaskCalendar.exe`.
3. If Windows shows a trust warning, review it carefully. The current build is unsigned.

Do not treat the portable folder as the data folder. Moving the portable app folder does not move your task data.

## Local Data

Task data is stored in the Electron user profile `localStorage` under:

```text
%APPDATA%\Task Calendar\
```

The portable ZIP does not store task data inside the extracted app folder. Use JSON export/import if you want to move tasks between Windows profiles or machines.

## Backup And Restore

Open `File > Data & Settings...` in the app.

The Data & Settings dialog shows:

- App version.
- Data location.
- Storage type.
- Current task count.
- Portable data note.

Available data actions:

- Open data location: opens the Electron userData folder.
- Export backup: writes a schema v1 JSON backup through a native save dialog.
- Restore from JSON: validates schema v1 JSON, asks before replacing current tasks, and restarts the app after a successful restore.

Restore from JSON is a full local data replacement.

## Current Limitations

- The Windows app is unsigned and may trigger trust warnings.
- The app icon is a placeholder.
- There is no installer.
- There is no cloud sync.
- There is no account system.
- There is no database or backend.
- There is no auto-update.
- There is no tray integration.
- There are no reminders or notifications.
- Portable ZIP data is stored under `%APPDATA%\Task Calendar\`, not inside the extracted folder.

## Feedback

Feedback link placeholder: add public form, GitHub discussion, or issue link before inviting external beta users.

Useful feedback topics:

- Did Task Calendar help you know what to do first today?
- Did the local-first/no-account model feel valuable?
- What would stop you from using it daily?
- Would you pay for a stable local desktop tool like this?

See [feedback guide](docs/feedback-guide.md) for the full beta question list.

## Documentation

- [Product positioning](docs/product-positioning.md)
- [Beta test guide](docs/beta-test-guide.md)
- [Feedback guide](docs/feedback-guide.md)
- [Commercialization hypothesis](docs/commercialization-hypothesis.md)
- [Screenshots checklist](docs/screenshots-checklist.md)
- [Release notes](RELEASE_NOTES.md)
- [Manual test checklist](TEST_CHECKLIST.md)
- [Known limitations](docs/known-limitations.md)
- [Release checklist](docs/release-checklist.md)

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
- Extract the portable ZIP to a normal folder before running.

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
