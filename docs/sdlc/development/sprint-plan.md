# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up local-storage persistence and the core create/view/checklist flow with zero-friction, no-login access.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Create a plain-text note | 3 | frontend-agent | US-009 |
| US-002 | Story | Add a to-do checklist to a note | 3 | frontend-agent | US-001 |
| US-004 | Story | View all notes in a single list, newest first | 3 | frontend-agent | US-009, US-001 |
| US-005 | Story | Open and view a note | 2 | frontend-agent | US-004 |
| US-009 | Story | Persist notes in the browser's local storage | 5 | frontend-agent | — |
| US-014 | Story | Use the app with no login or account | 1 | frontend-agent | — |
| US-015 | Story | Use the app free of charge | 1 | frontend-agent | — |
| US-018 | Story | No personal-data collection or consent prompts | 1 | frontend-agent | — |

## Sprint 2: Sprint 2

Complete the note lifecycle (edit, delete, search, checklist toggling), add offline support, and ship export/import backup.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-003 | Story | Check and uncheck checklist items | 2 | frontend-agent | US-002 |
| US-006 | Story | Search notes by text | 3 | frontend-agent | US-004 |
| US-007 | Story | Edit an existing note | 3 | frontend-agent | US-001, US-002 |
| US-008 | Story | Delete a note permanently | 2 | frontend-agent | US-004 |
| US-010 | Story | Use the app offline | 3 | frontend-agent | US-009 |
| US-011 | Story | Understand that notes stay on one browser only | 1 | frontend-agent | US-009 |
| US-012 | Story | Export notes to a file | 3 | frontend-agent | US-009 |
| US-013 | Story | Import notes from a file | 3 | frontend-agent | US-012 |

## Sprint 3: Sprint 3

Polish responsive layout and accessibility across the whole app.

Capacity: 20 points · Committed: 10

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Use the app on mobile and desktop responsively | 5 | frontend-agent | US-001, US-004, US-005 |
| US-017 | Story | Access the app with accessibility support | 5 | frontend-agent | US-001, US-004, US-006 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
