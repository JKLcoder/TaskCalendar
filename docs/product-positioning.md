# Product Positioning

## One-Line Positioning

Task Calendar is a local-first desktop command center for today's work.

中文定位：Task Calendar 是一个本地优先的桌面今日工作台：打开就知道今天先做什么，晚上知道完成得怎么样，数据始终在自己电脑上。

## Target User Hypothesis

Task Calendar is for individual desktop workers who plan and execute daily work locally, prefer simple tools over team platforms, and care about knowing where their data lives.

Likely early users include:

- Solo operators and independent builders.
- Office workers who need a private daily task board.
- Users who dislike account-first cloud todo apps.
- People who want local JSON backup and restore instead of opaque sync.

## Problem Statement

Daily work often starts scattered across notes, todo apps, calendars, chat, and memory. Users do not only need to store tasks. They need to open a desktop app and immediately understand:

- What matters today.
- What is already overdue.
- What to do next.
- What remains at the end of the day.
- Where the data is stored and how to back it up.

## Core Value Proposition

Task Calendar turns a scattered workday into a clear local command center:

- Today-first status and execution.
- Calendar context without project-management overhead.
- Local data storage the user can inspect, export, and restore.
- No account or cloud dependency required for the core workflow.

## Differentiation

### Local-First

Task data is stored locally in the Electron user profile, under `%APPDATA%\Task Calendar\` on Windows packaged builds.

### Today-First

The product centers on today's work: Today Command Center, Week Pressure, Today Action List, and End-of-Day Review.

### No Account

The current prototype does not require signup, login, or identity management.

### No Cloud Required

The core workflow works without cloud sync, server storage, or a backend service.

### User-Controlled Backup And Restore

Users can export schema v1 JSON backups and restore schema v1 JSON data through Data & Settings.

## What Task Calendar Is Not

- Not Jira.
- Not Notion.
- Not a team collaboration platform.
- Not a cloud todo app.
- Not a project-management suite.
- Not a reminder or notification system.
- Not a database-backed workspace.
