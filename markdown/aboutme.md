---
title: "About AOPI — How It Started & Where It's Going"
date: "2025-11-05"
description: "A short story about AOPI — what it is, why it exists, and the next steps."
tags:
  - about
  - story
  - aopi
---

<!--
  Notes:
  - This file is a full blog post template.
  - You can include raw HTML (for fine-grained image/layout control).
  - Replace image paths like /public/images/hero.jpg with your actual paths.
-->

<!-- HERO: big image + title (uses HTML for responsive control) -->
<figure style="margin:0 0 1.5rem 0; text-align:center;">
  <img src="/images/apple-touch-icon.png" alt="AOPI hero" style="max-width:100%; height:auto; border-radius:8px;">
  <figcaption style="font-size:0.9rem; color:#666; margin-top:0.5rem;">AOPI — built with Markdown + Node.js</figcaption>
</figure>

# About AOPI

_A short intro:_ AOPI started as a small experiment — a way to write notes in Markdown and instantly publish them to static HTML. Over time it grew into a mini-ecosystem: posts, images, tutorials, and small experiments.

---

## Table of contents

1. [Why AOPI?](#why-aopi)
2. [How it works (quick tech)](#how-it-works-quick-tech)
3. [Add images & media](#add-images--media)
4. [Examples and code snippets](#examples-and-code-snippets)
5. [Related posts](#related-posts)
6. [Final notes](#final-notes)

---

## Why AOPI?

AOPI exists because writing should be simple. Create a `.md` file, drop images in `public/images/`, and the build script compiles everything into `dist/` as beautiful, shareable HTML. No heavy frameworks, just Markdown + Node.

> “Write once, publish everywhere.” — _AOPI philosophy_

---

## How it works (quick tech)

- Store posts in `markdown/` as `.md` files.
- Images live in `public/images/` (or `markdown/images/` — adjust build script).
- Run `node build.js` (or `pnpm run dev`) to generate `dist/` with HTML pages.
- Each post becomes `dist/<post-name>.html`. Link them from `dist/blogs.html`.

**Sample post filename:** `aboutaopi.md` → `/aboutaopi.html`

---

## Add images & media

You can reference images using standard Markdown:

![Alt text](./images/apple-touch-icon.png)
