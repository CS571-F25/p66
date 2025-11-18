# Book Tracker

Book Tracker is an in-progress React/Vite site that helps readers track books they plan to read, have in progress, or already finished. The goal for this milestone was to stand up a working prototype that demonstrates the architectural pieces listed in the assignment brief without building every advanced feature yet.

## Currently Implemented

| Requirement | Status |
| --- | --- |
| Hosted React project with routing | React 19 + Vite + React Router 7 via `HashRouter` |
| React Bootstrap usage | Navbar, cards, grids, forms, and buttons |
| Navigation bar | Persistent top nav linking Home, Library, About |
| ≥ 3 routed pages | Home (hero + Open Library search), Library (status filters), About (milestone summary) |
| ≥ 5 meaningful components | `NavigationBar`, `HeroBanner`, `BookSearch`, `Library`, `LibraryBook`, plus page components |
| Open Library integration | Home search widget calls `https://openlibrary.org/search.json` |
| Book organization | Sample library data with status toggles + review snippet placeholder |
