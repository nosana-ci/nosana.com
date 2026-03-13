# Nosana Website.

This project is the main website for Nosana, built with Astro. Nosana is a decentralized GPU cloud platform designed for AI and high-performance workloads, allowing users to rent affordable GPUs or provide idle GPU power to the network.

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS
- **Content**: MD/MDX with Astro Content Collections
- **Deployment**: Traditional static hosting or SSR-compatible environments

## Project Structure

Inside this project, you will find the following core directories:

```text
/
├── public/          # Static assets like icons and common SVGs
├── guide/           # Guides for adding content
├── src/
│   ├── assets/      # Optimized images used within components
│   ├── components/  # Reusable UI components
│   ├── content/     # Markdown and YAML data for blogs, case studies, and grants
│   ├── layouts/     # Page templates and document structure
│   ├── pages/       # Routes and main entry points
│   ├── styles/      # Global CSS and theme configurations
│   ├── utils/       # Utility functions and Zod schemas
│   └── content.config.ts  # Content collection definitions
├── package.json     # Project dependencies and scripts
└── astro.config.mjs # Astro configuration and integrations
```

## Getting Started

### Installation

Install the project dependencies:

```sh
npm install
```

### Development

Start the local development server:

```sh
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build

Create a production-ready build in the `./dist/` directory:

```sh
npm run build
```

### Sync

Sync content collections and generate types:

```sh
npx astro sync
```

## Adding Content

Guides for all content types are located in the `/guide` directory at the root of the project.

| Guide | Description |
|---|---|
| [`guide/blogs.md`](./guide/blogs.md) | How to add a blog post |
| [`guide/case-study.md`](./guide/case-study.md) | How to add a case study |
| [`guide/events.md`](./guide/events.md) | How to add an event |
| [`guide/sessions.md`](./guide/sessions.md) | How to add a session recording |
| [`guide/community-calls.md`](./guide/community-calls.md) | How to add a community call entry |
