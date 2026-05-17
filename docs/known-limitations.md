# Known Limitations

This document captures the known limitations for the v0.6.0 local testing baseline.

## Distribution

- The app is unsigned and may trigger Windows trust warnings.
- There is no installer.
- There is no code signing.
- There is no production release or publishing workflow.
- Portable ZIP output should be extracted before running.
- Running directly from temporary folders may be unreliable in some Windows/Electron environments.

## Product Scope

- The app icon is a placeholder.
- Week Pressure is a lightweight heuristic, not a full workload analytics system.
- End-of-Day Review is a lightweight daily wrap-up, not a dashboard, charting system, or AI summary.
- There is no cloud sync.
- There is no backend service.
- There is no database.
- There is no account or authentication system.
- There is no auto-update.
- There is no tray integration.
- There is no reminder or notification system.
- There is no collaboration or project-management workflow.

## Data

- Task data is stored locally in the Electron profile `localStorage`.
- On Windows packaged builds, the Electron user profile is under `%APPDATA%\Task Calendar\`.
- Portable ZIP builds do not store task data inside the extracted app folder.
- Moving the portable app folder does not move user data; use JSON export/import to transfer tasks between Windows profiles or machines.
- Storage schema remains v1.
- Data does not sync between machines or Windows user profiles.
- Clearing the Electron app profile can remove local task data.
- Export/import is the only manual backup and restore path in this prototype.
- Importing an empty JSON payload such as `{ "version": 1, "tasks": [] }` intentionally restarts the app after saving the valid empty schema v1 payload.
- Restore from JSON is a full local data replacement and intentionally restarts the app after a successful restore.
- Clear all tasks is not included in v0.6.0.

## Platform Notes

- Windows packaged builds are the current validation target.
- The portable artifact is a ZIP-based local build, not a signed installer.
- Temporary-folder execution may fail or behave inconsistently; extract to a normal folder before launching.
