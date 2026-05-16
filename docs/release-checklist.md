# Release Checklist

Use this checklist before calling v0.1.0 a frozen local testing baseline.

## Install And Static Validation

- [ ] Run `npm install`.
- [ ] Run `npm audit` and confirm 0 vulnerabilities.
- [ ] Run `node --check main.js app.js storage.js`.
- [ ] Confirm `package.json` version is `0.1.0`.
- [ ] Confirm `productName` is `Task Calendar`.
- [ ] Confirm `appId` is `com.local.taskcalendar`.

## Development Smoke Test

- [ ] Run `npm start`.
- [ ] Confirm the Electron window opens.
- [ ] Confirm the calendar renders.
- [ ] Confirm the renderer console has no unexpected errors or warnings.
- [ ] Confirm the Electron CSP warning does not return.

## Build

- [ ] Run `npm run pack`.
- [ ] Confirm `dist/win-unpacked/TaskCalendar.exe` exists.
- [ ] Run `npm run dist:portable`.
- [ ] Confirm `dist/Task Calendar-0.1.0-portable-x64.zip` exists.

## Packaged App Validation

- [ ] Launch `dist/win-unpacked/TaskCalendar.exe`.
- [ ] Extract the portable ZIP to a normal folder.
- [ ] Launch the extracted `TaskCalendar.exe`.
- [ ] Run the manual checklist in `TEST_CHECKLIST.md` for both packaged outputs.
- [ ] Confirm CRUD, mark done, search/filter, import/export, reset demo data, and localStorage persistence.
- [ ] Confirm menu actions work.
- [ ] Confirm shortcuts work.

## Security Confirmation

- [ ] Confirm renderer cannot access `require`.
- [ ] Confirm renderer cannot access `process`.
- [ ] Confirm renderer cannot access `window.process`.
- [ ] Confirm `nodeIntegration` remains disabled.
- [ ] Confirm `contextIsolation` remains enabled.
- [ ] Confirm `sandbox` remains enabled.
- [ ] Confirm CSP warning does not return.

## Final Baseline Notes

- [ ] Confirm README output paths match the generated artifacts.
- [ ] Confirm release notes describe the current scope.
- [ ] Confirm known limitations are documented.
- [ ] Confirm no app code or storage schema changes were made during documentation freeze.
