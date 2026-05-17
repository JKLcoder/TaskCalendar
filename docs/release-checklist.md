# Release Checklist

Use this checklist before calling v0.6.0 a frozen local testing baseline.

## Install And Static Validation

- [ ] Run `npm install`.
- [ ] Run `npm audit` and confirm 0 vulnerabilities.
- [ ] Run `node --check main.js app.js storage.js preload.js`.
- [ ] Confirm `package.json` version is `0.6.0`.
- [ ] Confirm `productName` is `Task Calendar`.
- [ ] Confirm `appId` is `com.local.taskcalendar`.
- [ ] Confirm storage schema remains v1.

## Development Smoke Test

- [ ] Run `npm start`.
- [ ] Confirm the Electron window opens.
- [ ] Confirm the app opens on the real current month and selects today.
- [ ] Confirm Today Command Center renders.
- [ ] Confirm Week Pressure renders.
- [ ] Confirm Today Action List renders below Today Command Center.
- [ ] Confirm Today Action List shows overdue unfinished and today unfinished tasks.
- [ ] Confirm Today Action List Done, Edit, and Jump actions work.
- [ ] Confirm Today Action List remains independent from toolbar search/status filters.
- [ ] Confirm End-of-Day Review renders below Today Action List and above Selected Day Details.
- [ ] Confirm End-of-Day Review done, remaining, overdue, and completion text are correct.
- [ ] Confirm View remaining today selects today, shows today incomplete tasks, and does not mutate task data.
- [ ] Confirm End-of-Day Review counts update after create, edit, mark done, reset, and import.
- [ ] Confirm File > Data & Settings opens the Data & Settings dialog.
- [ ] Confirm Data & Settings shows app version, data location, storage type, current task count, and portable data note.
- [ ] Confirm Open data location opens the Electron userData folder.
- [ ] Confirm Export backup writes valid schema v1 JSON.
- [ ] Confirm Restore from JSON restores valid schema v1 JSON, restarts after success, and leaves New Task editable after restart.
- [ ] Confirm invalid restore JSON and canceled restore do not mutate current data or restart.
- [ ] Confirm first-run panel appears with a clean profile.
- [ ] Confirm Start blank plus a saved task persists after close/reopen.
- [ ] Confirm empty JSON import saves a valid empty payload, restarts the app, and returns to the normal empty calendar state.
- [ ] Confirm fixed desktop app shell layout.
- [ ] Confirm the page body is not the main scroll container in normal desktop use.
- [ ] Confirm right panel independent scrolling.
- [ ] Confirm status select filtering works.
- [ ] Confirm the renderer console has no unexpected errors or warnings.
- [ ] Confirm the Electron CSP warning does not return.

## Build

- [ ] Run `npm run pack`.
- [ ] Confirm `dist/win-unpacked/TaskCalendar.exe` exists.
- [ ] Run `npm run dist:portable`.
- [ ] Confirm `dist/Task Calendar-0.6.0-portable-x64.zip` exists.
- [ ] Confirm artifact names include `0.6.0`.

## Packaged App Validation

- [ ] Launch `dist/win-unpacked/TaskCalendar.exe`.
- [ ] Copy the portable ZIP to a separate normal folder.
- [ ] Extract the portable ZIP to a normal folder.
- [ ] Launch the extracted `TaskCalendar.exe`.
- [ ] Run the manual checklist in `TEST_CHECKLIST.md` for both packaged outputs.
- [ ] Confirm Start blank, create task, close/reopen persists in both `win-unpacked` and extracted portable ZIP.
- [ ] Confirm empty JSON import restart recovery in both `win-unpacked` and extracted portable ZIP.
- [ ] Confirm packaged app data is stored under `%APPDATA%\Task Calendar\`.
- [ ] Confirm first-run Start blank, Use demo data, and Import tasks flows.
- [ ] Confirm Today Command Center and Week Pressure.
- [ ] Confirm Today Action List ordering, item cap, Done/Edit/Jump actions, and filter independence.
- [ ] Confirm End-of-Day Review counts, completion copy, state message, and View remaining today action.
- [ ] Confirm Data & Settings version/path/storage type/task count and portable note in both packaged outputs.
- [ ] Manually spot-check Open data location.
- [ ] Manually spot-check Export backup native save dialog and exported schema v1 JSON.
- [ ] Manually spot-check Restore from JSON native open dialog, replacement confirmation, successful restart, invalid JSON rejection, and cancel behavior.
- [ ] Confirm Full Today Details appears when the selected day is today.
- [ ] Confirm fixed shell layout, calendar/right-panel vertical alignment, top-left date numbers, status select filtering, and compact right panel density.
- [ ] Confirm CRUD, mark done, search/filter, Today incomplete, Clear filters, import/export, reset demo data, and localStorage persistence.
- [ ] Confirm native menu actions work.
- [ ] Confirm shortcuts work, including native Import and Export.
- [ ] Confirm compact desktop layout is usable.

## Security Confirmation

- [ ] Confirm renderer cannot access `require`.
- [ ] Confirm renderer cannot access `process`.
- [ ] Confirm renderer cannot access `window.process`.
- [ ] Confirm `nodeIntegration` remains disabled.
- [ ] Confirm `contextIsolation` remains enabled.
- [ ] Confirm `sandbox` remains enabled.
- [ ] Confirm CSP warning does not return.
- [ ] Confirm renderer console has no unexpected errors or warnings.

## Final Baseline Notes

- [ ] Confirm README output paths match the generated artifacts.
- [ ] Confirm release notes describe the current scope.
- [ ] Confirm known limitations are documented.
- [ ] Confirm empty JSON import restart recovery is documented.
- [ ] Confirm no app behavior, storage schema, or Electron security settings changed during release preparation.
- [ ] Do not create the `v0.6.0` Git tag until review approves the baseline.
