# Release Notes

## v0.1.0 - Local Testing Baseline

Task Calendar v0.1.0 freezes the current local Electron prototype as a baseline for manual testing, packaging validation, and product review.

### Major Features

- Month calendar task board with selected-day detail panel.
- Task create, edit, delete, and mark done.
- Dynamic overdue visual state for unfinished tasks.
- Search by title, description, and assignee/tag.
- Status filters for All, Todo, In progress, Done, and Overdue.
- Today incomplete quick filter.
- Clear filters and compact active-filter summary.
- Toast feedback for common operations.
- JSON import and export.
- Reset demo data for prototype demonstrations.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.1.0-portable-x64.zip`
- The app includes a placeholder Windows icon and basic executable metadata.
- Builds are unsigned local test artifacts and are not production releases.

### Storage Behavior

- Task data is stored locally in the Electron profile with browser `localStorage`.
- Storage schema version is v1.
- If storage is empty, the app seeds demo task data.
- If invalid or corrupted storage is detected, the app backs it up under a corrupted backup key and restores seed data.
- Import replaces current tasks only after user confirmation and validation.

### Security Baseline

- `nodeIntegration` is disabled.
- `contextIsolation` is enabled.
- `sandbox` is enabled.
- Renderer cannot access `require`, `process`, or `window.process`.
- A restrictive local-only Content Security Policy is configured.
- No backend service, remote sync, database, account system, or cloud access is included.

### Known Limitations

- Unsigned app may trigger Windows trust warnings.
- App icon is a placeholder.
- Data is local only and not synced across devices.
- No installer, auto-update, tray integration, reminder, notification, cloud sync, backend, database, or account system.
- Portable ZIP should be extracted to a normal folder before running.
- Running directly from temporary folders may be unreliable.

### Recommended Testing Notes

- Run the full manual checklist in `TEST_CHECKLIST.md` before treating a build as the v0.1.0 baseline.
- Verify both `dist/win-unpacked/TaskCalendar.exe` and the extracted portable ZIP.
- Confirm the renderer console has no errors or warnings.
- Confirm the Electron CSP warning does not return.
- Confirm localStorage persists after normal close and reopen.
