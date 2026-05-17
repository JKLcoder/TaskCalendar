# Beta Test Guide

Task Calendar is currently a beta/local prototype. It is useful for product feedback and local workflow testing, not production-critical task storage.

## Who Should Try It

Try Task Calendar if you:

- Work mostly from a Windows desktop.
- Want a local-first daily task command center.
- Prefer no account and no cloud requirement for basic task management.
- Want to see today, overdue work, and end-of-day status in one place.
- Are comfortable testing an unsigned prototype app.

## Download The Portable ZIP

Use the portable ZIP provided by the project owner or GitHub release package when available:

```text
Task Calendar-0.6.0-portable-x64.zip
```

## Run The App

1. Copy the ZIP to a normal folder.
2. Extract the ZIP.
3. Run `TaskCalendar.exe`.
4. If Windows shows a trust warning, review it carefully. The current beta is unsigned.

Do not run the app directly from inside the ZIP.

## Where Data Is Stored

Task data is stored in the Electron user profile `localStorage`.

On Windows packaged builds, the data location is:

```text
%APPDATA%\Task Calendar\
```

Portable ZIP data is not stored inside the extracted portable folder. Moving the portable app folder does not move task data.

## Backup And Export

Open:

```text
File > Data & Settings...
```

Then choose:

```text
Export backup
```

This writes a schema v1 JSON backup through a native save dialog.

## Restore And Import

Open:

```text
File > Data & Settings...
```

Then choose:

```text
Restore from JSON
```

Restore from JSON validates schema v1 data, asks before replacing current tasks, and restarts the app after a successful restore.

You can also use the regular Import Tasks flow for task JSON import.

## Report Feedback

Use the feedback link shared by the project owner, or open a GitHub issue/discussion when enabled.

When reporting feedback, include:

- Windows version.
- App version.
- Whether you used `win-unpacked` or portable ZIP.
- What you were trying to do.
- What happened.
- Whether your data was imported, restored, or created from Start blank.

See [feedback guide](feedback-guide.md) for product feedback questions.

## Current Limitations

- Unsigned Windows app.
- Placeholder icon.
- No installer.
- No cloud sync.
- No account system.
- No reminders or notifications.
- No tray integration.
- Portable data is stored under `%APPDATA%\Task Calendar\`, not inside the extracted folder.
- Export/import is the current backup and restore path.
