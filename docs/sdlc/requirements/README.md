# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECHSTACK · approved · source: requirements:tech-stack

Product owner approved an exact technology stack for a lightweight, local-storage-only notes app: FastAPI 0.115 backend, PostgreSQL 16 database, Svelte 5 frontend, deployed on AWS.

Decided stack (design against exactly these, do not substitute):
- Backend: FastAPI 0.115
- Frontend: Svelte 5
- Database: PostgreSQL 16 -- included to satisfy the stack requirement only; the product stores every note in the user's own browser by design, so no server-side writes occur. Postgres would sit essentially empty unless a later optional cross-device sync feature is added.
- Cloud: AWS -- chosen because a browser-only app is cheapest and fastest served as static files from S3 behind CloudFront's global CDN, placing the app close to users in India for quick mobile loads. Because there is no server-side personal data, DPDP data-residency concerns do not apply to this deployment choice (assumption, for human confirmation).
Out of scope for design/build: image/file attachments in notes.
Delivery scope: lightweight. Requirements version: 1.

### REQ-EPIC-001 · draft · source: requirements:EPIC-001

Covers creating plain-text notes and adding/toggling checklist items within a note. Image or file attachments are explicitly out of scope.

- US-001 (critical): Create a plain-text note by typing text; it is saved exactly as entered with no signup. Saving an empty note either discards it or saves it without error -- never a broken list entry (AC-001, AC-002).
- US-002 (high): Add one or more checklist items with text to a note while creating or editing it; each item is saved as a checkbox in the order added; adding a new item does not affect existing ones (AC-003, AC-004).
- US-003 (high): Check/uncheck checklist items; the checked/unchecked state is saved in local storage (AC-005, AC-006).
- Explicitly out of scope: image/file attachments in notes.

**Related:** US-001, US-002, US-003, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006

### REQ-EPIC-002 · draft · source: requirements:EPIC-002

Covers viewing all notes in a single newest-first list, opening a note to read it in full, and searching notes by text. No tags, labels, or folders.

- US-004 (critical): All saved notes appear in one list, newest first; a newly created note appears at the top; an empty list shows an empty-state message or create-note prompt (AC-007, AC-008, AC-009).
- US-005 (high): Selecting a note opens it showing full plain text and all checklist items with current checked state (AC-010).
- US-006 (high): A search box filters the list to notes whose text or checklist items match the typed term; clearing the box restores the full newest-first list; no matches shows a no-results message (AC-011, AC-012, AC-013).

**Related:** US-004, US-005, US-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012, AC-013

### REQ-EPIC-003 · draft · source: requirements:EPIC-003

Covers editing an existing note's text/checklist and permanently deleting a note, with no trash or recovery.

- US-007 (critical): Editing a note's text or checklist and saving persists the changes in local storage; removing a checklist item and saving drops only that item, leaving the rest unchanged (AC-014, AC-015).
- US-008 (high): Deleting a note removes it from the list and local storage immediately; no trash, undo, or recovery option exists -- deletions are permanent by design (AC-016, AC-017; accepted risk NFR-007).

**Related:** US-007, US-008, AC-014, AC-015, AC-016, AC-017, NFR-007

### REQ-EPIC-004 · draft · source: requirements:EPIC-004

All notes live only in the user's own browser local storage; nothing is sent to a server, the app works fully offline, and notes do not sync across browsers/devices.

- US-009 (critical): Notes persist across close/reopen of the same browser; no note data is ever sent to or stored on a server (AC-018, AC-019).
- US-010 (high): Once loaded, the app supports full create/view/edit/delete/toggle functionality while offline (AC-020).
- US-011 (low): Notes do not appear on a different browser or device -- no cross-device sync, sharing, or collaboration is provided, by design (AC-021; accepted risk NFR-006).

**Related:** US-009, US-010, US-011, AC-018, AC-019, AC-020, AC-021, NFR-001, NFR-002, NFR-006

### REQ-EPIC-005 · draft · source: requirements:EPIC-005

Optional export/import lets users back up all notes to a file and restore or move them to another browser, mitigating the risk of local-only storage being lost.

- US-012 (medium): Exporting produces a file (e.g. JSON or text) containing all notes with their text, checklist items, and checked states (AC-022).
- US-013 (medium): Importing a previously exported, valid file loads its notes into local storage and the notes list; an invalid file shows an error and leaves existing notes unchanged (AC-023, AC-024).

**Related:** US-012, US-013, AC-022, AC-023, AC-024

### REQ-EPIC-006 · draft · source: requirements:EPIC-006

Open access with no login, free of charge, responsive on any screen size, accessible per WCAG/RPwD guidance, and no personal-data collection or consent prompts.

- US-014 (critical): App loads and is immediately usable without registration, login, or personal details (AC-025).
- US-015 (medium): No payment, subscription, billing, or monetization prompt ever appears (AC-026).
- US-016 (high): Layout adapts on small mobile screens with no horizontal scrolling, and makes appropriate use of larger desktop screens, keeping all features accessible (AC-027, AC-028).
- US-017 (medium): Core actions (create, edit, search, toggle checklist items) are reachable, labelled, and operable by keyboard and screen reader, in English, per WCAG/RPwD guidance (AC-029).
- US-018 (medium): No personal data is collected by the operator and no DPDP consent prompt is shown, because all data stays local in the browser (AC-030).

**Related:** US-014, US-015, US-016, US-017, US-018, AC-025, AC-026, AC-027, AC-028, AC-029, AC-030, NFR-003, NFR-004, NFR-005

### REQ-NFR-001 · draft · source: requirements:NFR-001

All note data stays client-side in the browser; the operator collects no personal data and shows no consent prompt.

DPDP Act 2023: notice & consent, data-residency, and breach-notification duties -- flagged as not meaningfully applicable here per the stated assumption, since no note data is ever sent to or stored on a server and no personal data is collected. This is an assumption for a human to confirm, not a legal determination.

**Related:** US-009, US-018

### REQ-NFR-002 · draft · source: requirements:NFR-002

Once loaded, the app is fully usable offline: create, view, edit, delete notes and toggle checklist items all work with no internet connection, because storage is local.

Applies to US-010. No server dependency for any core action after initial load.

**Related:** US-010

### REQ-NFR-003 · draft · source: requirements:NFR-003

Interface must be responsive across phones, tablets, and desktops.

On small mobile screens, all core actions stay usable with no horizontal scrolling. On desktop, the layout makes appropriate use of the larger screen while keeping every feature accessible. Applies to US-016.

**Related:** US-016

### REQ-NFR-004 · draft · source: requirements:NFR-004

Core actions must be accessible by keyboard and screen reader in English, aligned with accessibility guidance.

RPwD Act 2016 / GIGW guidelines (aligned with WCAG): creating, editing, searching, and toggling checklist items must be reachable, labelled, and operable via keyboard and screen reader. Applies to US-017. Assumption, for human confirmation.

**Related:** US-017

### REQ-NFR-005 · draft · source: requirements:NFR-005

The app must load quickly on mobile in India by being served as static files from a global CDN.

Applies to the whole system. Tied to the AWS S3 + CloudFront deployment choice in REQ-TECHSTACK, which also notes that no server-side personal data means DPDP data-residency concerns do not bite for this static-file serving approach (assumption).

### REQ-NFR-006 · draft · source: requirements:NFR-006

Accepted risk: no cross-device sync, sharing, or collaboration -- notes exist only on the browser where they were created.

Deliberate design limitation per US-011. Not a defect; documented as an accepted risk in the requirements input.

**Related:** US-011

### REQ-NFR-007 · draft · source: requirements:NFR-007

Accepted risk: deletions are permanent with no trash, undo, or server-side recovery.

DPDP Act 2023: data-principal rights (e.g. erasure) are satisfied trivially here since the user directly and immediately controls deletion of their own local data; there is no server-side copy to separately erase. Deliberate design limitation per US-008 -- documented as an accepted risk, for human confirmation rather than a compliance determination.

**Related:** US-008
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-10

**Capabilities in scope:** Create a note with plain text, View notes in a single list, newest first, Edit an existing note, Delete a note immediately, To-do checklists with checkbox items inside a note, Check and uncheck checklist items, Search notes by their text, Notes kept in the browser's local storage, Works offline, Open access with no login or account, Responsive, mobile-friendly interface, Free to use with no payments or monetization, Deletions are permanent with no trash or recovery, No consent prompts or personal-data collection

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | — |
| cloud | AWS | AWS is the available option and fits perfectly: a browser-only app is cheapest and fastest served as static files from S3 behind CloudFront's global CDN, which puts the app close to your users in India for quick loads on mobile. There is no server-side personal data, so DPDP data-residency concerns do not bite, and costs stay very low because you are only serving files. |
| database | PostgreSQL | PostgreSQL is the only database option, and in practice this product does not need one — every note is stored in the user's own browser, by design, so nothing is written server-side. It is included to satisfy the stack, and would sit essentially empty unless you later decide to add optional cross-device sync, at which point PostgreSQL would be a solid, standard home for it. |
| frontend | Svelte | — |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Note Creation and Content

Users can create notes that hold plain text and to-do checklists with checkbox items. Covers composing a note, adding checklist items, and toggling them. No image or file attachments are supported (explicitly out of scope).

### US-001: Create a plain-text note

**Priority:** critical

> As a notes app user, I want to create a new note and type plain text into it, so that I can quickly capture my thoughts without signing up or configuring anything.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the notes app with no note currently open | I choose to create a new note and type plain text into it | a new note containing exactly the text I entered is created and saved |
| AC-002 | I am creating a new note | I save it without entering any text or checklist items | the app either discards the empty note or saves it without error, and the list is never left with a broken entry |

### US-002: Add a to-do checklist to a note

**Priority:** high

> As a notes app user, I want to add checklist items with checkboxes inside a note, so that I can keep to-do lists alongside my plain-text notes.

| ID | Given | When | Then |
|---|---|---|---|
| AC-003 | I am creating or editing a note | I add one or more checklist items with text | each item is saved in the note as a checkbox item in the order I added them |
| AC-004 | a note already contains checklist items | I add a new checklist item | the new item appears in the note and is saved without affecting the existing items |

### US-003: Check and uncheck checklist items

**Priority:** high

> As a notes app user, I want to tick and untick checklist items in a note, so that I can track which to-do items are done.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | a note contains an unchecked checklist item | I check the item | the item is shown as checked and its checked state is saved in local storage |
| AC-006 | a note contains a checked checklist item | I uncheck the item | the item is shown as unchecked and its unchecked state is saved in local storage |

## EPIC-002: Viewing and Finding Notes

Users see all their notes in a single list ordered newest first, can open a note to view its full content, and can search notes by their text. No tags, labels, or folders are provided.

### US-004: View all notes in a single list, newest first

**Priority:** critical

> As a notes app user, I want to see all my notes in one list with the most recent first, so that I can find my latest notes quickly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I have several saved notes | I open the app | all my notes appear in a single list ordered with the newest note first |
| AC-008 | I create a new note | I return to the list | the new note appears at the top of the list as the newest entry |
| AC-009 | I have no saved notes | I open the app | the list is empty and an empty-state message or prompt to create a note is shown |

### US-005: Open and view a note

**Priority:** high

> As a notes app user, I want to open a note from the list and read its full content, so that I can see the complete text and checklist of a note.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am viewing the notes list | I select a note | the note opens showing its full plain text and all checklist items with their current checked state |

### US-006: Search notes by text

**Priority:** high

> As a notes app user, I want to search my notes using a search box, so that I can find a specific note by what it contains.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I have notes whose text or checklist items contain a term | I type that term into the search box | the list shows only the notes whose text or checklist items match the term |
| AC-012 | I have typed a search term into the search box | I clear the search box | the full list of notes, newest first, is shown again |
| AC-013 | no notes match the term I type | the search completes | a no-results message is shown and the list contains no entries |

## EPIC-003: Editing and Deleting Notes

Users can edit an existing note's text and checklist, and delete a note. Deletions are immediate and permanent — there is no trash or recovery.

### US-007: Edit an existing note

**Priority:** critical

> As a notes app user, I want to edit the text and checklist of a note I already created, so that I can keep my notes up to date.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | I have an existing note open | I change its plain text or checklist items and save | the note is updated with my changes and the changes persist in local storage |
| AC-015 | I am editing a note | I remove a checklist item and save | the removed item no longer appears in the note and the remaining items are unchanged |

### US-008: Delete a note permanently

**Priority:** high

> As a notes app user, I want to delete a note immediately, so that I can remove notes I no longer need.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I have a note I want to remove | I delete it | the note is removed from the list and from local storage straight away |
| AC-017 | I have just deleted a note | I look for a way to recover it | no trash, undo, or recovery option is available because deletions are permanent (assumption: deletions are immediate with no server-side trash/recovery) |

## EPIC-004: Local Storage and Offline Use

All notes are stored in the user's own browser (local storage); nothing is sent to or stored on a server. Because storage is local, the app works offline. No cross-device sync, sharing, or collaboration (assumption).

### US-009: Persist notes in the browser's local storage

**Priority:** critical

> As a notes app user, I want my notes to be saved in my own browser, so that my notes stay private to my device and are not sent to any server.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | I have created or edited notes | I close and reopen the app in the same browser | my notes are still present with their text and checklist states intact |
| AC-019 | I am using the app | I create, edit, or delete a note | no note data is sent to or stored on any server — all data stays in the browser's local storage |

### US-010: Use the app offline

**Priority:** high

> As a notes app user, I want to use the app without an internet connection, so that I can manage my notes anytime regardless of connectivity.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | the app has been loaded in my browser | I am offline with no internet connection | I can still create, view, edit, delete notes and toggle checklist items normally |

### US-011: Understand that notes stay on one browser only

**Priority:** low

> As a notes app user, I want to understand that my notes live only on this browser, so that I know they will not sync, be shared, or appear on other devices.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | I am using the app on one browser | I open the app on a different browser or device | my notes do not appear there, consistent with no cross-device sync, sharing, or collaboration (assumption) |

## EPIC-005: Backup and Data Portability

Because local-only storage is lost if browser data is wiped, an optional export/import of notes (e.g. JSON or text file) lets users back up or move their notes.

### US-012: Export notes to a file

**Priority:** medium

> As a notes app user, I want to export all my notes to a file, so that I can back them up in case my browser data is cleared.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | I have one or more saved notes | I choose to export | a file (e.g. JSON or text) is produced containing all my notes with their text and checklist items and states (assumption: export/import is an optional backup/portability feature) |

### US-013: Import notes from a file

**Priority:** medium

> As a notes app user, I want to import notes from a previously exported file, so that I can restore my notes or move them to another browser.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I have a valid file previously exported from the app | I import it | the notes from the file are loaded into local storage and appear in my notes list |
| AC-024 | I select a file that is not a valid export | I try to import it | the app shows an error and leaves my existing notes unchanged |

## EPIC-006: Access, Platform, and Privacy Posture

The app is open to everyone with no login or account, is free with no payments or monetization, and is a responsive mobile-friendly web app in English aligned with WCAG/RPwD accessibility guidance. Because storage is local-only with no accounts or server-side data, the operator collects no personal data and no DPDP consent prompts apply (assumption).

### US-014: Use the app with no login or account

**Priority:** critical

> As a visitor, I want to use the notes app immediately without signing up or logging in, so that I can start taking notes with zero friction.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | I open the app for the first time | the app loads | I can create and manage notes immediately without being asked to register, log in, or provide any personal details |

### US-015: Use the app free of charge

**Priority:** medium

> As a notes app user, I want to use all features without paying, so that I get a fully functional notes app at no cost.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I am using the app | I access any feature | no payment, subscription, billing, or monetization prompt appears, because the app is free (assumption) |

### US-016: Use the app on mobile and desktop responsively

**Priority:** high

> As a notes app user, I want the app to work well on phones, tablets, and desktops, so that I can use it comfortably on any screen size.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | I open the app on a small mobile screen | the interface renders | the layout adapts to the screen size and all core actions remain usable without horizontal scrolling |
| AC-028 | I open the app on a desktop browser | the interface renders | the layout makes appropriate use of the larger screen while keeping all features accessible |

### US-017: Access the app with accessibility support

**Priority:** medium

> As a user who relies on assistive technology, I want the app to follow accessibility guidance in English, so that I can use the notes app regardless of ability.

| ID | Given | When | Then |
|---|---|---|---|
| AC-029 | I navigate the app using a keyboard or screen reader | I perform core actions such as creating, editing, searching, and toggling checklist items | controls are reachable, labelled, and operable in line with WCAG/RPwD accessibility guidance (assumption) |

### US-018: No personal-data collection or consent prompts

**Priority:** medium

> As a privacy-conscious user in India, I want the app to collect no personal data and show no consent prompts, so that my notes stay private and no data-protection obligations are triggered.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I use the app | I create and manage notes | no personal data is collected by the operator and no DPDP consent prompt is shown, because all data stays local in my browser (assumption: local-only storage means DPDP consent/residency/breach duties do not meaningfully apply) |
<!-- sdlc:auto:end epics -->
