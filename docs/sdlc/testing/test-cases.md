# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
31 tests · Passed 17 · Failed 0 · Skipped 0 · Not run 14

Acceptance criteria covered: 13/30 · passing: 0/30
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
| AC-025 | [AC-025] a first-time visitor creates and manages a note immediately, with no account step | E2E | Not run yet | `frontend/e2e/no-login.spec.ts` |
| AC-025 | [AC-025] a first-time visitor lands on a usable app with no sign-up, login, or personal details | E2E | Not run yet | `frontend/e2e/no-login.spec.ts` |

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
