# FutureBook prototype

A responsive, installable-style study web app prototype for JEE, NEET and competitive exam preparation.

## Included
- Responsive home page and subject library
- Exam filters and subject search
- Chapter-name catalog for JEE/NEET Physics, Chemistry, Mathematics and Biology, plus starter competitive-exam topics
- Subject cards open a chapter-list modal with exam tabs
- Chapter detail workspace with concise original notes and 3 explained MCQs for starter chapters: Units and Measurements, Laws of Motion, Structure of Atom, and Cell: The Unit of Life
- Other chapters are listed with a clear “content pending” workspace, so no one mistakes chapter titles for complete notes
- Sample MCQ quiz with feedback and score
- Study checklist saved in this browser
- PWA manifest starter

## Run locally
Install Node.js (LTS), then in this folder:
```bash
npm install
npm run dev
```
Open the local URL Vite prints.

## Free deployment
1. Create a GitHub repository and upload these files.
2. Import the repository into a static host such as Netlify or Vercel, or use GitHub Pages with a suitable Vite build setup.
3. Build command: `npm run build`; output folder: `dist`.
4. Connect your domain later if desired. Free subdomain hosting can be used at first.

## Android
This is currently a mobile-friendly web app prototype, not a signed native APK. You can make it installable as a PWA after deploying over HTTPS. To publish a native Android app, a later step can wrap the web app with Capacitor and build/sign it with Android Studio. Google Play publishing requires a Play Console developer account and compliance with current testing and policy requirements.

## Before launch
- Replace sample quiz questions with original/licensed content.
- Continue authoring verified notes and original MCQs chapter-by-chapter; add PYQs only from permitted sources, plus PDFs, bookmarks and progress storage. The included catalog lists chapter/topic names only and is a starter reference; verify the latest official NTA syllabus.
- Add backend/auth only if needed.
- Do not upload copyrighted textbooks without permission.
