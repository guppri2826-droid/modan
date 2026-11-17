# मोदनवाल एक्जीक्यूटिव क्लब — Website

React (Vite) website built from `Modanwal_Executive_Club.pdf`.

## Pages

| Route | Page | Source (PDF pages) |
|---|---|---|
| `#/` | मुख्य पृष्ठ — overview, key facts, surnames, chapters | 1–4 |
| `#/uddeshya` | उद्देश्य एवं संरचना — objective, committee structure, elections | 1–2 |
| `#/sadasyata` | सदस्यता — eligibility, ID number, termination, notes | 2–3 |
| `#/aavedan` | सदस्यता आवेदन पत्र — online application form → printable / PDF | 4 |
| `#/itihas` | इतिहास एवं संस्कार — 9 chapters with reader | 5–23 |

## Run locally

```bash
npm install
npm run dev        # opens http://localhost:5173
```

## Build for hosting

```bash
npm run build      # output in dist/
npm run preview    # check the built site locally
```

`dist/` is a fully static site (hash-based routes, relative paths) — upload it to
any static host (Netlify, Vercel, GitHub Pages, cPanel `public_html`, etc.).

## Editing content

- Club text, committee posts, surnames, form options → `src/content/club.js`
- History / sanskar chapters → `src/content/history/part1.js` … `part4.js`
  (one block per paragraph / verse / list); chapter split and titles in
  `src/content/history/index.js`
- Colours and fonts → top of `src/styles.css`

## About the application form

There is no server: the form validates input, auto-saves a draft in the
visitor's browser, and produces a print-ready application (Print / Save as PDF)
to be signed and handed to the club. To receive applications online, connect
the form to a backend or a form service (e.g. Google Forms, Formspree).
