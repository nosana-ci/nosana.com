# How to Add a Case Study

This document explains how contributors can add a new case study to the website. Case studies are written in Markdown and include a frontmatter block that defines metadata such as the title, description, author, thumbnail, and impact summary.

---

## Step 1 — Create a Folder

Create a new folder inside the `case-studies` content directory. The folder name must be a slug of the full case study title.

Slug rules:

- Lowercase only
- Replace spaces, emojis, and special characters with `-`

Example:

| Title | Folder Name |
|---|---|
| How Acme Corp Scaled With Nosana | `how-acme-corp-scaled-with-nosana` |

---

## Step 2 — Add Frontmatter

Inside the folder, create an `index.md` file and add a frontmatter block at the top.

```yaml
---
category: "case-study"
title: "How Acme Corp Scaled With Nosana"
description: "A look at how Acme Corp used Nosana's decentralised GPU network to reduce inference costs by 60%."
logo: "./assets/logo.png"
thumbnail: "./assets/thumbnail.jpg"
author: "Jane Doe"
role: "Head of Infrastructure"
createdAt: "2024-11-10"
tags:
  - "infrastructure"
  - "recommended"
focus: "Reducing GPU inference costs at scale"
impact: "60% cost reduction within the first quarter of deployment"
---
```

---

## Step 3 — Write Content

Write the body of the case study in Markdown after the closing `---` of the frontmatter block.

**Headings**

Use `##` for top-level sections, `###` for subsections, and `####` for nested subsections. Do not use `#` (h1) anywhere in the content body.

```markdown
## Section Title
### Subsection Title
#### Nested Subsection
```

**Links**

```markdown
[Link text](https://example.com)
```

**Images**

Place all images inside `./assets/` and reference them with a relative path.

```markdown
![Alt text](./assets/image.jpg)
```

---

## Step 4 — Add Images

Place all images inside an `assets` folder within the content folder.

```
src/content/case-studies/
└── how-acme-corp-scaled-with-nosana/
    ├── index.md
    └── assets/
        ├── logo.png
        └── thumbnail.jpg
```

---

## Folder Structure

```
src/content/case-studies/
└── how-acme-corp-scaled-with-nosana/
    ├── index.md
    └── assets/
        ├── logo.png
        └── thumbnail.jpg
```

---

## Frontmatter Example

```yaml
---
category: "case-study"
title: "How Acme Corp Scaled With Nosana"
description: "A look at how Acme Corp used Nosana's decentralised GPU network to reduce inference costs by 60%."
logo: "./assets/logo.png"
thumbnail: "./assets/thumbnail.jpg"
author: "Jane Doe"
role: "Head of Infrastructure"
createdAt: "2024-11-10"
tags:
  - "infrastructure"
  - "recommended"
focus: "Reducing GPU inference costs at scale"
impact: "60% cost reduction within the first quarter of deployment"
---
```

---

## Frontmatter Fields

### `category`

**Type:** string  
**Required:** Yes  
**Value:** Must always be `"case-study"`.

---

### `title`

**Type:** string  
**Required:** Yes  
The full title of the case study. Used as the page heading and in meta tags.

---

### `description`

**Type:** string  
**Required:** Yes  
A short summary of the case study. Used in previews, cards, and meta descriptions.

---

### `logo`

**Type:** image  
**Required:** No  
A relative path to the company or project logo. Must be placed inside `./assets/`.

---

### `thumbnail`

**Type:** image  
**Required:** Yes  
A relative path to the thumbnail image. Must be placed inside `./assets/`.

---

### `author`

**Type:** string  
**Required:** No  
The name of the person being featured or quoted in the case study.

---

### `role`

**Type:** string  
**Required:** No  
The job title or role of the author. Displayed alongside the author name.

---

### `createdAt`

**Type:** date  
**Required:** Yes  
Publication date in `YYYY-MM-DD` format.

---

### `tags`

**Type:** string[]  
**Required:** Yes  
An array of tags used for filtering and categorisation. Use `"recommended"` to display the case study in the featured section of the website.

---

### `focus`

**Type:** string  
**Required:** Yes  
A short statement describing the primary challenge or focus area. Falls back to a default value if left empty, but a specific value is recommended.

---

### `impact`

**Type:** string  
**Required:** Yes  
A short statement summarising the outcome or result achieved. Falls back to a default value if left empty, but a specific value is recommended.

---

## Summary

1. Create a folder inside `src/content/case-studies/` using a slug of the case study title.
2. Add an `index.md` file with a valid frontmatter block.
3. Write the case study content in Markdown below the frontmatter.
4. Place all images inside `./assets/`.