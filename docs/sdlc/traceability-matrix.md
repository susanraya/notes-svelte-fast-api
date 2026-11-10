# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Create a plain-text note | US-001 | 1 | note, webapp | — | db5f3be | delivered | not run | 2/2 tested · 0/2 passing | — |
| US-002 | EPIC-001 | Add a to-do checklist to a note | US-002 | 1 | checklist_item, note, webapp | — | db5f3be | delivered | not run | 2/2 tested · 0/2 passing | — |
| US-003 | EPIC-001 | Check and uncheck checklist items | US-003 | 2 | checklist_item, webapp | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-002 | View all notes in a single list, newest first | US-004 | 1 | note, webapp | — | db5f3be | delivered | not run | 3/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | Open and view a note | US-005 | 1 | checklist_item, note, webapp | — | db5f3be | delivered | not run | 1/1 tested · 0/1 passing | — |
| US-006 | EPIC-002 | Search notes by text | US-006 | 2 | checklist_item, note, webapp | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-007 | EPIC-003 | Edit an existing note | US-007 | 2 | checklist_item, note, webapp | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-003 | Delete a note permanently | US-008 | 2 | note, webapp | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-004 | Persist notes in the browser's local storage | US-009 | 1 | checklist_item, note, webapp | frontend/e2e/notes-persistence.spec.ts, frontend/src/App.svelte, frontend/src/lib/notes.test.ts, frontend/src/lib/notes.ts | db5f3be | delivered | succeeded | 2/2 tested · 0/2 passing | — |
| US-010 | EPIC-004 | Use the app offline | US-010 | 2 | static_hosting, webapp | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-011 | EPIC-004 | Understand that notes stay on one browser only | US-011 | 2 | webapp | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-012 | EPIC-005 | Export notes to a file | US-012 | 2 | checklist_item, note, webapp | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-013 | EPIC-005 | Import notes from a file | US-013 | 2 | checklist_item, note, webapp | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-006 | Use the app with no login or account | US-014 | 1 | webapp | frontend/e2e/no-login.spec.ts, frontend/src/App.test.ts, frontend/src/screens/Notes.test.ts | 8ebdd12 | delivered | succeeded | 1/1 tested · 0/1 passing | — |
| US-015 | EPIC-006 | Use the app free of charge | US-015 | 1 | webapp | — | 8ebdd12 | delivered | not run | 1/1 tested · 0/1 passing | — |
| US-016 | EPIC-006 | Use the app on mobile and desktop responsively | US-016 | 3 | webapp | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-006 | Access the app with accessibility support | US-017 | 3 | webapp | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-018 | EPIC-006 | No personal-data collection or consent prompts | US-018 | 1 | webapp | — | 8ebdd12 | delivered | not run | 1/1 tested · 0/1 passing | — |
<!-- sdlc:auto:end matrix -->
