# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
69 tests · Passed 38 · Failed 0 · Skipped 0 · Not run 31

Acceptance criteria covered: 27/30 · passing: 0/30
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-009: Persist notes in the browser's local storage

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-018 | notes store > [AC-018] a reload reads back text, item text, order and checked state intact | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| AC-019 | notes store > [AC-019] never calls fetch, XHR or apiFetch | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > creates a note and stamps created_at/updated_at as ISO strings | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > deleteNote removes the note | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > empty localStorage content yields an empty note list instead of throwing | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > getNote(id) returns the matching note | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > listNotes() returns notes ordered newest-updated first | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > malformed localStorage content yields an empty note list instead of throwing | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > missing localStorage content yields an empty note list instead of throwing | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| — | notes store > updateNote stamps a fresh updated_at and keeps created_at | Unit | Passed | `frontend/src/lib/notes.test.ts` |
| AC-001 | [AC-001] creates a note with plain text and the saved note contains exactly that text | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-002 | [AC-002] saving an empty note leaves the list usable with no broken entry | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-003, AC-004 | [AC-003, AC-004] checklist items persist in insertion order, and adding another item leaves existing items unchanged | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-007, AC-008 | [AC-007, AC-008] the list shows all notes newest first, and a newly created note is at the top | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-009 | [AC-009] shows the empty state message when localStorage holds no notes | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-010 | [AC-010] opens a note and shows its full text and every checklist item with its checked state | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-018 | [AC-018] reloading the page preserves notes, text and checklist checked states | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |
| AC-019 | [AC-019, NFR-001] no request carrying note data is sent during create, edit and delete | E2E | Not run yet | `frontend/e2e/notes-persistence.spec.ts` |

### US-014: Use the app with no login or account

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | App > has no login, registration, or account route to gate the app behind | Unit | Passed | `frontend/src/App.test.ts` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/App.test.ts` |
| — | App > sends an unknown first visit straight to the usable notes screen, not to a gate | Unit | Passed | `frontend/src/App.test.ts` |
| AC-025 | Notes screen (AC-025 no login required) > lets a note be managed (deleted) right away, with no account step in the way | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-025 | Notes screen (AC-025 no login required) > shows the list and the action to add a note with nothing to sign in or register first | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-011 | Notes screen (list, search, delete) > [AC-011] typing a term shows only notes whose text or checklist item text matches, case-insensitive | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-012 | Notes screen (list, search, delete) > [AC-012] clearing the search box restores the full list, newest first | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-013 | Notes screen (list, search, delete) > [AC-013] when no note matches the term, a no-results message is shown and the list has zero entries | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-016 | Notes screen (list, search, delete) > [AC-016] deleting a note removes it from the list and from local storage immediately | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-017 | Notes screen (list, search, delete) > [AC-017] no trash, undo, or recovery affordance exists anywhere on the screen | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| — | Notes screen (list, search, delete) > after a delete, reloading (re-rendering fresh from storage) still shows the note gone | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| — | Notes screen (list, search, delete) > renders notes from listNotes(), newest-updated first, with no hardcoded seed | Unit | Passed | `frontend/src/screens/Notes.test.ts` |
| AC-025 | [AC-025] a first-time visitor creates and manages a note immediately, with no account step | E2E | Not run yet | `frontend/e2e/no-login.spec.ts` |
| AC-025 | [AC-025] a first-time visitor lands on a usable app with no sign-up, login, or personal details | E2E | Not run yet | `frontend/e2e/no-login.spec.ts` |

## Sprint 2

### US-006: Search notes by text

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-011 | [AC-011] typing a term shows only notes whose text or checklist item matches, case-insensitive | E2E | Not run yet | `frontend/e2e/notes-search-delete.spec.ts` |
| AC-012 | [AC-012] clearing the search box restores the full list, newest first | E2E | Not run yet | `frontend/e2e/notes-search-delete.spec.ts` |
| AC-013 | [AC-013] when no note matches the term, a no-results message is shown and no note rows render | E2E | Not run yet | `frontend/e2e/notes-search-delete.spec.ts` |
| AC-016 | [AC-016] deleting a note removes it from the DOM and from localStorage, and it stays absent after reload | E2E | Not run yet | `frontend/e2e/notes-search-delete.spec.ts` |
| AC-017 | [AC-017] no trash/undo/restore control or route is reachable after a delete | E2E | Not run yet | `frontend/e2e/notes-search-delete.spec.ts` |

### US-007: Edit an existing note

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-005 | NoteDetail (checklist toggles persist immediately) > [AC-005] checking an unchecked checklist item shows it checked and persists checked:true immediately | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| AC-006 | NoteDetail (checklist toggles persist immediately) > [AC-006] unchecking a checked item shows it unchecked and persists checked:false immediately | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| — | NoteDetail (delete) > deletes the note immediately, with no undo, and returns to the list | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| AC-014 | NoteDetail (edit, save, reload) > [AC-014] changing the note text or checklist items and saving updates the note via updateNote() and the changes survive a page reload | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| AC-015 | NoteDetail (edit, save, reload) > [AC-015] removing a checklist item and saving drops only that item, keeping remaining text/checked/positions | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| — | NoteDetail (load, new, not-found) > loads the note by the id in the route via getNote(), with no hardcoded text or items | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| — | NoteDetail (load, new, not-found) > opening an unknown id shows a not-found state and a way back to the list | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| — | NoteDetail (load, new, not-found) > opening the screen with no id creates a new note on save via createNote() | Unit | Passed | `frontend/src/screens/NoteDetail.test.ts` |
| AC-005, AC-006 | [AC-005, AC-006] toggling a checklist item updates the UI and the notes_v1 payload, and survives reload | E2E | Not run yet | `frontend/e2e/notes-edit-checklist.spec.ts` |
| AC-014 | [AC-014] edited text and items persist after save and reload | E2E | Not run yet | `frontend/e2e/notes-edit-checklist.spec.ts` |
| AC-015 | [AC-015] a removed item is gone after save while the remaining items are unchanged | E2E | Not run yet | `frontend/e2e/notes-edit-checklist.spec.ts` |
| — | [AC-detail-delete] deleting from the detail screen removes the note from local storage and returns to the list | E2E | Not run yet | `frontend/e2e/notes-edit-checklist.spec.ts` |

### US-010: Use the app offline

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-020 | [AC-020, NFR-002] create, view, edit, delete and checklist toggle all work with the browser context offline | E2E | Not run yet | `frontend/e2e/offline.spec.ts` |
| AC-020 | [AC-020] route interception records zero note-carrying requests across a full create, edit and delete flow | E2E | Not run yet | `frontend/e2e/offline.spec.ts` |
| AC-020 | [AC-020] the service worker registers after load, and the app shell reloads successfully while offline | E2E | Not run yet | `frontend/e2e/offline.spec.ts` |
| AC-021 | [AC-021] a fresh browser context shows none of another context's notes, and no sync/share affordance exists | E2E | Not run yet | `frontend/e2e/offline.spec.ts` |

### US-012: Export notes to a file

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | Backup screen reads from the real note store > reads notes from listNotes() with no hardcoded notes array | Unit | Passed | `frontend/src/screens/Backup.test.ts` |
| AC-022 | [AC-022] export > downloads a JSON file containing every stored note with text, timestamps and checklist states | Unit | Passed | `frontend/src/screens/Backup.test.ts` |
| AC-023 | [AC-023] import round-trip > importing a file previously produced by export writes those notes into storage and they appear in the notes list | Unit | Passed | `frontend/src/screens/Backup.test.ts` |
| AC-024 | [AC-024] invalid import file > rejects a file with the wrong top-level shape | Unit | Passed | `frontend/src/screens/Backup.test.ts` |
| AC-024 | [AC-024] invalid import file > rejects notes missing required fields | Unit | Passed | `frontend/src/screens/Backup.test.ts` |
| AC-024 | [AC-024] invalid import file > shows an error, imports nothing, and leaves existing notes byte-identical | Unit | Passed | `frontend/src/screens/Backup.test.ts` |
| AC-022 | [AC-022] the downloaded file contains every seeded note with its checklist items and checked states | E2E | Not run yet | `frontend/e2e/backup-export-import.spec.ts` |
| AC-023 | [AC-023] importing a previously exported file into an empty context loads the notes into localStorage and the list | E2E | Not run yet | `frontend/e2e/backup-export-import.spec.ts` |
| AC-024 | [AC-024] importing a non-JSON file shows an error and leaves notes_v1 unchanged | E2E | Not run yet | `frontend/e2e/backup-export-import.spec.ts` |
| AC-024 | [AC-024] importing a non-export file shows an error and leaves notes_v1 unchanged | E2E | Not run yet | `frontend/e2e/backup-export-import.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | test_the_openapi_document_builds | Unit | Passed | `backend/tests/test_health.py` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
| AC-026 | [AC-026] no payment, subscription or paywall prompt appears across the note lifecycle | E2E | Not run yet | `frontend/e2e/no-friction.spec.ts` |
| AC-030 | [AC-030, NFR-001] no outbound request carries note or user data; everything lives in localStorage | E2E | Not run yet | `frontend/e2e/no-friction.spec.ts` |
| AC-030 | [AC-030] no cookie/consent banner or personal-data form appears on first load or during note management | E2E | Not run yet | `frontend/e2e/no-friction.spec.ts` |
<!-- sdlc:auto:end tests -->
