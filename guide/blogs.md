# How to Add a Blog Post

This document explains how contributors can add a new blog post to the website. Blog posts are written in Markdown and include a frontmatter block that defines metadata such as the title, description, thumbnail, and tags.

---

## Step 1 — Create a Folder

Create a new folder inside the `blogs` content directory. The folder name must be a slug of the full blog post title.

Slug rules:

- Lowercase only
- Replace spaces, emojis, and special characters with `-`

Example:

| Title | Folder Name |
|---|---|
| 2024 at Nosana: A Year In Review | `2024-at-nosana-a-year-in-review` |

---

## Step 2 — Add Frontmatter

Inside the folder, create an `index.md` file and add a frontmatter block at the top.

```yaml
---
category: "blog"
title: "2024 at Nosana: A Year In Review"
description: "With the Mainnet launch just weeks away, it feels like the right time to reflect on the milestones that have defined 2024."
thumbnail: "./assets/thumbnail.jpg"
createdAt: "2024-12-27"
tags:
  - "product"
  - "recommended"
---
```

---

## Step 3 — Write Content

Write the body of the blog post in Markdown after the closing `---` of the frontmatter block.

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
src/content/blogs/
└── 2024-at-nosana-a-year-in-review/
    ├── index.md
    └── assets/
        └── thumbnail.jpg
```

---

## Folder Structure

```
src/content/blogs/
└── 2024-at-nosana-a-year-in-review/
    ├── index.md
    └── assets/
        └── thumbnail.jpg
```

---

## Frontmatter Example

```yaml
---
category: "blog"
title: "2024 at Nosana: A Year In Review"
description: "With the Mainnet launch just weeks away, it feels like the right time to reflect on the milestones that have defined 2024."
thumbnail: "./assets/thumbnail.jpg"
createdAt: "2024-12-27"
tags:
  - "product"
  - "recommended"
---
```

---

## Frontmatter Fields

### `category`

**Type:** string  
**Required:** Yes  
**Value:** Must always be `"blog"`.

---

### `title`

**Type:** string  
**Required:** Yes  
The full title of the blog post. Used as the page heading and in meta tags.

---

### `description`

**Type:** string  
**Required:** Yes  
A short summary of the blog post. Used in previews, cards, and meta descriptions.

---

### `thumbnail`

**Type:** image  
**Required:** Yes  
A relative path to the thumbnail image. Must be placed inside `./assets/`.

---

### `createdAt`

**Type:** date  
**Required:** Yes  
Publication date in `YYYY-MM-DD` format.

---

### `tags`

**Type:** string[]  
**Required:** Yes  
An array of tags used for filtering and categorisation. Use `"recommended"` to display the post in the featured section of the website.

---

## Summary

1. Create a folder inside `src/content/blogs/` using a slug of the post title.
2. Add an `index.md` file with a valid frontmatter block.
3. Write the post content in Markdown below the frontmatter.
4. Place all images inside `./assets/`.