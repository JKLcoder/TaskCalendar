# Release Notes

## v0.7.0 - Commercial Validation / Beta Distribution

Task Calendar v0.7.0 is a Commercial Validation / Beta Distribution release. It prepares the project for external beta users to understand, download, try, and give feedback on the local-first Today-first workflow.

This is still a beta/local prototype. It is not production-ready, not signed, and not commercially available.

### Major Changes

- Added commercial validation documentation.
- Added product positioning documentation.
- Added beta test guide.
- Added feedback guide.
- Added commercialization hypothesis.
- Added screenshots checklist.
- Added beta release notes.
- Added beta invitation message.
- Added beta feedback form.
- Added beta distribution checklist.
- Updated README toward an external beta-user entry point.

### Commercialization Boundary

- No payment flow.
- No subscription.
- No account system.
- No cloud sync.
- No license server.
- No team collaboration workflow.
- No task schema v1 change.
- No Electron security setting changes.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.7.0-portable-x64.zip`
- Builds are unsigned local beta artifacts and are not production releases.

### Security Baseline

- `nodeIntegration` remains disabled.
- `contextIsolation` remains enabled.
- `sandbox` remains enabled.
- Renderer cannot access `require`, `process`, `window.process`, `fs`, `path`, `shell`, or `ipcRenderer`.
- A restrictive local-only Content Security Policy remains configured.
- No backend service, remote sync, database, account system, or cloud access is included.

### Recommended Testing Notes

- Verify README and beta documentation links.
- Verify beta release notes, invitation message, feedback form, and distribution checklist are ready for external testers.
- Verify packaged artifacts still launch and preserve existing app behavior.
- Confirm existing CRUD, first-run, import/export, Data & Settings, Today Command Center, Week Pressure, Today Action List, End-of-Day Review, localStorage persistence, native menus, shortcuts, renderer security, and CSP warning status remain unchanged.

## v0.6.0 - Local Data & Settings

Task Calendar v0.6.0 adds a lightweight Local Data & Settings surface so users can see where their local data lives, open that folder, export a backup, and restore schema v1 JSON data without adding cloud sync, accounts, a database, or a larger settings system.

### Major Changes

- Added `File > Data & Settings...`.
- Added a compact Data & Settings modal.
- The modal shows app version, data location, storage type, and current task count.
- The modal documents that portable app data is stored in the Electron user profile, not inside the extracted portable folder.
- Added Open data location for the resolved Electron userData folder.
- Added Export backup using the existing schema v1 JSON export payload.
- Added Restore from JSON using the existing schema v1 validation flow.
- Restore from JSON restarts the app after a successful restore to ensure a clean runtime state.
- Task schema remains v1.
- No cloud sync, database, account system, installer, auto-update, tray, or reminder workflow is included.

### Preserved Behavior

- Today Command Center and Week Pressure.
- Today Action List with Done, Edit, and Jump.
- End-of-Day Review / Wrap Today.
- Task create, edit, delete, and mark done.
- Search by title, description, and assignee/tag.
- Status filters for All, Todo, In progress, Done, and Overdue.
- Today incomplete quick filter and Clear filters.
- Existing toolbar/menu import and export behavior.
- Empty JSON import restart recovery.
- Reset demo data.
- First-run Start blank, Use demo data, and Import tasks.
- `localStorage` schema v1 compatibility.
- Native Electron menu and shortcuts.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.6.0-portable-x64.zip`
- Builds are unsigned local test artifacts and are not production releases.

### Security Baseline

- `nodeIntegration` remains disabled.
- `contextIsolation` remains enabled.
- `sandbox` remains enabled.
- Renderer cannot access `require`, `process`, `window.process`, `fs`, `path`, `shell`, or `ipcRenderer`.
- A restrictive local-only Content Security Policy remains configured.
- No backend service, remote sync, database, account system, or cloud access is included.

### Recommended Testing Notes

- Verify Data & Settings values, Open data location, Export backup, Restore from JSON, and restore restart behavior in `npm start`, `dist/win-unpacked/TaskCalendar.exe`, and an extracted portable ZIP.
- Confirm Restore from JSON asks before replacing data, rejects invalid JSON, and does not restart when canceled.
- Confirm existing CRUD, first-run, import/export, Today Command Center, Week Pressure, Today Action List, End-of-Day Review, localStorage persistence, native menus, shortcuts, renderer security, and CSP warning status remain unchanged.

## v0.5.0 - End-of-Day Review

Task Calendar v0.5.0 adds a lightweight End-of-Day Review so the Today-first workflow can close the loop: see what was done, what remains, and what needs attention before the day ends. It does not add charts, AI summaries, reminder systems, or storage schema changes.

### Major Changes

- Added End-of-Day Review / Wrap Today below Today Action List and above Selected Day Details.
- The review shows Done today, Remaining today, and Overdue today counts.
- The review shows compact completion text such as `3 of 7 done`.
- Added View remaining today as the single primary review action.
- View remaining today reuses the existing Today incomplete behavior.
- Review values are computed from existing task data and are not persisted.
- Task schema remains v1.

### Preserved Behavior

- Today Command Center and Week Pressure.
- Today Action List with Done, Edit, and Jump.
- Task create, edit, delete, and mark done.
- Search by title, description, and assignee/tag.
- Status filters for All, Todo, In progress, Done, and Overdue.
- Today incomplete quick filter and Clear filters.
- JSON import/export, including empty JSON import restart recovery.
- Reset demo data.
- First-run Start blank, Use demo data, and Import tasks.
- `localStorage` schema v1 compatibility.
- Native Electron menu and shortcuts.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.5.0-portable-x64.zip`
- Builds are unsigned local test artifacts and are not production releases.

### Security Baseline

- `nodeIntegration` remains disabled.
- `contextIsolation` remains enabled.
- `sandbox` remains enabled.
- Renderer cannot access `require`, `process`, or `window.process`.
- A restrictive local-only Content Security Policy remains configured.
- No backend service, remote sync, database, account system, or cloud access is included.

### Recommended Testing Notes

- Verify End-of-Day Review counts, completion copy, wrapped-up/remaining/overdue states, and View remaining today in `npm start`, `dist/win-unpacked/TaskCalendar.exe`, and an extracted portable ZIP.
- Confirm Today Action List Done/Edit/Jump still works and remains above End-of-Day Review.
- Confirm existing CRUD, import/export, first-run, Today Command Center, Week Pressure, localStorage persistence, native menus, shortcuts, renderer security, and CSP warning status remain unchanged.

## v0.4.0 - Today Execution Loop

Task Calendar v0.4.0 introduces the first Today Execution Loop release. The app now helps users move from "what is on my calendar?" to "what should I do next?" without changing storage schema v1, adding project-management fields, or relaxing Electron security settings.

### Major Changes

- Added Today Action List below Today Command Center and above Selected Day Details.
- Today Action List shows overdue unfinished tasks and today unfinished tasks.
- Done tasks are excluded from the action queue by default.
- The action queue shows at most 5 visible items and uses a compact `+N more actions` note when more actions exist.
- Action items support Done, Edit, and Jump.
- Done marks the task complete and removes it from Today Action List.
- Edit opens the existing task edit modal.
- Jump switches the calendar to the task date without mutating task data.
- Today Action List is computed from all unfinished tasks and remains independent from toolbar search/status filters.
- Selected-day details are labeled `Full Today Details` when the selected date is today.
- Done is styled as the primary action while Edit and Jump remain secondary actions.

### Preserved Behavior

- Task create, edit, delete, and mark done.
- Dynamic overdue visual state for unfinished tasks.
- Search by title, description, and assignee/tag.
- Status filters for All, Todo, In progress, Done, and Overdue.
- Today incomplete quick filter and Clear filters.
- JSON import/export, including empty JSON import restart recovery.
- Reset demo data.
- First-run Start blank, Use demo data, and Import tasks.
- Today Command Center and Week Pressure.
- `localStorage` schema v1 compatibility.
- Native Electron menu and shortcuts.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.4.0-portable-x64.zip`
- Builds are unsigned local test artifacts and are not production releases.

### Security Baseline

- `nodeIntegration` remains disabled.
- `contextIsolation` remains enabled.
- `sandbox` remains enabled.
- Renderer cannot access `require`, `process`, or `window.process`.
- A restrictive local-only Content Security Policy remains configured.
- No backend service, remote sync, database, account system, or cloud access is included.

### Recommended Testing Notes

- Verify Today Action List ordering, item cap, Done/Edit/Jump actions, and filter independence in `npm start`, `dist/win-unpacked/TaskCalendar.exe`, and an extracted portable ZIP.
- Confirm Full Today Details appears when the selected date is today.
- Confirm existing CRUD, import/export, first-run, Today Command Center, Week Pressure, localStorage persistence, native menus, shortcuts, renderer security, and CSP warning status remain unchanged.

## v0.3.2 - Data Trust Hotfix

Task Calendar v0.3.2 is a focused Data Trust Hotfix for empty JSON import recovery. It does not add product features, change UI behavior beyond the recovery flow, change storage schema v1, or relax Electron security settings.

### Bugfixes

- Fixed empty JSON import recovery for payloads such as `{ "version": 1, "tasks": [] }`.
- Empty JSON import now saves a valid empty schema v1 payload before recovery.
- After saving the empty payload, the renderer requests a limited main-process app restart.
- After restart, first-run does not return because the valid empty payload is loaded normally.
- New Task is editable immediately after empty import recovery.
- Tasks saved after empty import recovery persist after close/reopen.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.3.2-portable-x64.zip`
- Builds are unsigned local test artifacts and are not production releases.

### Recommended Testing Notes

- Verify empty JSON import recovery in `npm start`, `dist/win-unpacked/TaskCalendar.exe`, and an extracted portable ZIP.
- Confirm the app restarts after empty JSON import and returns to the normal empty calendar state.
- Confirm first-run does not return after the restart.
- Confirm New Task is editable after recovery, and a saved task persists after close/reopen.
- Confirm renderer security and CSP warning status remain unchanged.

## v0.3.1 - First-Run Persistence Hotfix

Task Calendar v0.3.1 is a focused bugfix release for first-run persistence detection. It does not add product features, change UI behavior, change storage schema v1, or relax Electron security settings.

### Bugfixes

- Fixed first-run persistence detection so startup checks for a valid schema v1 payload instead of relying only on whether the storage key exists.
- Valid schema v1 empty payloads can now suppress first-run.
- Start blank plus creating and saving a task persists after close/reopen without returning to first-run.
- Clean rebuilt `win-unpacked` and portable ZIP artifacts were verified for Start blank persistence.

### Data Location

- Packaged builds store task data in the Electron user profile:
  - `%APPDATA%\Task Calendar\`
- The portable ZIP does not store task data inside the extracted app folder.
- Moving the portable app folder does not move user data.

### Desktop Packaging Status

- Electron desktop shell is available through `npm start`.
- Windows unpacked build is generated with `npm run pack`.
- Portable ZIP build is generated with `npm run dist:portable`.
- Current expected artifacts:
  - `dist/win-unpacked/`
  - `dist/Task Calendar-0.3.1-portable-x64.zip`
- Builds are unsigned local test artifacts and are not production releases.

### Recommended Testing Notes

- Verify Start blank, create task, close/reopen, and confirm first-run does not return.
- Verify both `dist/win-unpacked/TaskCalendar.exe` and an extracted copy of `dist/Task Calendar-0.3.1-portable-x64.zip`.
- Confirm renderer security and CSP warning status remain unchanged.
- Note: empty JSON import recovery is fixed in v0.3.2.

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
