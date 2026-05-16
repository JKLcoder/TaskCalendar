# Release Notes

## v0.3.0 - Desktop Layout Release Baseline

Task Calendar v0.3.0 focuses on making the desktop workspace feel stable, compact, and easier to scan without adding new business features or changing storage schema v1.

### Major Changes

- Fixed the desktop app shell layout so the app behaves like a contained work surface.
- Aligned calendar and right panel heights for a more coherent desktop composition.
- Kept the right panel independently scrollable while avoiding whole-page scrolling in normal desktop use.
- Anchored date numbers to the top-left of calendar cells while tasks stack downward.
- Changed status filtering from a larger button group to a compact status select.
- Polished right-panel density across Today Overview, Selected Day Details, the status legend, task cards, and metadata.
- Preserved Today Command Center, Week Pressure, first-run options, import/export, and localStorage schema v1.

### Preserved Behavior

- Task create, edit, delete, and mark done.
- Dynamic overdue visual state for unfinished tasks.
- Search by title, description, and assignee/tag.
- Status filters for All, Todo, In progress, Done, and Overdue.
- Today incomplete quick filter.
- Clear filters and active-filter summary.
- JSON import and export, including native menu and shortcut import.
- Reset demo data.
- `localStorage` schema v1 compatibility.
- Native Electron menu and shortcuts.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.3.0-portable-x64.zip`
- Builds are unsigned local test artifacts and are not production releases.

### Security Baseline

- `nodeIntegration` remains disabled.
- `contextIsolation` remains enabled.
- `sandbox` remains enabled.
- Renderer cannot access `require`, `process`, or `window.process`.
- A restrictive local-only Content Security Policy remains configured.
- No backend service, remote sync, database, account system, or cloud access is included.

### Known Limitations

- Unsigned app may trigger Windows trust warnings.
- App icon is a placeholder.
- Data is local only and not synced across devices.
- No installer, auto-update, tray integration, reminder, notification, cloud sync, backend, database, or account system.
- Portable ZIP should be extracted to a normal folder before running.
- Running directly from temporary folders may be unreliable.

### Recommended Testing Notes

- Run the full manual checklist in `TEST_CHECKLIST.md` before treating a build as the v0.3.0 baseline.
- Verify both `dist/win-unpacked/TaskCalendar.exe` and the extracted portable ZIP.
- Confirm fixed shell layout, right-panel independent scrolling, status select filtering, and compact right-panel layout.
- Confirm first-run flows using a clean Electron profile.
- Confirm native menu and shortcut import/export flows.
- Confirm the renderer console has no unexpected errors or warnings.
- Confirm the Electron CSP warning does not return.
- Confirm localStorage persists after normal close and reopen.

## v0.2.0 - Today-First Release Baseline

Task Calendar v0.2.0 prepares the prototype around a clearer Today-first desktop experience: users should immediately understand what is due today, how much pressure exists this week, and how to start with their own data.

### Major Changes

- Added Today Command Center above Selected Day Details.
- Added Today Overview metrics for incomplete, overdue, done, and this-week-open tasks.
- Added Week Pressure signal with Low, Medium, High, and Critical levels.
- Changed cold startup to focus the real system today and current month.
- Added first-run start options when no valid saved data exists:
  - Start blank.
  - Use demo data.
  - Import tasks.
- Start blank stores schema v1 with an empty task array.
- Use demo data stores the existing seed task set.
- Corrupted localStorage data is backed up before returning to first-run choice.
- Compact desktop layout reduces side whitespace, tightens the toolbar, and compresses the right-side Today Overview.

### Preserved Behavior

- Task create, edit, delete, and mark done.
- Dynamic overdue visual state for unfinished tasks.
- Search by title, description, and assignee/tag.
- Status filters for All, Todo, In progress, Done, and Overdue.
- Today incomplete quick filter.
- Clear filters and active-filter summary.
- Toast feedback for common operations.
- JSON import and export.
- Reset demo data.
- `localStorage` schema v1 compatibility.
- Native Electron menu and shortcuts.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.2.0-portable-x64.zip`
- The app includes a placeholder Windows icon and basic executable metadata.
- Builds are unsigned local test artifacts and are not production releases.

### Storage Behavior

- Task data is stored locally in the Electron profile with browser `localStorage`.
- Storage schema version remains v1.
- Valid empty v1 data is treated as intentional and does not trigger first-run again.
- Missing storage shows the first-run start options.
- Invalid or corrupted storage is backed up under a corrupted backup key before the user chooses how to restart.
- Import replaces current tasks only after validation and user confirmation outside first-run.

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

- Run the full manual checklist in `TEST_CHECKLIST.md` before treating a build as the v0.2.0 baseline.
- Verify both `dist/win-unpacked/TaskCalendar.exe` and the extracted portable ZIP.
- Confirm first-run flows using a clean Electron profile.
- Confirm the renderer console has no unexpected errors or warnings.
- Confirm the Electron CSP warning does not return.
- Confirm localStorage persists after normal close and reopen.

## v0.1.0 - Local Testing Baseline

Task Calendar v0.1.0 froze the initial local Electron prototype as a baseline for manual testing, packaging validation, and product review.

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

- Electron desktop shell was available through `npm start`.
- Windows unpacked build was generated with `npm run pack`.
- Portable ZIP build was generated with `npm run dist:portable`.
- Expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.1.0-portable-x64.zip`
- Builds were unsigned local test artifacts and not production releases.

### Security Baseline

- `nodeIntegration` disabled.
- `contextIsolation` enabled.
- `sandbox` enabled.
- Renderer could not access `require`, `process`, or `window.process`.
- Restrictive local-only Content Security Policy configured.
