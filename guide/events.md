# How to Add an Event

This document explains how contributors can add a new event to the website. Events only require a frontmatter block and a thumbnail image. No Markdown body content is needed.

---

## Step 1 — Create a Folder

Create a new folder inside the `events` content directory. The folder name must be a slug of the full event title.

Slug rules:

- Lowercase only
- Replace spaces, emojis, and special characters with `-`

Example:

| Title | Folder Name |
|---|---|
| Nosana at Breakpoint 2024 | `nosana-at-breakpoint-2024` |

---

## Step 2 — Add Frontmatter

Inside the folder, create an `index.md` file and add a frontmatter block. No content body is required after the closing `---`.

```yaml
---
title: "Nosana at Breakpoint 2024"
description: "Join the Nosana team at Breakpoint 2024 in Amsterdam. Come find us at our booth to learn about decentralised GPU infrastructure."
thumbnail: "./assets/thumbnail.jpg"
createdAt: "2024-09-20"
url: "https://breakpoint.solana.com"
time: "10:00 AM CET"
tags:
  - "conference"
  - "featured"
  - "featuredNav"
---
```

---

## Step 3 — Add a Thumbnail Image

Place the thumbnail image inside an `assets` folder within the content folder. A thumbnail is required for every event.

```
src/content/events/
└── nosana-at-breakpoint-2024/
    ├── index.md
    └── assets/
        └── thumbnail.jpg
```

---

## Folder Structure

```
src/content/events/
└── nosana-at-breakpoint-2024/
    ├── index.md
    └── assets/
        └── thumbnail.jpg
```

---

## Frontmatter Example

```yaml
---
title: "Nosana at Breakpoint 2024"
description: "Join the Nosana team at Breakpoint 2024 in Amsterdam. Come find us at our booth to learn about decentralised GPU infrastructure."
thumbnail: "./assets/thumbnail.jpg"
createdAt: "2024-09-20"
url: "https://breakpoint.solana.com"
time: "10:00 AM CET"
tags:
  - "conference"
  - "featured"
  - "featuredNav"
---
```

---

## Frontmatter Fields

### `title`

**Type:** string  
**Required:** Yes  
The full name of the event. Used as the heading in event listings and cards.

---

### `description`

**Type:** string  
**Required:** Yes  
A short description of the event. Used in event cards and meta descriptions.

---

### `thumbnail`

**Type:** image  
**Required:** Yes  
A relative path to the thumbnail image. Must be placed inside `./assets/`.

---

### `createdAt`

**Type:** date  
**Required:** Yes  
The date of the event in `YYYY-MM-DD` format.

---

### `url`

**Type:** string  
**Required:** Yes  
An external URL where users can find more information or register to attend.

---

### `time`

**Type:** string  
**Required:** No  
The time the event takes place. Include the timezone where relevant.

---

### `tags`

**Type:** string[]  
**Required:** Yes  
An array of tags used for filtering and controlling where the event appears on the website.

| Tag | Effect |
|---|---|
| `featured` | Displays the event on the homepage |
| `featuredNav` | Displays the event in the navigation bar |

---

## Summary

1. Create a folder inside `src/content/events/` using a slug of the event title.
2. Add an `index.md` file with a valid frontmatter block.
3. Place the thumbnail image inside `./assets/`.
4. No Markdown body content is required.