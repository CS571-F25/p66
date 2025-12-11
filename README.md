# Book Tracker

Book Tracker is a React/Vite site that helps readers track the books they plan to read, have in progress, or finished. It ships with routing, Open Library search, review capture, status filters, and local persistence so the library survives refreshes.

## Features

- Home: Open Library search with labeled inputs and accessible controls; stats strip; yearly goal and streak widget.
- Library: Status + “has review” filters, inline status updater, expandable review section, average rating display, review form, and remove-from-library control.
- Account: Local “login” storing display name/email plus library persistence in `localStorage`.
- Design: Consistent React Bootstrap components (Navbar, Cards, ButtonGroups, Progress, Forms) with focus-visible styles and AA-friendly palette.
- Accessibility: No skipped headings, labeled form controls, alt-less layout (no images), keyboard-friendly forms/switches.

## Running locally

```bash
npm install
npm run dev
```

The site uses `HashRouter` so GitHub Pages can serve it without extra configuration. Build with `npm run build` before deploying to GitHub Pages.

## Components (12+ in use)

NavigationBar, Footer, HeroBanner, StatsBar, ReadingGoal, BookSearch, Home, Library, LibraryBook, StatusBadge, ReviewForm, ReviewList, FilterBar, Account, App.
