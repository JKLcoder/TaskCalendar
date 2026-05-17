# Task Calendar Beta Landing

Task Calendar is a local-first desktop command center for today's work.

It helps you open the app, see what matters today, understand this week's pressure, and close the day with a simple review. It is a beta/local prototype, not a production-ready commercial release.

## Who It Is For

Task Calendar may be useful if you:

- Work mostly from a Windows desktop.
- Want a personal task tool without an account.
- Prefer local data and manual backup/restore.
- Need help deciding what to do first today.
- Want a lightweight alternative to heavy project-management tools.

## The Problem It Solves

Daily work often starts scattered across calendars, notes, chat messages, and todo lists. Task Calendar gives you one local desktop workspace for:

- Today status.
- Overdue and today action items.
- End-of-day wrap-up.
- A month view of task distribution.
- User-controlled backup and restore.

## Key Screenshot Placeholders

Add screenshots before sharing the landing page widely:

- [Screenshot: main calendar workspace]
- [Screenshot: Today Command Center]
- [Screenshot: Today Action List]
- [Screenshot: End-of-Day Review]
- [Screenshot: Data & Settings]
- [Screenshot: Export backup / Restore from JSON]

## Download

Download link placeholder:

```text
https://github.com/JKLcoder/TaskCalendar/releases/tag/v0.7.0
```

Use the portable ZIP:

```text
Task.Calendar-0.7.0-portable-x64.zip
```

To run it:

1. Download the ZIP.
2. Extract it to a normal folder.
3. Run `TaskCalendar.exe`.
4. Review any Windows trust warning carefully. The current beta is unsigned.

Do not run the app directly from inside the ZIP.

## Feedback

Submit beta feedback:

```text
https://wj.qq.com/s2/26709573/338b/
```

Suggested trial length: 3 days.

Useful feedback:

- Did it help you know what to do first today?
- Did Today Action List feel useful or redundant?
- Did End-of-Day Review help you close the day?
- Did local-first/no-account increase trust?
- What would stop you from using it daily?
- Would you pay for a stable local desktop tool like this?

## Data Storage

Task Calendar stores task data locally through Electron `localStorage`.

On Windows packaged builds, data is stored under:

```text
%APPDATA%\Task Calendar\
```

Portable ZIP data is not stored inside the extracted portable folder. Moving the portable folder does not move your task data.

Use `File > Data & Settings...` to:

- See the data location.
- Open the data location.
- Export a JSON backup.
- Restore from JSON.

## Beta Limitations

- Beta/local prototype.
- Not production-ready.
- Unsigned Windows app.
- Placeholder icon.
- No installer.
- No cloud sync.
- No account system.
- No payments or commercial license flow.
- No reminders or notifications.
- No auto-update.
- Portable ZIP data is stored under `%APPDATA%\Task Calendar\`, not inside the extracted folder.
