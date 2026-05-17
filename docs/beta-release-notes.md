# Beta Release Notes: v0.7.0

Task Calendar v0.7.0 is a beta/local prototype for testing a local-first desktop command center for today's work. It is not production-ready, not signed, and not commercially available.

## What Task Calendar Is

Task Calendar helps individual desktop users see today's work, decide what to do next, review what remains at the end of the day, and keep local task data under their own control.

It is designed around a Today-first workflow:

- Open the app.
- See today's workload and overdue work.
- Work from a short action list.
- Review what was done and what remains.
- Backup or restore local JSON data when needed.

## What This Beta Is For

Use this beta to test whether Task Calendar helps with:

- Understanding what to do first today.
- Seeing overdue and today unfinished tasks in one place.
- Closing the day with a clearer sense of progress.
- Trusting a local-first task tool with visible data location and manual backup/restore.

Do not use this beta as the only copy of critical production task data.

## Main Features To Try

### Today Command Center

Shows today's incomplete, overdue, done, and this-week-open task counts, plus Week Pressure.

### Today Action List

Shows overdue unfinished tasks and today unfinished tasks as a short execution queue.

### End-of-Day Review

Shows Done today, Remaining today, Overdue today, and completion copy such as `3 of 7 done`.

### Data & Settings

Shows app version, data location, storage type, current task count, and portable data behavior.

### Backup / Restore

Exports schema v1 JSON backups and restores valid schema v1 JSON data. Restore from JSON restarts the app after a successful restore.

## Current Limitations

- The Windows app is unsigned.
- Windows may show trust warnings.
- The app icon is a placeholder.
- There is no installer.
- There is no cloud sync.
- There is no account system.
- There are no reminders or notifications.
- Local data is stored under `%APPDATA%\Task Calendar\`.
- Portable ZIP data is not stored inside the extracted portable folder.

## Feedback Goal

The most useful beta feedback is not "it is nice." The useful question is:

Does Task Calendar make your workday clearer enough that you would keep using it?
