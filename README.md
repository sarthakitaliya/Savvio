# Savvio

**Savvio** is a minimal, fast bookmarking platform focused on making saving and organizing content effortless.

- Chrome Extension (Vite + React)
- Next.js Web App
- Shared code (API client, store, types) in a Turborepo
- Auth handled via Better Auth

---

## Features

- **Save Any Page Instantly**  
  Quickly save URLs or personal notes (thoughts, learnings, resources) right from any website.

- **Dark and Light Theme Support**  
  Enjoy a sleek interface in either light or dark mode, seamlessly switching across devices.

- **Organize Bookmarks into Folders**  
  Keep your saved pages neatly organized in folders you can create and manage.

- **Cross-Device Sync**  
  Everything you save is instantly available on both your web dashboard and Chrome extension.

- **Floating Save Button on Every Website**  
  A subtle floating button on any page lets you save instantly. (Can be disabled in settings for a cleaner view.)

- **Search Everything**  
  Easily find bookmarks by searching:
  - title
  - tags
  - URL
  - notes

---

## Future Features

- **Import Existing Bookmarks**  
  Import your current browser bookmarks directly into Savvio to get started fast.

- **Save Images**  
  Save images directly from both the extension and the web app for better visual organization.

- **Sharing**  
  Share one or more folders with collaborators, friends, or your team.

---

## Project Structure

```
apps/
  web/             → Next.js web app
  extension/       → Chrome extension (Vite + React)

packages/
  api-client/      → Shared API calls and auth client
  store/           → Zustand store
  types/           → Shared TypeScript types
```

---

## Tech Stack

- Bun
- Next.js
- Vite
- React
- Tailwind CSS
- Zustand
- Better Auth
- Turborepo
