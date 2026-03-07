# How to Add a Session

This document explains how contributors can add a new session to the website. Sessions only require a frontmatter block and a thumbnail image. No Markdown body content is needed.

---

## Step 1 — Create a Folder

Create a new folder inside the `sessions` content directory. The folder name must be a slug of the full session title.

Slug rules:

- Lowercase only
- Replace spaces, emojis, and special characters with `-`

Example:

| Title | Folder Name |
|---|---|
| Nosana Deep Dive: GPU Compute on Solana | `nosana-deep-dive-gpu-compute-on-solana` |

---

## Step 2 — Add Frontmatter

Inside the folder, create an `index.md` file and add a frontmatter block. No content body is required after the closing `---`.

```yaml
---
title: "Nosana Deep Dive: GPU Compute on Solana"
description: "A recorded session covering how Nosana leverages Solana for decentralised GPU compute."
thumbnail: "./assets/thumbnail.jpg"
publishedAt: "2024-11-15"
watchUrl: "https://example.com/watch/nosana-deep-dive"
watchOnWeb: "https://example.com/watch/nosana-deep-dive"
watchOnYoutube: "https://youtube.com/watch?v=example"
watchOnX: "https://x.com/i/broadcasts/example"
featured: true
---
```

---

## Step 3 — Add a Thumbnail Image

Place the thumbnail image inside an `assets` folder within the content folder. A thumbnail is required for every session.

```
src/content/sessions/
└── nosana-deep-dive-gpu-compute-on-solana/
    ├── index.md
    └── assets/
        └── thumbnail.jpg
```

---

## Folder Structure

```
src/content/sessions/
└── nosana-deep-dive-gpu-compute-on-solana/
    ├── index.md
    └── assets/
        └── thumbnail.jpg
```

---

## Frontmatter Example

```yaml
---
title: "Nosana Deep Dive: GPU Compute on Solana"
description: "A recorded session covering how Nosana leverages Solana for decentralised GPU compute."
thumbnail: "./assets/thumbnail.jpg"
publishedAt: "2024-11-15"
watchUrl: "https://example.com/watch/nosana-deep-dive"
watchOnWeb: "https://example.com/watch/nosana-deep-dive"
watchOnYoutube: "https://youtube.com/watch?v=example"
watchOnX: "https://x.com/i/broadcasts/example"
featured: true
---
```

---

## Frontmatter Fields

### `title`

**Type:** string  
**Required:** Yes  
The full title of the session. Used as the heading in session listings and cards.

---

### `description`

**Type:** string  
**Required:** Yes  
A short description of the session. Used in session cards and meta descriptions.

---

### `thumbnail`

**Type:** image  
**Required:** Yes  
A relative path to the thumbnail image. Must be placed inside `./assets/`.

---

### `publishedAt`

**Type:** date  
**Required:** Yes  
The date the session was published in `YYYY-MM-DD` format.

---

### `watchUrl`

**Type:** string  
**Required:** Yes  
The primary URL where the session can be watched. Used as the default watch link.

---

### `watchOnWeb`

**Type:** string  
**Required:** No  
An optional URL to watch the session on the web.

---

### `watchOnYoutube`

**Type:** string  
**Required:** No  
An optional URL to watch the session on YouTube.

---

### `watchOnX`

**Type:** string  
**Required:** No  
An optional URL to watch the session on X (formerly Twitter).

---

### `featured`

**Type:** boolean  
**Required:** No  
**Default:** `false`  
Set to `true` to feature the session on the website's event page.

---

## Summary

1. Create a folder inside `src/content/sessions/` using a slug of the session title.
2. Add an `index.md` file with a valid frontmatter block.
3. Place the thumbnail image inside `./assets/`.
4. No Markdown body content is required.