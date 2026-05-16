# Release Checklist

Use this checklist before calling v0.3.0 a frozen local testing baseline.

## Install And Static Validation

- [ ] Run `npm install`.
- [ ] Run `npm audit` and confirm 0 vulnerabilities.
- [ ] Run `node --check main.js app.js storage.js preload.js`.
- [ ] Confirm `package.json` version is `0.3.0`.
- [ ] Confirm `productName` is `Task Calendar`.
- [ ] Confirm `appId` is `com.local.taskcalendar`.
- [ ] Confirm storage schema remains v1.

## Development Smoke Test

- [ ] Run `npm start`.
- [ ] Confirm the Electron window opens.
- [ ] Confirm the app opens on the real current month and selects today.
- [ ] Confirm Today Command Center renders.
- [ ] Confirm Week Pressure renders.
- [ ] Confirm first-run panel appears with a clean profile.
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
- [ ] Confirm `dist/Task Calendar-0.3.0-portable-x64.zip` exists.
- [ ] Confirm artifact names include `0.3.0`.

## Packaged App Validation

- [ ] Launch `dist/win-unpacked/TaskCalendar.exe`.
- [ ] Extract the portable ZIP to a normal folder.
- [ ] Launch the extracted `TaskCalendar.exe`.
- [ ] Run the manual checklist in `TEST_CHECKLIST.md` for both packaged outputs.
- [ ] Confirm first-run Start blank, Use demo data, and Import tasks flows.
- [ ] Confirm Today Command Center and Week Pressure.
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
- [ ] Confirm no app behavior, storage schema, or Electron security settings changed during release preparation.
- [ ] Do not create the `v0.3.0` Git tag until review approves the baseline.
