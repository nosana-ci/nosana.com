# How to Add a Community Call

This document explains how contributors can add a new community call entry to the website. Unlike other content types, community calls do not require a new folder. All entries are stored as an array inside a single shared file.

---

## Step 1 — Open the Index File

Navigate to the following file:

```
src/content/community-calls/index.md
```

---

## Step 2 — Add an Entry to the `calls` Array

Append a new item to the `calls` array in the frontmatter block.

```yaml
calls:
  - meeting: "#4"
    time: "25-07-2024 3PM CET"
    recordingUrl: "https://www.youtube.com/live/example"
```

---

## Step 3 — Update the Top-Level Fields

After adding a new call, update the following fields at the top of the frontmatter:

- `nextCallDate` — set to the date of the next upcoming call
- `lastUpdated` — set to the current date and time in ISO 8601 format

```yaml
nextCallDate: "Feb 26, 2026"
lastUpdated: "2026-02-01T10:00:00"
```

---

## File Structure

```
src/content/community-calls/
└── index.md
```

---

## Full File Example

```yaml
---
title: "Community Calls"
description: "Nosana hosts a monthly community call on the last Thursday of each month to share product updates, roadmap progress, and network developments."
nextCallDate: "Feb 26, 2026"
lastUpdated: "2026-02-01T10:00:00"
calls:
  - meeting: "#1"
    time: "30-05-2024 5PM CET"
    recordingUrl: "https://www.youtube.com/live/mzhzRaKHf5o"
  - meeting: "#2"
    time: "01-06-2024 3PM CET"
    recordingUrl: "https://www.youtube.com/live/Bfn6neG7CAE"
  - meeting: "#3"
    time: "15-06-2024 2PM CET"
    recordingUrl: "https://www.youtube.com/live/fG7qGYTVgE8"
---
```

---

## Frontmatter Fields

### `title`

**Type:** string  
**Required:** Yes  
The title of the community calls page. This should not be changed.

---

### `description`

**Type:** string  
**Required:** Yes  
A short description of the community calls. This should not be changed.

---

### `nextCallDate`

**Type:** string  
**Required:** Yes  
The date of the next upcoming community call. Update this each time a new call is scheduled. Use the format `MMM DD, YYYY`.

```yaml
nextCallDate: "Feb 26, 2026"
```

---

### `lastUpdated`

**Type:** string  
**Required:** Yes  
The date and time the file was last modified. Update this every time you make a change. Use ISO 8601 format.

```yaml
lastUpdated: "2026-02-01T10:00:00"
```

---

### `calls`

**Type:** array  
**Required:** Yes  
A list of all past community call recordings. Each item has the following fields:

**`meeting`**  
The call number, prefixed with `#`.

```yaml
meeting: "#4"
```

**`time`**  
The date and time of the call, including timezone. Use the format `DD-MM-YYYY H:MMam/pm TZ`.

```yaml
time: "25-07-2024 3PM CET"
```

**`recordingUrl`**  
The full URL to the recording on YouTube or another platform.

```yaml
recordingUrl: "https://www.youtube.com/live/example"
```

---

## Summary

1. Open `src/content/community-calls/index.md`.
2. Append a new item to the `calls` array with `meeting`, `time`, and `recordingUrl`.
3. Update `nextCallDate` to the next scheduled call.
4. Update `lastUpdated` to the current date and time.