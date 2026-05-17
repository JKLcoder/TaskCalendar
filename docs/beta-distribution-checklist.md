# Beta Distribution Checklist

Use this checklist before sharing a beta ZIP with external testers.

## Build And Static Validation

- [ ] Run `npm install`.
- [ ] Run `npm audit` and confirm 0 vulnerabilities.
- [ ] Run `node --check main.js app.js storage.js preload.js`.
- [ ] Confirm app version and artifact naming are intentional.
- [ ] Run `npm run pack`.
- [ ] Run `npm run dist:portable`.
- [ ] Confirm `dist/win-unpacked/TaskCalendar.exe` exists.
- [ ] Confirm the portable ZIP exists.

## Packaged App Smoke Test

- [ ] Launch `dist/win-unpacked/TaskCalendar.exe`.
- [ ] Copy the portable ZIP to a separate normal folder.
- [ ] Extract the portable ZIP to a normal folder.
- [ ] Launch the extracted `TaskCalendar.exe`.
- [ ] Do not run the portable app directly from a temporary folder.
- [ ] Confirm the app opens on the real current month and today.
- [ ] Confirm the calendar renders.

## First-Run And Local Data

- [ ] Start with a clean Electron profile if practical.
- [ ] Confirm first-run appears.
- [ ] Choose Start blank.
- [ ] Create a task.
- [ ] Close/reopen and confirm the task persists.
- [ ] Confirm data is stored under `%APPDATA%\Task Calendar\`.
- [ ] Confirm portable data is not stored inside the extracted portable folder.

## Data & Settings

- [ ] File > Data & Settings opens the modal.
- [ ] Confirm app version is shown.
- [ ] Confirm data location is shown.
- [ ] Confirm storage type is shown.
- [ ] Confirm current task count is shown.
- [ ] Confirm portable data note is shown.
- [ ] Open data location works.

## Export / Restore

- [ ] Export backup opens the native save dialog.
- [ ] Export backup writes valid schema v1 JSON.
- [ ] Restore from JSON opens the native file dialog.
- [ ] Restore valid schema v1 JSON asks for replacement confirmation.
- [ ] Restore valid schema v1 JSON restarts the app after success.
- [ ] Restored tasks load after restart.
- [ ] New Task is editable after restore restart.
- [ ] Invalid restore JSON is rejected without data loss.
- [ ] Canceling file selection does not restart.
- [ ] Canceling replacement confirmation does not restart.

## Today Workflow

- [ ] Today Command Center renders.
- [ ] Week Pressure renders.
- [ ] Today Action List renders.
- [ ] Today Action List Done works.
- [ ] Today Action List Edit works.
- [ ] Today Action List Jump works.
- [ ] End-of-Day Review renders.
- [ ] View remaining today works.

## Native Menu / Shortcuts

- [ ] File > New Task.
- [ ] File > Import Tasks.
- [ ] File > Export Tasks.
- [ ] File > Reset Demo Data.
- [ ] File > Data & Settings.
- [ ] File > Quit.
- [ ] Ctrl+N.
- [ ] Ctrl+I.
- [ ] Ctrl+E.
- [ ] Ctrl+Q.

## Beta Materials

- [ ] README download instructions are correct.
- [ ] Beta release notes are ready.
- [ ] Beta invitation message has a real download link or placeholder clearly marked.
- [ ] Feedback form has a real feedback link or placeholder clearly marked.
- [ ] Known limitations are visible to testers.
- [ ] Screenshots are sanitized and do not show personal data.

## Do Not Claim

- [ ] Do not claim the beta is production-ready.
- [ ] Do not claim the app is signed.
- [ ] Do not claim cloud sync exists.
- [ ] Do not claim payment or commercial availability exists.
